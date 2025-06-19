import { Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-gray-800 dark:text-white">
          Task Manager
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">
            Home
          </Link>
          <Link to="/tasks" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">
            Tasks
          </Link>
          <Link to="/api-data" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">
            API Data
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}

export default Navbar