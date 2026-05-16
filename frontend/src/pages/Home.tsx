import { Link } from 'react-router-dom'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4">
        <h1 className="text-3xl font-bold">Buymarjet</h1>
        <div className="space-x-4">
          <Link to="/login" className="btn-primary">
            Iniciar Sesión
          </Link>
          <Link to="/register" className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold hover:bg-gray-100">
            Registrarse
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-5xl font-bold mb-6">Invierte en tu Futuro Financiero</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Accede a oportunidades de inversión diversificadas con retornos competitivos.
          Seguro, transparente y diseñado para ti.
        </p>
        <Link
          to="/register"
          className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition"
        >
          <span>Comienza Ahora</span>
          <ArrowRightIcon className="w-5 h-5" />
        </Link>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white bg-opacity-10 rounded-lg p-8">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-2xl font-bold mb-4">Seguro</h3>
            <p>Tus inversiones están protegidas con los más altos estándares de seguridad.</p>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-8">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-2xl font-bold mb-4">Transparente</h3>
            <p>Acceso total a la información de tus inversiones en tiempo real.</p>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-8">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold mb-4">Rentable</h3>
            <p>Retornos competitivos y diversificación inteligente de tu portafolio.</p>
          </div>
        </div>
      </div>
    </div>
  )
}