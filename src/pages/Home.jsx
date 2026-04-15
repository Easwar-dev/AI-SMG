/**
 * Home Page
 * Landing page with signup/login buttons
 */

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Floating Icons Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-6xl opacity-10 animate-float">📱</div>
        <div className="absolute top-40 right-20 text-6xl opacity-10 animate-float delay-100">🎬</div>
        <div className="absolute bottom-32 left-1/4 text-6xl opacity-10 animate-float delay-200">📹</div>
        <div className="absolute bottom-20 right-1/3 text-6xl opacity-10 animate-float delay-300">🎵</div>
        <div className="absolute top-1/3 right-10 text-6xl opacity-10 animate-float delay-500">✨</div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32">
        <div className="text-center mb-12">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-fadeIn">
            Boost Your Productivity with AI
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8 animate-slideFromTop">
            Create engaging social media content in seconds with our AI-powered generator
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 rounded-lg font-semibold transition duration-300 transform hover:scale-105"
                >
                  Go to Dashboard
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 rounded-lg font-semibold transition duration-300 transform hover:scale-105 text-center"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-3 border-2 border-blue-500 text-blue-400 hover:bg-blue-500/10 rounded-lg font-semibold transition duration-300"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            {
              title: 'Smart Generation',
              description: 'Create professional social media content instantly',
              icon: '🚀'
            },
            {
              title: 'Multi-Platform',
              description: 'Optimized for Instagram, TikTok, YouTube and more',
              icon: '📱'
            },
            {
              title: 'Easy Publishing',
              description: 'Schedule and publish to all platforms at once',
              icon: '✨'
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-slate-800 rounded-lg border border-slate-700 hover:border-blue-500 transition duration-300 transform hover:-translate-y-2"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
