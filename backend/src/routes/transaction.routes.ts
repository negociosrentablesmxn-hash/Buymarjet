import { Router, Response } from 'express'
import { AuthRequest, authMiddleware } from '../middleware/auth'

const router = Router()

// GET /transactions
router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 20
    const type = req.query.type as string

    // TODO: Obtener transacciones reales de la base de datos
    const mockTransactions = [
      {
        id: 'tx_1',
        type: 'investment',
        investmentName: 'Fondo Tech Global',
        amount: 10000,
        status: 'completed',
        createdAt: new Date('2024-05-15'),
      },
      {
        id: 'tx_2',
        type: 'dividend',
        amount: 250,
        status: 'completed',
        createdAt: new Date('2024-05-10'),
      },
    ]

    res.json({
      data: mockTransactions,
      pagination: { page, limit, total: 2 },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener transacciones' })
  }
})

// POST /transactions/withdraw
router.post('/withdraw', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { amount, bankAccount } = req.body

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Monto inválido' })
    }

    // TODO: Procesar retiro en la base de datos

    res.status(201).json({
      id: 'wd_' + Date.now(),
      type: 'withdrawal',
      amount,
      bankAccount,
      status: 'pending',
      estimatedDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      createdAt: new Date(),
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al procesar retiro' })
  }
})

// GET /transactions/:id
router.get('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    // TODO: Obtener transacción específica de la base de datos
    res.json({
      id: req.params.id,
      type: 'investment',
      investmentName: 'Fondo Tech Global',
      amount: 10000,
      status: 'completed',
      paymentMethod: 'stripe',
      transactionId: 'ch_1234567890',
      createdAt: new Date(),
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener transacción' })
  }
})

export default router