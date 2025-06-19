import { Link } from 'react-router-dom'
import Card from '../components/Card'

const HomePage = () => {
  return (
    <div className="space-y-6">
      <Card>
        <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
          Welcome to the React + Tailwind CSS Assignment
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          This application demonstrates React concepts with Tailwind CSS styling.
        </p>
        <div className="flex space-x-4">
          <Link 
            to="/tasks" 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            View Task Manager
          </Link>
          <Link 
            to="/api-data" 
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            View API Data
          </Link>
        </div>
      </Card>
    </div>
  )
}

export default HomePage