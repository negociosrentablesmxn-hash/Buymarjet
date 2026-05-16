import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { UserCircleIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'

export default function Navbar() {
  const { user, logout } = useAuthStore()

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">Buymarjet</h1>
          </div>

          <div className="flex items-center space-x-6">
            <span className="text-gray-700">{user?.fullName}</span>
            <Link to="/profile" className="text-gray-600 hover:text-gray-900">
              <UserCircleIcon className="w-6 h-6" />
            </Link>
            <button
              onClick={logout}
              className="text-red-600 hover:text-red-900 flex items-center space-x-2"
            >
              <ArrowLeftOnRectangleIcon className="w-6 h-6" />
              <span>Salir</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}