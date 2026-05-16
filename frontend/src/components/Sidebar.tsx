import { Link, useLocation } from 'react-router-dom'
import { HomeIcon, CurrencyDollarIcon, ChartBarIcon, UserIcon } from '@heroicons/react/24/outline'

const menuItems = [
  { label: 'Dashboard', path: '/dashboard', icon: HomeIcon },
  { label: 'Inversiones', path: '/investments', icon: CurrencyDollarIcon },
  { label: 'Portafolio', path: '/portfolio', icon: ChartBarIcon },
  { label: 'Perfil', path: '/profile', icon: UserIcon },
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <aside className="w-64 bg-gray-900 text-white shadow-lg">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-blue-400">Buymarjet</h2>
      </div>

      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-6 py-3 transition ${
                isActive
                  ? 'bg-blue-600 border-l-4 border-blue-400'
                  : 'hover:bg-gray-800'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}