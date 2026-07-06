import { Link, useNavigate, useParams } from 'react-router-dom'
import { ResumeTemplateRenderer } from '../components/templates/ResumeTemplateRenderer'
import { StepIndicator } from '../components/StepIndicator'
import { useResume, formatLastSaved } from '../context/ResumeContext'
import type { TemplateCategory, TemplateId } from '../types/resume'
import {
  CATEGORY_PAGES,
  DEFAULT_TEMPLATE_ID,
  FILTER_TABS,
  filterVariants,
  parseCategoryParam,
} from '../data/templateVariants'
import { createDefaultResumeData } from '../utils/defaults'
import { hasDraftData } from '../utils/storage'

const PREVIEW_DATA = (() => {
  const data = createDefaultResumeData()
  data.personalInfo = {
    name: 'Jane Doe',
    jobTitle: 'Product Manager',
    email: 'jane@email.com',
    phone: '+1 555 0100',
    location: 'New York, NY',
    linkedin: 'linkedin.com/in/janedoe',
    website: 'janedoe.com',
    photo: null,
  }
  data.summary = 'Results-driven professional with 5+ years of experience delivering measurable outcomes.'
  data.skills = ['Leadership', 'Strategy', 'Analytics', 'Communication']
  data.languages = [{ id: '1', language: 'English', proficiency: 'Native' }]
  data.experience[0] = {
    ...data.experience[0],
    company: 'Acme Corp',
    role: 'Senior Manager',
    startDate: '2021',
    endDate: 'Present',
    current: true,
    bullets: ['Led cross-functional teams across 3 regions', 'Increased revenue by 30% year over year'],
  }
  data.education[0] = {
    ...data.education[0],
    school: 'State University',
    degree: 'B.A. Business Administration',
    startDate: '2015',
    endDate: '2019',
  }
  return data
})()

function TemplateCard({
  templateId,
  onSelect,
}: {
  templateId: TemplateId
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:border-violet-400 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:hover:border-violet-500"
    >
      <div className="relative aspect-[210/297] w-full overflow-hidden bg-slate-50 dark:bg-slate-800">
        <div
          className="pointer-events-none absolute left-1/2 top-0"
          style={{ transform: 'translateX(-50%) scale(0.24)', transformOrigin: 'top center', width: '210mm' }}
        >
          <ResumeTemplateRenderer templateId={templateId} data={PREVIEW_DATA} />
        </div>
      </div>
    </button>
  )
}

export function TemplatesPage() {
  const { category: categoryParam } = useParams<{ category?: string }>()
  const activeFilter = parseCategoryParam(categoryParam)
  const { setSelectedTemplateId, data, lastSavedAt, selectedTemplateId } = useResume()
  const navigate = useNavigate()
  const templates = filterVariants(activeFilter)
  const page = CATEGORY_PAGES[activeFilter]
  const draftExists = hasDraftData(data)

  const selectTemplate = (id: TemplateId) => {
    setSelectedTemplateId(id)
    navigate('/edit')
  }

  const chooseLater = () => {
    setSelectedTemplateId(DEFAULT_TEMPLATE_ID)
    navigate('/edit')
  }

  const tabPath = (value: TemplateCategory | 'all') => {
    if (value === 'all') return '/templates'
    if (value === 'ats-friendly') return '/templates/ats'
    return `/templates/${value}`
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <StepIndicator currentStep={1} />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">{page.title}</h1>
            <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-400">{page.description}</p>
          </div>
          <button
            type="button"
            onClick={chooseLater}
            className="shrink-0 rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Choose later
          </button>
        </div>

        {draftExists && selectedTemplateId && (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 dark:border-emerald-900 dark:bg-emerald-950/40">
            <p className="text-sm text-emerald-800 dark:text-emerald-300">
              You have a saved draft{lastSavedAt ? ` · ${formatLastSaved(lastSavedAt)}` : ''}
            </p>
            <Link
              to="/edit"
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500"
            >
              Continue draft
            </Link>
          </div>
        )}

        <div className="mt-8 flex gap-2 overflow-x-auto border-b border-slate-200 pb-px dark:border-slate-700">
          {FILTER_TABS.map((tab) => {
            const isActive = activeFilter === tab.value
            return (
              <Link
                key={tab.value}
                to={tabPath(tab.value)}
                className={`shrink-0 border-b-2 px-4 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? 'border-violet-600 text-violet-600 dark:border-violet-400 dark:text-violet-400'
                    : 'border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-900 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </Link>
            )
          })}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              templateId={template.id}
              onSelect={() => selectTemplate(template.id)}
            />
          ))}
        </div>

        {templates.length === 0 && (
          <p className="mt-12 text-center text-slate-500">No templates in this category.</p>
        )}
      </div>
    </div>
  )
}
