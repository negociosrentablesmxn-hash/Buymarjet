import { Router, Response } from 'express'
import { AppDataSource } from '../database/datasource'
import { Investment } from '../entities/Investment'
import { AuthRequest, authMiddleware } from '../middleware/auth'

const router = Router()
const investmentRepository = AppDataSource.getRepository(Investment)

// GET /investments
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const category = req.query.category as string

    const query = investmentRepository.createQueryBuilder('investment').where('investment.active = :active', { active: true })

    if (category) {
      query.andWhere('investment.category = :category', { category })
    }

    const total = await query.getCount()
    const data = await query.skip((page - 1) * limit).take(limit).getMany()

    res.json({
      data,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener inversiones' })
  }
})

// GET /investments/:id
router.get('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const investment = await investmentRepository.findOne({
      where: { id: req.params.id, active: true },
    })

    if (!investment) {
      return res.status(404).json({ error: 'Inversión no encontrada' })
    }

    res.json(investment)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener inversión' })
  }
})

// POST /investments/:id/invest (requiere autenticación)
router.post('/:id/invest', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { amount, paymentMethod } = req.body

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Monto inválido' })
    }

    const investment = await investmentRepository.findOne({
      where: { id: req.params.id, active: true },
    })

    if (!investment) {
      return res.status(404).json({ error: 'Inversión no encontrada' })
    }

    if (amount < investment.minimumInvestment) {
      return res.status(400).json({
        error: `El monto mínimo es $${investment.minimumInvestment}`,
      })
    }

    // TODO: Integrar con Stripe o procesador de pagos
    const transactionId = 'tx_' + Date.now()

    res.status(201).json({
      id: 'ui_' + Date.now(),
      investmentId: investment.id,
      userId: req.userId,
      amount,
      status: 'pending',
      paymentMethod,
      transactionId,
      createdAt: new Date(),
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al crear inversión' })
  }
})

export default router