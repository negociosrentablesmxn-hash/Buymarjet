import { useEffect, useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { api } from '../services/api'

interface PortfolioSummary {
  totalInvested: number
  totalValue: number
  totalGain: number
  gainPercentage: number
}

export default function Dashboard() {
  const { user } = useAuthStore()
  const [portfolio, setPortfolio] = useState<PortfolioSummary | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPortfolio()
  }, [])

  const fetchPortfolio = async () => {
    try {
      const response = await api.get('/portfolio')
      setPortfolio(response.data.summary)
    } catch (error) {
      console.error('Error fetching portfolio:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="text-center py-10">Cargando...</div>

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Bienvenido, {user?.fullName}</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <p className="text-gray-500 text-sm">Invertido Total</p>
          <p className="text-3xl font-bold text-gray-800">${portfolio?.totalInvested?.toLocaleString()}</p>
        </div>
        <div className="card">
          <p className="text-gray-500 text-sm">Valor Actual</p>
          <p className="text-3xl font-bold text-blue-600">${portfolio?.totalValue?.toLocaleString()}</p>
        </div>
        <div className="card">
          <p className="text-gray-500 text-sm">Ganancia Total</p>
          <p className={`text-3xl font-bold ${portfolio?.totalGain ?? 0 > 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${portfolio?.totalGain?.toLocaleString()}
          </p>
        </div>
        <div className="card">
          <p className="text-gray-500 text-sm">Rendimiento</p>
          <p className={`text-3xl font-bold ${portfolio?.gainPercentage ?? 0 > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {portfolio?.gainPercentage?.toFixed(2)}%
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Acciones Rápidas</h2>
          <div className="space-y-3">
            <a href="/investments" className="btn-primary w-full text-center">
              Explorar Inversiones
            </a>
            <a href="/portfolio" className="btn-secondary w-full text-center">
              Ver Portafolio
            </a>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Tips Financieros</h2>
          <ul className="space-y-2 text-gray-700">
            <li>✓ Diversifica tu portafolio</li>
            <li>✓ Invierte regularmente</li>
            <li>✓ Mantén una perspectiva a largo plazo</li>
            <li>✓ Monitorea tu rendimiento</li>
          </ul>
        </div>
      </div>
    </div>
  )
}