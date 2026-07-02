interface FormFieldProps {
  label: string
  children: React.ReactNode
  className?: string
}

export function FormField({ label, children, className = '' }: FormFieldProps) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
      {children}
    </label>
  )
}

export const inputClass =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100'

export const textareaClass =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 min-h-[100px] resize-y dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100'

export function FormSection({
  title,
  children,
  onRemove,
  optional,
}: {
  title: string
  children: React.ReactNode
  onRemove?: () => void
  optional?: boolean
}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          {title}
          {optional && <span className="ml-2 text-xs font-normal text-slate-400">(optional)</span>}
        </h3>
        {onRemove && (
          <button type="button" onClick={onRemove} className="text-sm text-red-500 hover:text-red-700">
            Remove
          </button>
        )}
      </div>
      {children}
    </section>
  )
}

export function AddButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 py-2.5 text-sm font-medium text-slate-600 transition hover:border-violet-400 hover:text-violet-600 dark:border-slate-600 dark:text-slate-400 dark:hover:border-violet-500 dark:hover:text-violet-400"
    >
      + {label}
    </button>
  )
}

export function RemoveItemButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-xs text-red-500 hover:text-red-700"
      aria-label="Remove item"
    >
      Remove
    </button>
  )
}
