import { Link, Outlet } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'

export function Logo({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const icon = size === 'sm' ? 'h-7 w-7 text-xs' : 'h-9 w-9 text-sm'
  const text = size === 'sm' ? 'text-base' : 'text-xl'

  return (
    <span className="flex items-center gap-2.5">
      <span className={`flex ${icon} items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 font-bold text-white shadow-md shadow-violet-500/30`}>
        S
      </span>
      <span className={`${text} font-bold tracking-tight`}>
        <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-400">
          Sat
        </span>
        <span className="text-slate-900 dark:text-white">Craft</span>
      </span>
    </span>
  )
}

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
      <header className="no-print sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
          <Link to="/" className="transition-opacity hover:opacity-80">
            <Logo />
          </Link>
          <div className="flex items-center gap-3">
            <Link
              to="/templates"
              className="hidden rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-violet-600 sm:inline dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-violet-400"
            >
              Templates
            </Link>
            <ThemeToggle />
            <Link
              to="/templates"
              className="rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-violet-500/25 transition hover:shadow-md hover:brightness-110"
            >
              Build resume
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="no-print border-t border-slate-200 bg-white py-8 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <Logo size="sm" />
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            Craft your career story — free, private, runs entirely in your browser.
          </p>
          <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">© {new Date().getFullYear()} SatCraft</p>
        </div>
      </footer>
    </div>
  )
}
