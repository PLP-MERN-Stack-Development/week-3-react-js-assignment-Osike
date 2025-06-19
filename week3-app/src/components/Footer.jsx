const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-6">
      <div className="max-w-6xl mx-auto px-4 text-center text-gray-600 dark:text-gray-300">
        <p>© {new Date().getFullYear()} Task Manager App. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
