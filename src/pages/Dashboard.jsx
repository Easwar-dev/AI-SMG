/**
 * Dashboard Page
 * Protected route - only accessible to authenticated users
 * Main hub for AI social media strategy generation
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { StrategyGenerator } from '../components/StrategyGenerator'
import { StrategyHistory } from '../components/StrategyHistory'
import { SettingsModal } from '../components/SettingsModal'
import { toast } from 'react-hot-toast'

export const Dashboard = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [showSettings, setShowSettings] = useState(false)

  const handleLogout = async () => {
    try {
      await logout()
      toast.success('Logged out successfully!')
      navigate('/')
    } catch (error) {
      toast.error('Error logging out')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F0FDF4] to-[#DCFCE7] font-sans text-slate-950 transition-colors duration-500 dark:from-slate-900 dark:to-slate-800 dark:text-white px-4 py-8">
      {/* Theme Toggle Button */}
      <button
        type="button"
        onClick={() => setShowSettings(true)}
        className="fixed right-5 top-5 z-30 inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200/80 bg-white/85 text-slate-700 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.55)] backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-white dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-100 dark:hover:bg-slate-900"
        aria-label="Settings"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      <div className="max-w-6xl mx-auto relative">
        {/* Background Blur Effects */}
        <div className="absolute inset-0 -z-20 pointer-events-none">
          <div className="absolute left-[-8rem] top-[-6rem] h-72 w-72 rounded-full bg-white/55 blur-3xl dark:bg-slate-700/30" />
          <div className="absolute bottom-[-9rem] right-[-2rem] h-80 w-80 rounded-full bg-emerald-200/55 blur-3xl dark:bg-emerald-500/10" />
        </div>

        {/* Header */}
        <div className="mb-12 relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-950 dark:text-white mb-2">
                Welcome, {user?.name}!
              </h1>
              <p className="text-slate-600 dark:text-slate-300 text-lg">
                Create AI-powered social media strategies instantly
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="space-y-8 relative z-10">
          {/* Strategy Generator */}
          <StrategyGenerator />
          
          {/* Strategy History */}
          <StrategyHistory />
        </div>
      </div>

      {/* Settings Modal */}
      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </div>
  )
}
