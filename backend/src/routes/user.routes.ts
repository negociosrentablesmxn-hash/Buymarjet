import { Router, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { AppDataSource } from '../database/datasource'
import { User } from '../entities/User'
import { AuthRequest, authMiddleware } from '../middleware/auth'
import { hashPassword } from '../utils/auth'

const router = Router()
const userRepository = AppDataSource.getRepository(User)

// GET /user/profile
router.get('/profile', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const user = await userRepository.findOne({ where: { id: req.userId } })
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    res.json({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      country: user.country,
      city: user.city,
      createdAt: user.createdAt,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener perfil' })
  }
})

// PUT /user/profile
router.put(
  '/profile',
  authMiddleware,
  [body('fullName').optional().trim().notEmpty()],
  async (req: AuthRequest, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    try {
      const { fullName, phone, country, city } = req.body
      const user = await userRepository.findOne({ where: { id: req.userId } })

      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' })
      }

      if (fullName) user.fullName = fullName
      if (phone) user.phone = phone
      if (country) user.country = country
      if (city) user.city = city

      await userRepository.save(user)

      res.json({
        message: 'Perfil actualizado exitosamente',
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          country: user.country,
          city: user.city,
        },
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error al actualizar perfil' })
    }
  }
)

// PUT /user/password
router.put(
  '/password',
  authMiddleware,
  [
    body('currentPassword').notEmpty(),
    body('newPassword').isLength({ min: 6 }),
    body('confirmPassword').custom((value, { req }) => value === req.body.newPassword),
  ],
  async (req: AuthRequest, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    try {
      const { newPassword } = req.body
      const user = await userRepository.findOne({ where: { id: req.userId } })

      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' })
      }

      const hashedPassword = await hashPassword(newPassword)
      user.password = hashedPassword

      await userRepository.save(user)

      res.json({ message: 'Contraseña cambiada exitosamente' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error al cambiar contraseña' })
    }
  }
)

export default router