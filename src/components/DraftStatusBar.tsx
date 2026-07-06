import { useResume, formatLastSaved } from '../context/ResumeContext'

export function DraftStatusBar({ showSaveButton = true }: { showSaveButton?: boolean }) {
  const { lastSavedAt, saveStatus, saveError, saveDraft } = useResume()

  const statusText = () => {
    if (saveStatus === 'error') return saveError ?? 'Save failed'
    if (saveStatus === 'saving') return 'Saving draft…'
    if (saveStatus === 'saved' && lastSavedAt) return `Draft saved · ${formatLastSaved(lastSavedAt)}`
    return 'Fill in your details — autosaves to this device'
  }

  const dotColor = () => {
    if (saveStatus === 'error') return 'bg-red-500'
    if (saveStatus === 'saving') return 'bg-amber-400 animate-pulse'
    if (saveStatus === 'saved') return 'bg-emerald-500'
    return 'bg-slate-400'
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
      <div className="flex min-w-0 items-center gap-2.5">
        <span className={`h-2 w-2 shrink-0 rounded-full ${dotColor()}`} aria-hidden />
        <p className={`text-sm ${saveStatus === 'error' ? 'text-red-600 dark:text-red-400' : 'text-slate-600 dark:text-slate-400'}`}>
          {statusText()}
        </p>
      </div>
      {showSaveButton && (
        <button
          type="button"
          onClick={saveDraft}
          disabled={saveStatus === 'saving'}
          className="shrink-0 rounded-lg border border-violet-300 bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700 transition hover:bg-violet-100 disabled:opacity-60 dark:border-violet-700 dark:bg-violet-950/50 dark:text-violet-300 dark:hover:bg-violet-900/50"
        >
          Save as draft
        </button>
      )}
    </div>
  )
}
