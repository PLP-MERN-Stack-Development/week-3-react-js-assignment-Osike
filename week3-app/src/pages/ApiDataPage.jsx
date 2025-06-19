import { useState, useEffect } from 'react'
import axios from 'axios'
import Card from '../components/Card'
import Button from '../components/Button'

const ApiDataPage = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  const fetchPosts = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10&q=${searchTerm}`
      )
      setPosts(response.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [page, searchTerm])

  const handleSearch = (e) => {
    e.preventDefault()
    setPage(1)
    fetchPosts()
  }

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">API Data</h2>
        
        <form onSubmit={handleSearch} className="flex mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search posts..."
            className="flex-grow px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <Button type="submit" className="rounded-l-none">
            Search
          </Button>
        </form>

        {loading && <p className="text-center py-4">Loading...</p>}
        {error && <p className="text-red-500 text-center py-4">Error: {error}</p>}
      </Card>

      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {posts.map(post => (
              <Card key={post.id}>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {post.body}
                </p>
              </Card>
            ))}
          </div>

          <div className="flex justify-center space-x-4 mt-6">
            <Button 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <span className="flex items-center px-4 py-2 text-gray-800 dark:text-white">
              Page {page}
            </span>
            <Button 
              onClick={() => setPage(p => p + 1)}
              disabled={posts.length < 10}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default ApiDataPage
