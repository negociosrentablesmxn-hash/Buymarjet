import { Router, Response } from 'express'
import { AuthRequest, authMiddleware } from '../middleware/auth'

const router = Router()

// GET /portfolio
router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    // TODO: Obtener portafolio real de la base de datos
    const mockPortfolio = {
      summary: {
        totalInvested: 50000,
        totalValue: 57500,
        totalGain: 7500,
        gainPercentage: 15,
      },
      holdings: [
        {
          id: '1',
          name: 'Fondo Tech Global',
          amount: 10000,
          currentValue: 10800,
          gain: 800,
          gainPercentage: 8,
          percentage: 18.8,
        },
        {
          id: '2',
          name: 'Renta Fija Estable',
          amount: 20000,
          currentValue: 20300,
          gain: 300,
          gainPercentage: 1.5,
          percentage: 35.3,
        },
      ],
    }

    res.json(mockPortfolio)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener portafolio' })
  }
})

// GET /portfolio/history
router.get('/history', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const period = req.query.period as string || 'month'

    // TODO: Obtener histórico real de la base de datos
    const mockHistory = [
      { date: '2024-05-16', value: 57500, gain: 7500 },
      { date: '2024-05-15', value: 57000, gain: 7000 },
      { date: '2024-05-14', value: 56500, gain: 6500 },
      { date: '2024-05-13', value: 56000, gain: 6000 },
      { date: '2024-05-12', value: 55500, gain: 5500 },
    ]

    res.json({ data: mockHistory, period })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener histórico' })
  }
})

export default router