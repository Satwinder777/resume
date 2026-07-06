import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { DraftStatusBar } from '../components/DraftStatusBar'
import { ResumeTemplateRenderer } from '../components/templates/ResumeTemplateRenderer'
import { StepIndicator } from '../components/StepIndicator'
import { useResume } from '../context/ResumeContext'
import { useResumeExport } from '../utils/export'
import { getVariantById } from '../utils/templates'

export function PreviewPage() {
  const { data, selectedTemplateId } = useResume()
  const resumeRef = useRef<HTMLDivElement>(null)
  const { downloadPdf, downloadPng } = useResumeExport(resumeRef)
  const template = selectedTemplateId ? getVariantById(selectedTemplateId) : null

  if (!selectedTemplateId) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">No template selected</h2>
        <Link
          to="/templates"
          className="mt-6 inline-block rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-2.5 text-sm font-semibold text-white"
        >
          Choose template
        </Link>
      </div>
    )
  }

  return (
    <div>
      <StepIndicator currentStep={3} />
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <DraftStatusBar showSaveButton={false} />
        <div className="mb-6 mt-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Your resume is ready</h1>
            <p className="mt-1 text-slate-600 dark:text-slate-400">
              Template: <span className="font-medium">{template?.name}</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/edit"
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Edit details
            </Link>
            <button
              type="button"
              onClick={downloadPdf}
              className="rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:brightness-110"
            >
              Download as PDF
            </button>
            <button
              type="button"
              onClick={downloadPng}
              className="rounded-lg border border-violet-600 px-5 py-2 text-sm font-semibold text-violet-600 hover:bg-violet-50 dark:border-violet-400 dark:text-violet-400 dark:hover:bg-violet-950"
            >
              Download as PNG
            </button>
          </div>
        </div>

        <p className="no-print mb-4 text-sm text-slate-500 dark:text-slate-400">
          PDF download opens your browser print dialog. Set <strong>Margins: None</strong> and{' '}
          <strong>Scale: 100%</strong> for correct spacing. Choose &quot;Save as PDF&quot; for selectable text.
        </p>

        <div className="no-print overflow-x-auto rounded-xl border border-slate-200 bg-slate-100 p-4 dark:border-slate-700 dark:bg-slate-800">
          <div ref={resumeRef} className="resume-print-target">
            <ResumeTemplateRenderer templateId={selectedTemplateId} data={data} />
          </div>
        </div>
      </div>
    </div>
  )
}
