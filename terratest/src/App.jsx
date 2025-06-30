import { useState, useEffect } from 'react'
import './App.css'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

function App() {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [user, setUser] = useState(null)
  const [isLogin, setIsLogin] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    const savedToken = localStorage.getItem('token')
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
  }

  const handleRegister = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    setMessage('')
  }

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

  if (user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome, {user.username}!
            </h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
          
          <div className="text-center space-y-4">
            <button
              onClick={fetchFromBackend}
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              {loading ? 'Loading...' : 'Test Backend Connection'}
            </button>
            
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Logout
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

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          {isLogin ? 'Sign In' : 'Sign Up'}
        </h1>
        
        {isLogin ? (
          <LoginForm 
            onLogin={handleLogin} 
            onToggleMode={() => setIsLogin(false)} 
          />
        ) : (
          <RegisterForm 
            onRegister={handleRegister} 
            onToggleMode={() => setIsLogin(true)} 
          />
        )}
      </div>
    </div>
  )
}

export default App
