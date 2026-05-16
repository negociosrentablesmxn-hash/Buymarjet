import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../services/api'

interface Investment {
  id: string
  name: string
  description: string
  longDescription?: string
  minimumInvestment: number
  expectedReturn: string
  risk: string
  category: string
  currentValue: number
  investorCount: number
}

export default function InvestmentDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [investment, setInvestment] = useState<Investment | null>(null)
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(true)
  const [investing, setInvesting] = useState(false)

  useEffect(() => {
    fetchInvestment()
  }, [id])

  const fetchInvestment = async () => {
    try {
      const response = await api.get(`/investments/${id}`)
      setInvestment(response.data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInvest = async () => {
    if (!amount || !investment) return

    setInvesting(true)
    try {
      const response = await api.post(`/investments/${investment.id}/invest`, {
        amount: parseFloat(amount),
        paymentMethod: 'stripe',
      })

      if (response.data.paymentUrl) {
        window.location.href = response.data.paymentUrl
      } else {
        navigate('/portfolio')
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setInvesting(false)
    }
  }

  if (loading) return <div className="text-center py-10">Cargando...</div>
  if (!investment) return <div className="text-center py-10 text-red-600">Inversión no encontrada</div>

  return (
    <div className="max-w-4xl">
      <button onClick={() => navigate(-1)} className="text-blue-600 mb-6 hover:underline">
        ← Volver
      </button>

      <div className="card mb-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{investment.name}</h1>
        <p className="text-gray-600 text-lg mb-6">{investment.description}</p>
        <p className="text-gray-700 mb-4">{investment.longDescription}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div>
            <p className="text-gray-500 text-sm">Mínimo</p>
            <p className="text-2xl font-bold text-gray-800">${investment.minimumInvestment.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Retorno</p>
            <p className="text-2xl font-bold text-green-600">{investment.expectedReturn}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Riesgo</p>
            <p className="text-2xl font-bold">{investment.risk}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Inversores</p>
            <p className="text-2xl font-bold text-blue-600">{investment.investorCount}</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Realizar Inversión</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Monto a Invertir</label>
            <input
              type="number"
              min={investment.minimumInvestment}
              step="100"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="input-field"
              placeholder={`Mínimo: $${investment.minimumInvestment.toLocaleString()}`}
            />
            {amount && parseFloat(amount) < investment.minimumInvestment && (
              <p className="text-red-600 text-sm mt-2">
                El monto debe ser mayor a ${investment.minimumInvestment.toLocaleString()}
              </p>
            )}
          </div>

          <button
            onClick={handleInvest}
            disabled={!amount || parseFloat(amount) < investment.minimumInvestment || investing}
            className="btn-primary w-full"
          >
            {investing ? 'Procesando...' : 'Invertir Ahora'}
          </button>
        </div>
      </div>
    </div>
  )
}