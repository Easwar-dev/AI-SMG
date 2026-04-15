/**
 * StrategyHistory Component
 * Displays user's past generated strategies
 */

import { useState, useEffect } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { tokenStorage } from '../utils/tokenStorage'

export const StrategyHistory = () => {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = async () => {
    try {
      setLoading(true)
      const token = tokenStorage.getAccessToken()
      
      const response = await fetch('http://localhost:5000/api/generation/history', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()

      if (!response.ok) {
        // If token is invalid/expired, try to refresh
        if (response.status === 401) {
          try {
            await refreshToken()
            // Retry loading history
            setTimeout(() => loadHistory(), 500)
            return
          } catch (refreshErr) {
            throw new Error('Session expired. Please login again.')
          }
        }
        throw new Error(data.message || 'Failed to load history')
      }

      setHistory(data.data || [])
      setError(null)
    } catch (err) {
      setError(err.message)
      console.error('Error loading history:', err)
    } finally {
      setLoading(false)
    }
  }

  const refreshToken = async () => {
    const refreshTokenValue = tokenStorage.getRefreshToken()
    const response = await fetch('http://localhost:5000/api/auth/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh_token: refreshTokenValue })
    })

    if (!response.ok) {
      throw new Error('Failed to refresh token')
    }

    const data = await response.json()
    tokenStorage.setAccessToken(data.access_token)
    if (data.refresh_token) {
      tokenStorage.setRefreshToken(data.refresh_token)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this strategy?')) return

    try {
      const token = tokenStorage.getAccessToken()
      
      const response = await fetch(`http://localhost:5000/api/generation/history/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to delete strategy')
      }

      setHistory(prev => prev.filter(item => item.id !== id))
      toast.success('Strategy deleted')
    } catch (err) {
      toast.error(err.message)
    }
  }

  const handleDeleteAll = async () => {
    if (!confirm('Delete all strategies? This cannot be undone.')) return

    try {
      const token = tokenStorage.getAccessToken()
      
      const response = await fetch('http://localhost:5000/api/generation/history/all', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to delete all strategies')
      }

      setHistory([])
      toast.success('All strategies deleted')
    } catch (err) {
      toast.error(err.message)
    }
  }

  if (loading) {
    return (
      <div className="bg-white dark:bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-8 border border-white/20">
        <div className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-slate-700 dark:text-gray-300">Loading history...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl p-6">
        <p className="text-red-700 dark:text-red-300">Error loading history: {error}</p>
      </div>
    )
  }

  return (
    <div>
      <Toaster position="top-right" />
      
      <div className="bg-white/55 dark:bg-white/5 backdrop-blur-2xl rounded-2xl shadow-sm p-8 border border-white/80 dark:border-white/10 transition-colors duration-500">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
            📚 Recent Strategies
          </h2>
          
          {history.length > 0 && (
            <button
              onClick={handleDeleteAll}
              className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg transition duration-200"
            >
              Delete All
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600 dark:text-gray-400 text-lg">
              No strategies generated yet. Start by creating your first one! 🚀
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((item) => (
              <div
                key={item.id}
                className="bg-white/50 dark:bg-white/5 border border-white/60 dark:border-white/10 rounded-lg p-4 hover:shadow-md transition duration-200"
              >
                <div className="flex justify-between items-start gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {item.platform}
                      </span>
                      <span className="text-sm text-slate-500 dark:text-gray-400">
                        {new Date(item.created_at).toLocaleDateString()} {new Date(item.created_at).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-slate-700 dark:text-gray-300 font-medium break-words">
                      {item.topic}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-1.5 text-sm bg-red-600 hover:bg-red-700 text-white rounded transition duration-200 flex-shrink-0"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
