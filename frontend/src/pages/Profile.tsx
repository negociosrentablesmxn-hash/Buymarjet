import { useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { useForm } from 'react-hook-form'
import { api } from '../services/api'

interface ProfileForm {
  fullName: string
  email: string
  phone?: string
  country?: string
}

export default function Profile() {
  const { user, updateUser } = useAuthStore()
  const { register, handleSubmit } = useForm<ProfileForm>({
    defaultValues: {
      fullName: user?.fullName || '',
      email: user?.email || '',
    },
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const onSubmit = async (data: ProfileForm) => {
    setLoading(true)
    setSuccess(false)
    try {
      const response = await api.put('/user/profile', data)
      updateUser(response.data.user)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Mi Perfil</h1>

      <div className="card">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Nombre Completo</label>
            <input
              {...register('fullName')}
              type="text"
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">Email</label>
            <input
              {...register('email')}
              type="email"
              className="input-field"
              disabled
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">Teléfono</label>
            <input
              {...register('phone')}
              type="tel"
              className="input-field"
              placeholder="+34600000000"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">País</label>
            <input
              {...register('country')}
              type="text"
              className="input-field"
              placeholder="España"
            />
          </div>

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              Perfil actualizado exitosamente
            </div>
          )}

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </form>
      </div>
    </div>
  )
}