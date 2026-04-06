import { useEffect, useState } from 'react'

const floatingIcons = [
  {
    src: '/skill-icons_instagram.svg',
    className: 'left-[6%] top-[24%] hidden w-28 sm:block lg:w-40',
    delay: '0s',
    duration: '6.4s',
    entryAnimation: 'animate-slideFromLeft',
  },
  {
    src: '/logos_youtube-icon.svg',
    className: 'left-1/2 top-[14%] hidden w-24 -translate-x-1/2 sm:block lg:w-28',
    delay: '1s',
    duration: '7.2s',
    entryAnimation: 'animate-slideFromTop',
  },
  {
    src: '/devicon_twitter.svg',
    className: 'left-[18%] bottom-[28%] hidden w-16 md:block lg:w-20',
    delay: '2s',
    duration: '5.8s',
    entryAnimation: 'animate-slideFromLeft',
  },
  {
    src: '/logos_facebook.svg',
    className: 'right-[7%] top-[36%] hidden w-28 md:block lg:w-40',
    delay: '0.6s',
    duration: '6.8s',
    entryAnimation: 'animate-slideFromRight',
  },
  {
    src: '/logos_tiktok-icon.svg',
    className: 'right-[20%] top-[15%] hidden w-14 sm:block lg:w-16',
    delay: '1.6s',
    duration: '7.6s',
    entryAnimation: 'animate-slideFromRight',
  },
  {
    src: '/streamline-ultimate-color_snapchat-logo.svg',
    className: 'right-[31%] bottom-[25%] hidden w-20 sm:block lg:w-24',
    delay: '2.4s',
    duration: '6.2s',
    entryAnimation: 'animate-slideFromBottom',
  },
]

const THEME_STORAGE_KEY = 'ai-smg-theme'

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.25M12 19.25v2.25M4.93 4.93l1.6 1.6M17.47 17.47l1.6 1.6M2.5 12h2.25M19.25 12h2.25M4.93 19.07l1.6-1.6M17.47 6.53l1.6-1.6" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M21 12.8A8.8 8.8 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" />
    </svg>
  )
}

function App() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)

    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  const isDark = theme === 'dark'

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F0FDF4] to-[#DCFCE7] font-sans text-slate-950 transition-colors duration-500 dark:from-slate-900 dark:to-slate-800 dark:text-white">
      <button
        type="button"
        onClick={() => setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))}
        className="fixed right-5 top-5 z-30 inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200/80 bg-white/85 text-slate-700 opacity-0 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.55)] backdrop-blur animate-contentReveal transition-all duration-300 hover:-translate-y-0.5 hover:bg-white dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-100 dark:hover:bg-slate-900"
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDark ? <SunIcon /> : <MoonIcon />}
      </button>

      <section className="relative isolate flex min-h-screen items-center justify-center overflow-hidden px-6 py-16 sm:px-10 lg:px-16">
        <div className="absolute inset-0 -z-20">
          <div className="absolute left-[-8rem] top-[-6rem] h-72 w-72 rounded-full bg-white/55 blur-3xl dark:bg-slate-700/30" />
          <div className="absolute bottom-[-9rem] right-[-2rem] h-80 w-80 rounded-full bg-emerald-200/55 blur-3xl dark:bg-emerald-500/10" />
        </div>

        <div className="absolute inset-0 -z-10 pointer-events-none">
          {floatingIcons.map((icon) => (
            <div key={icon.src} className={`absolute ${icon.className}`}>
              <div className={icon.entryAnimation}>
                <img
                  src={icon.src}
                  alt=""
                  aria-hidden="true"
                  className="block w-full animate-float opacity-80 mix-blend-multiply transition-opacity duration-500 dark:opacity-70 dark:mix-blend-screen"
                  style={{
                    animationDelay: icon.delay,
                    animationDuration: icon.duration,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center opacity-0 animate-contentReveal">
          <p className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 font-sans text-sm font-semibold uppercase tracking-[0.24em] text-indigo-400 shadow-sm backdrop-blur dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400">
            AI Social Media Generator
          </p>

          <h1 className="mt-8 max-w-3xl font-display text-5xl font-bold leading-[1.08] tracking-[-0.05em] text-slate-950 sm:text-6xl lg:text-7xl dark:text-white">
            Boost Your Productivity with AI
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-300">
            Stop wasting time thinking of tags, keywords, or the perfect
            background music.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button className="inline-flex min-w-36 items-center justify-center rounded-md bg-[#4F46E5] px-8 py-3.5 font-sans text-base font-semibold text-white shadow-[0_18px_40px_-20px_rgba(79,70,229,0.9)] transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#4338CA]">
              Signup
            </button>
            <button className="inline-flex min-w-36 items-center justify-center rounded-md border border-[#4F46E5]/20 bg-[#4F46E5] px-8 py-3.5 font-sans text-base font-semibold text-white shadow-[0_18px_40px_-24px_rgba(79,70,229,0.7)] transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#4338CA]">
              Login
            </button>
          </div>

          <div className="mt-14 grid w-full max-w-3xl gap-4 text-left text-sm text-slate-700 sm:grid-cols-3 dark:text-slate-300">
            <div className="rounded-2xl border border-white/80 bg-white/55 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
              <p className="font-sans text-lg font-bold text-slate-950 dark:text-white">
                Signup
              </p>
              <p className="mt-2 leading-6">
                Start a campaign workspace and save your brand voice once.
              </p>
            </div>
            <div className="rounded-2xl border border-white/80 bg-white/55 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
              <p className="font-sans text-lg font-bold text-slate-950 dark:text-white">
                Generate
              </p>
              <p className="mt-2 leading-6">
                Turn one topic into captions, hooks, tags, and post variations.
              </p>
            </div>
            <div className="rounded-2xl border border-white/80 bg-white/55 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
              <p className="font-sans text-lg font-bold text-slate-950 dark:text-white">
                Publish
              </p>
              <p className="mt-2 leading-6">
                Export ideas built for Instagram, TikTok, YouTube, and more.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
