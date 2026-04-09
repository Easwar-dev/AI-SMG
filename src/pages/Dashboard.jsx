/**
 * Dashboard Page
 * Protected route - only accessible to authenticated users
 * Main hub for AI social media strategy generation
 */

import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { StrategyGenerator } from '../components/StrategyGenerator'
import { StrategyHistory } from '../components/StrategyHistory'
import { SettingsModal } from '../components/SettingsModal'

export const Dashboard = () => {
  const { user } = useAuth()
  const [showSettings, setShowSettings] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                Welcome, {user?.name}!
              </h1>
              <p className="text-gray-400 text-lg">
                Create AI-powered social media strategies instantly
              </p>
            </div>
            
            <button
              onClick={() => setShowSettings(true)}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition duration-200 border border-white/20"
              title="Settings"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="space-y-8">
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
