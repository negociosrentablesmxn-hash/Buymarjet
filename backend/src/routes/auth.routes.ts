import { Router, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { AppDataSource } from '../database/datasource'
import { User } from '../entities/User'
import { hashPassword, comparePassword, generateToken, generateRefreshToken } from '../utils/auth'
import { AuthRequest, authMiddleware } from '../middleware/auth'

const router = Router()
const userRepository = AppDataSource.getRepository(User)

// POST /auth/register
router.post(
  '/register',
  [
    body('fullName').trim().notEmpty().withMessage('Nombre es requerido'),
    body('email').isEmail().withMessage('Email inválido'),
    body('password').isLength({ min: 6 }).withMessage('Contraseña mínimo 6 caracteres'),
    body('confirmPassword').custom((value, { req }) => value === req.body.password).withMessage('Las contraseñas no coinciden'),
  ],
  async (req: AuthRequest, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    try {
      const { fullName, email, password } = req.body

      const existingUser = await userRepository.findOne({ where: { email } })
      if (existingUser) {
        return res.status(409).json({ error: 'El email ya está registrado' })
      }

      const hashedPassword = await hashPassword(password)
      const user = userRepository.create({
        fullName,
        email,
        password: hashedPassword,
      })

      await userRepository.save(user)

      const token = generateToken(user.id)
      const refreshToken = generateRefreshToken(user.id)

      res.status(201).json({
        user: { id: user.id, fullName: user.fullName, email: user.email },
        token,
        refreshToken,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error al registrar usuario' })
    }
  }
)

// POST /auth/login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email inválido'),
    body('password').notEmpty().withMessage('Contraseña requerida'),
  ],
  async (req: AuthRequest, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    try {
      const { email, password } = req.body

      const user = await userRepository.findOne({ where: { email } })
      if (!user) {
        return res.status(401).json({ error: 'Credenciales inválidas' })
      }

      const isPasswordValid = await comparePassword(password, user.password)
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Credenciales inválidas' })
      }

      const token = generateToken(user.id)
      const refreshToken = generateRefreshToken(user.id)

      res.json({
        user: { id: user.id, fullName: user.fullName, email: user.email },
        token,
        refreshToken,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error al iniciar sesión' })
    }
  }
)

// GET /auth/me
router.get('/me', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const user = await userRepository.findOne({ where: { id: req.userId } })
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    res.json({ id: user.id, fullName: user.fullName, email: user.email })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener usuario' })
  }
})

export default router