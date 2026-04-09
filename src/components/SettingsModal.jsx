/**
 * SettingsModal Component
 * Displays user profile and account management options
 */

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { tokenStorage } from '../utils/tokenStorage'
import { Toaster, toast } from 'react-hot-toast'

export const SettingsModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const handleDeleteAllHistory = async () => {
    if (!confirm('Delete all your strategies? This cannot be undone.')) return

    setDeleting(true)
    try {
      const token = tokenStorage.getAccessToken()
      
      const response = await fetch('http://localhost:5000/api/generation/history/all', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to delete history')
      }

      toast.success('All strategies deleted')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setDeleting(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (!confirm('This will permanently delete your account and all data. Are you sure?')) return

    setDeleting(true)
    try {
      const token = tokenStorage.getAccessToken()
      
      const response = await fetch('http://localhost:5000/api/auth/delete-account', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to delete account')
      }

      toast.success('Account deleted successfully')
      await logout()
      setTimeout(() => navigate('/', { replace: true }), 1500)
    } catch (err) {
      toast.error(err.message)
    } finally {
      setDeleting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <Toaster position="top-right" />
      
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative z-10 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-white/10 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">⚙️ Settings</h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Profile Section */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              👤 Profile
            </h3>
            
            <div className="space-y-3">
              <div className="bg-slate-50 dark:bg-white/5 rounded-lg p-4">
                <p className="text-sm text-slate-600 dark:text-gray-400 mb-1">Name</p>
                <p className="text-slate-900 dark:text-white font-medium">{user?.name}</p>
              </div>
              
              <div className="bg-slate-50 dark:bg-white/5 rounded-lg p-4">
                <p className="text-sm text-slate-600 dark:text-gray-400 mb-1">Email</p>
                <p className="text-slate-900 dark:text-white font-medium break-all">{user?.email}</p>
              </div>
              
              <div className="bg-slate-50 dark:bg-white/5 rounded-lg p-4">
                <p className="text-sm text-slate-600 dark:text-gray-400 mb-1">Member Since</p>
                <p className="text-slate-900 dark:text-white font-medium">
                  {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Actions Section */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              🎬 Actions
            </h3>
            
            <div className="space-y-3">
              <button
                onClick={handleDeleteAllHistory}
                disabled={deleting} 
                className="w-full px-4 py-2.5 bg-orange-600 hover:bg-orange-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-medium rounded-lg transition duration-200"
              >
                {deleting ? 'Processing...' : 'Delete All Strategies'}
              </button>
              
              <button
                onClick={handleDeleteAccount}
                disabled={deleting}
                className="w-full px-4 py-2.5 bg-red-600 hover:bg-red-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-medium rounded-lg transition duration-200"
              >
                {deleting ? 'Processing...' : 'Delete Account'}
              </button>
            </div>
          </div>

          {/* Warning */}
          <div className="bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/20 rounded-lg p-4">
            <p className="text-sm text-yellow-800 dark:text-yellow-300">
              ⚠️ Deleting your account will permanently remove all your data. This action cannot be undone.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 dark:border-white/10 px-6 py-4">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-slate-200 dark:bg-white/10 text-slate-900 dark:text-white font-medium rounded-lg hover:bg-slate-300 dark:hover:bg-white/20 transition duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
