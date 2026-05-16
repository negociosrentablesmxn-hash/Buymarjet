import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { useForm } from 'react-hook-form'

interface RegisterForm {
  fullName: string
  email: string
  password: string
  confirmPassword: string
}

export default function Register() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterForm>()
  const { signup } = useAuthStore()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const password = watch('password')

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true)
    try {
      await signup(data.fullName, data.email, data.password)
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
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Crear Cuenta</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Nombre Completo</label>
            <input
              {...register('fullName', { required: 'Nombre es requerido' })}
              type="text"
              className="input-field"
              placeholder="Juan Pérez"
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
          </div>

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
              {...register('password', { required: 'Contraseña es requerida', minLength: { value: 6, message: 'Mínimo 6 caracteres' } })}
              type="password"
              className="input-field"
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">Confirmar Contraseña</label>
            <input
              {...register('confirmPassword', {
                required: 'Confirmar contraseña es requerido',
                validate: (value) => value === password || 'Las contraseñas no coinciden',
              })}
              type="password"
              className="input-field"
              placeholder="••••••••"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Creando cuenta...' : 'Registrarse'}
          </button>
        </form>

        <p className="text-center text-gray-700 mt-6">
          ¿Ya tienes cuenta? <Link to="/login" className="text-blue-600 font-bold">Inicia sesión</Link>
        </p>
      </div>
    </div>
  )
}