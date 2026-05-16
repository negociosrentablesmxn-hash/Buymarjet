import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { useForm } from 'react-hook-form'

interface LoginForm {
  email: string
  password: string
}

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>()
  const { login } = useAuthStore()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: LoginForm) => {
    setLoading(true)
    try {
      await login(data.email, data.password)
      navigate('/dashboard')
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Iniciar Sesión</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Email</label>
            <input
              {...register('email', { required: 'Email es requerido' })}
              type="email"
              className="input-field"
              placeholder="tu@email.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">Contraseña</label>
            <input
              {...register('password', { required: 'Contraseña es requerida' })}
              type="password"
              className="input-field"
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <p className="text-center text-gray-700 mt-6">
          ¿No tienes cuenta? <Link to="/register" className="text-blue-600 font-bold">Regístrate</Link>
        </p>
      </div>
    </div>
  )
}