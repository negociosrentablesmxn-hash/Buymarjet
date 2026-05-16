import { useEffect, useState } from 'react'
import { api } from '../services/api'

interface Holding {
  id: string
  name: string
  amount: number
  currentValue: number
  gain: number
  gainPercentage: number
  percentage: number
}

interface Portfolio {
  summary: {
    totalInvested: number
    totalValue: number
    totalGain: number
    gainPercentage: number
  }
  holdings: Holding[]
}

export default function Portfolio() {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPortfolio()
  }, [])

  const fetchPortfolio = async () => {
    try {
      const response = await api.get('/portfolio')
      setPortfolio(response.data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="text-center py-10">Cargando portafolio...</div>

  if (!portfolio || portfolio.holdings.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600 mb-4">No tienes inversiones aún</p>
        <a href="/investments" className="btn-primary">
          Explorar Inversiones
        </a>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Mi Portafolio</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <p className="text-gray-500 text-sm">Invertido Total</p>
          <p className="text-3xl font-bold">${portfolio.summary.totalInvested.toLocaleString()}</p>
        </div>
        <div className="card">
          <p className="text-gray-500 text-sm">Valor Actual</p>
          <p className="text-3xl font-bold text-blue-600">${portfolio.summary.totalValue.toLocaleString()}</p>
        </div>
        <div className="card">
          <p className="text-gray-500 text-sm">Ganancia</p>
          <p className={`text-3xl font-bold ${portfolio.summary.totalGain > 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${portfolio.summary.totalGain.toLocaleString()}
          </p>
        </div>
        <div className="card">
          <p className="text-gray-500 text-sm">Rendimiento</p>
          <p className={`text-3xl font-bold ${portfolio.summary.gainPercentage > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {portfolio.summary.gainPercentage.toFixed(2)}%
          </p>
        </div>
      </div>

      <div className="card">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Mis Inversiones</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2">
                <th className="text-left py-3 px-4">Inversión</th>
                <th className="text-right py-3 px-4">Monto</th>
                <th className="text-right py-3 px-4">Valor Actual</th>
                <th className="text-right py-3 px-4">Ganancia</th>
                <th className="text-right py-3 px-4">%</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.holdings.map((holding) => (
                <tr key={holding.id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-4">{holding.name}</td>
                  <td className="text-right py-4 px-4">${holding.amount.toLocaleString()}</td>
                  <td className="text-right py-4 px-4">${holding.currentValue.toLocaleString()}</td>
                  <td className={`text-right py-4 px-4 ${holding.gain > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${holding.gain.toLocaleString()}
                  </td>
                  <td className={`text-right py-4 px-4 font-bold ${holding.gainPercentage > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {holding.gainPercentage.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}