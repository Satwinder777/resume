import { Link, useNavigate } from 'react-router-dom'
import { DraftStatusBar } from '../components/DraftStatusBar'
import { ResumeForm } from '../components/form/ResumeForm'
import { ResumePreview } from '../components/ResumePreview'
import { StepIndicator } from '../components/StepIndicator'
import { useResume } from '../context/ResumeContext'
import { getVariantById } from '../utils/templates'

const btnPrimary =
  'rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-110'
const btnSecondary =
  'rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800'

export function EditPage() {
  const { selectedTemplateId } = useResume()
  const navigate = useNavigate()
  const template = selectedTemplateId ? getVariantById(selectedTemplateId) : null

  if (!selectedTemplateId) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">No template selected</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Choose a template to start crafting your resume.</p>
        <Link to="/templates" className={`mt-6 inline-block px-6 py-2.5 ${btnPrimary}`}>
          Choose template
        </Link>
      </div>
    )
  }

  return (
    <div>
      <StepIndicator currentStep={2} />
      <div className="border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900 sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Current template</p>
            <p className="font-medium text-slate-900 dark:text-white">{template?.name}</p>
          </div>
          <div className="flex gap-3">
            <Link to="/templates" className={btnSecondary}>
              Change template
            </Link>
            <button type="button" onClick={() => navigate('/preview')} className={btnPrimary}>
              Continue to download
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-2 lg:px-6">
        <div className="min-w-0 space-y-4">
          <DraftStatusBar />
          <ResumeForm />
        </div>
        <div className="no-print lg:sticky lg:top-20 lg:self-start">
          <h2 className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-300">Live preview</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-100 p-4 dark:border-slate-700 dark:bg-slate-800">
            <ResumePreview scale={0.5} />
          </div>
        </div>
      </div>
    </div>
  )
}
