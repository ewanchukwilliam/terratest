import { useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchFromBackend = async () => {
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch('/api/hello/')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setMessage(data.message)
    } catch (err) {
      setError(`Failed to fetch: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Terratest App
        </h1>
        
        <div className="text-center">
          <button
            onClick={fetchFromBackend}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            {loading ? 'Loading...' : 'Test Backend Connection'}
          </button>
          
          {message && (
            <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              {message}
            </div>
          )}
          
          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
