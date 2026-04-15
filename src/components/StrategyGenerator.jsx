/**
 * StrategyGenerator Component
 * Allows users to generate AI-powered social media strategies
 */

import { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { tokenStorage } from '../utils/tokenStorage'

const PLATFORMS = [
  'Instagram',
  'TikTok',
  'YouTube',
  'Twitter',
  'LinkedIn',
  'Facebook'
]

export const StrategyGenerator = () => {
  const [formData, setFormData] = useState({
    platform: '',
    topic: ''
  })
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success(`${label} copied to clipboard!`)
    }).catch(() => {
      toast.error('Failed to copy')
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setResults(null)

    // Validate
    if (!formData.platform || !formData.topic) {
      setError('Please fill in all fields')
      return
    }

    setLoading(true)

    try {
      const token = tokenStorage.getAccessToken()
      
      const response = await fetch('http://localhost:5000/api/generation/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          platform: formData.platform,
          topic: formData.topic
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to generate strategy')
      }

      setResults(data)
      toast.success('✓ Strategy generated successfully!')
      
      // Reset form
      setFormData({ platform: '', topic: '' })
    } catch (err) {
      const errorMsg = err.message || 'Failed to generate strategy'
      setError(errorMsg)
      toast.error('❌ ' + errorMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Toaster position="top-right" />
      
      <div className="bg-white/55 dark:bg-white/5 backdrop-blur-2xl rounded-2xl shadow-sm p-8 border border-white/80 dark:border-white/10 transition-colors duration-500">
        <h2 className="text-2xl font-bold text-slate-950 dark:text-white mb-6">
          🎯 Generate Your Strategy
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error Alert */}
          {error && (
            <div className="bg-red-500/20 border border-red-500 rounded-lg p-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-red-500 text-sm font-medium">{error}</span>
            </div>
          )}

          {/* Platform and Topic */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-950 dark:text-gray-300 mb-2">
                Platform
              </label>
              <select
                name="platform"
                value={formData.platform}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white/50 dark:bg-white/5 text-slate-950 dark:text-white border border-white/30 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              >
                <option value="">Select a platform</option>
                {PLATFORMS.map(platform => (
                  <option key={platform} value={platform}>{platform}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-950 dark:text-gray-300 mb-2">
                Topic
              </label>
              <input
                type="text"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                placeholder="e.g., Travel, Technology, Fitness"
                className="w-full px-4 py-2 bg-white/50 dark:bg-white/5 text-slate-950 dark:text-white border border-white/30 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 placeholder-slate-400 dark:placeholder-gray-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold rounded-lg transition duration-300"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </span>
            ) : (
              'Generate Strategy'
            )}
          </button>
        </form>

        {/* Results */}
        {results && (
          <div className="mt-8 pt-8 border-t border-white/20">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
              ✨ Your Strategy
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-lg p-4 relative group">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-300 text-sm">📱 Hashtags</h4>
                  <button
                    onClick={() => copyToClipboard(results.hashtags || '', 'Hashtags')}
                    className="p-1 hover:bg-blue-200 dark:hover:bg-blue-500/20 rounded transition-colors opacity-0 group-hover:opacity-100"
                    title="Copy hashtags"
                  >
                    <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
                <p className="text-slate-700 dark:text-gray-300 text-sm break-words">{results.hashtags || 'N/A'}</p>
              </div>

              <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-lg p-4 relative group">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-green-900 dark:text-green-300 text-sm">🔍 Keywords</h4>
                  <button
                    onClick={() => copyToClipboard(results.keywords || '', 'Keywords')}
                    className="p-1 hover:bg-green-200 dark:hover:bg-green-500/20 rounded transition-colors opacity-0 group-hover:opacity-100"
                    title="Copy keywords"
                  >
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
                <p className="text-slate-700 dark:text-gray-300 text-sm break-words">{results.keywords || 'N/A'}</p>
              </div>

              <div className="bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 rounded-lg p-4 relative group">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-purple-900 dark:text-purple-300 text-sm">🎵 Audio</h4>
                  <button
                    onClick={() => copyToClipboard(results.music || '', 'Audio')}
                    className="p-1 hover:bg-purple-200 dark:hover:bg-purple-500/20 rounded transition-colors opacity-0 group-hover:opacity-100"
                    title="Copy audio suggestion"
                  >
                    <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
                <p className="text-slate-700 dark:text-gray-300 text-sm break-words">{results.music || 'N/A'}</p>
              </div>

              <div className="bg-pink-50 dark:bg-pink-500/10 border border-pink-200 dark:border-pink-500/20 rounded-lg p-4 relative group">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-pink-900 dark:text-pink-300 text-sm">🎬 Cover</h4>
                  <button
                    onClick={() => copyToClipboard(results.cover || '', 'Cover')}
                    className="p-1 hover:bg-pink-200 dark:hover:bg-pink-500/20 rounded transition-colors opacity-0 group-hover:opacity-100"
                    title="Copy cover suggestion"
                  >
                    <svg className="w-4 h-4 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
                <p className="text-slate-700 dark:text-gray-300 text-sm break-words">{results.cover || 'N/A'}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
