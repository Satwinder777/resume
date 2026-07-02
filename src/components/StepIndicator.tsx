import { Link } from 'react-router-dom'

const STEPS = [
  { step: 1, label: 'Choose template', path: '/templates' },
  { step: 2, label: 'Enter your details', path: '/edit' },
  { step: 3, label: 'Download resume', path: '/preview' },
] as const

interface StepIndicatorProps {
  currentStep: 1 | 2 | 3
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <nav className="no-print border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900" aria-label="Progress">
      <ol className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6">
        {STEPS.map(({ step, label, path }, index) => {
          const isActive = step === currentStep
          const isComplete = step < currentStep

          return (
            <li key={step} className="flex flex-1 items-center">
              <Link
                to={path}
                className={`group flex items-center gap-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-violet-600 dark:text-violet-400'
                    : isComplete
                      ? 'text-slate-600 hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-400'
                      : 'pointer-events-none text-slate-400 dark:text-slate-600'
                }`}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-gradient-to-br from-violet-600 to-indigo-600 text-white'
                      : isComplete
                        ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300'
                        : 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500'
                  }`}
                >
                  {isComplete ? '✓' : step}
                </span>
                <span className="hidden sm:inline">{label}</span>
              </Link>
              {index < STEPS.length - 1 && (
                <div
                  className={`mx-2 hidden h-px flex-1 sm:block ${
                    step < currentStep ? 'bg-violet-300 dark:bg-violet-700' : 'bg-slate-200 dark:bg-slate-700'
                  }`}
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
