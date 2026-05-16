import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../services/api'

interface Investment {
  id: string
  name: string
  description: string
  minimumInvestment: number
  expectedReturn: string
  risk: string
  category: string
}

export default function Investments() {
  const [investments, setInvestments] = useState<Investment[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    fetchInvestments()
  }, [selectedCategory])

  const fetchInvestments = async () => {
    setLoading(true)
    try {
      const params = selectedCategory !== 'all' ? { category: selectedCategory } : {}
      const response = await api.get('/investments', { params })
      setInvestments(response.data.data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="text-center py-10">Cargando inversiones...</div>

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Oportunidades de Inversión</h1>

      <div className="flex gap-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-lg ${
            selectedCategory === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800'
          }`}
        >
          Todas
        </button>
        {['Fondos', 'Renta Fija', 'ETF', 'Equity'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {investments.map((inv) => (
          <Link key={inv.id} to={`/investments/${inv.id}`}>
            <div className="card hover:shadow-lg transition cursor-pointer h-full">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{inv.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{inv.description}</p>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-bold">Mínimo:</span> ${inv.minimumInvestment.toLocaleString()}
                </p>
                <p className="text-sm">
                  <span className="font-bold">Retorno Esperado:</span> {inv.expectedReturn}
                </p>
                <div className="flex gap-2">
                  <span className={`badge ${
                    inv.risk === 'Bajo'
                      ? 'bg-green-100 text-green-800'
                      : inv.risk === 'Medio'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {inv.risk}
                  </span>
                  <span className="badge bg-blue-100 text-blue-800">{inv.category}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}