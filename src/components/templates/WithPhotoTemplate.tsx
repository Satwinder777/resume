import type { ResumeData, SectionConfig } from '../../types/resume'
import { formatDateRange, getContactParts, getVisibleSections } from './shared'

interface TemplateProps {
  data: ResumeData
  className?: string
}

export function WithPhotoTemplate({ data, className = '' }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, languages, certifications, projects, customSections, sectionOrder } = data
  const sections = getVisibleSections(sectionOrder)
  const contact = getContactParts(personalInfo)

  const renderSection = (section: SectionConfig) => {
    switch (section.type) {
      case 'summary':
        if (!summary) return null
        return (
          <section key={section.id} className="mb-5">
            <h2 className="mb-2 border-b-2 border-indigo-500 pb-1 text-sm font-bold text-indigo-600">Summary</h2>
            <p className="text-sm leading-relaxed text-slate-700">{summary}</p>
          </section>
        )
      case 'experience':
        if (!experience.some((e) => e.company || e.role)) return null
        return (
          <section key={section.id} className="mb-5">
            <h2 className="mb-3 border-b-2 border-indigo-500 pb-1 text-sm font-bold text-indigo-600">Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-slate-900">{exp.role}</h3>
                  <span className="text-xs text-slate-500">{formatDateRange(exp.startDate, exp.endDate, exp.current)}</span>
                </div>
                <p className="text-sm text-indigo-600">{exp.company}</p>
                <ul className="mt-1 list-disc pl-4 text-sm text-slate-700">
                  {exp.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            ))}
          </section>
        )
      case 'education':
        if (!education.some((e) => e.school || e.degree)) return null
        return (
          <section key={section.id} className="mb-5">
            <h2 className="mb-3 border-b-2 border-indigo-500 pb-1 text-sm font-bold text-indigo-600">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-2">
                <h3 className="font-semibold">{edu.degree}</h3>
                <p className="text-sm text-slate-600">{edu.school}</p>
                <p className="text-xs text-slate-500">{formatDateRange(edu.startDate, edu.endDate)}</p>
              </div>
            ))}
          </section>
        )
      case 'skills':
        if (skills.length === 0) return null
        return (
          <section key={section.id} className="mb-5">
            <h2 className="mb-2 border-b-2 border-indigo-500 pb-1 text-sm font-bold text-indigo-600">Skills</h2>
            <p className="text-sm text-slate-700">{skills.join(' · ')}</p>
          </section>
        )
      case 'languages':
        if (languages.length === 0) return null
        return (
          <section key={section.id} className="mb-5">
            <h2 className="mb-2 border-b-2 border-indigo-500 pb-1 text-sm font-bold text-indigo-600">Languages</h2>
            <p className="text-sm">{languages.map((l) => `${l.language} (${l.proficiency})`).join(' · ')}</p>
          </section>
        )
      case 'certifications':
        if (certifications.length === 0) return null
        return (
          <section key={section.id} className="mb-5">
            <h2 className="mb-2 border-b-2 border-indigo-500 pb-1 text-sm font-bold text-indigo-600">Certifications</h2>
            {certifications.map((c) => (
              <p key={c.id} className="text-sm">{c.name} — {c.issuer} ({c.date})</p>
            ))}
          </section>
        )
      case 'projects':
        if (projects.length === 0) return null
        return (
          <section key={section.id} className="mb-5">
            <h2 className="mb-2 border-b-2 border-indigo-500 pb-1 text-sm font-bold text-indigo-600">Projects</h2>
            {projects.map((p) => (
              <div key={p.id} className="mb-2">
                <h3 className="text-sm font-semibold">{p.name}</h3>
                <p className="text-sm text-slate-600">{p.description}</p>
              </div>
            ))}
          </section>
        )
      case 'custom':
        return (
          <>
            {customSections.map((cs) =>
              cs.title || cs.content ? (
                <section key={cs.id} className="mb-5">
                  <h2 className="mb-2 border-b-2 border-indigo-500 pb-1 text-sm font-bold text-indigo-600">{cs.title}</h2>
                  <p className="whitespace-pre-wrap text-sm">{cs.content}</p>
                </section>
              ) : null,
            )}
          </>
        )
      default:
        return null
    }
  }

  return (
    <div className={`resume-page mx-auto flex gap-6 p-8 text-slate-900 ${className}`}>
      <aside className="w-[60mm] shrink-0 text-center">
        <div className="mx-auto mb-4 h-28 w-28 overflow-hidden rounded-full border-4 border-indigo-500 bg-slate-100">
          {personalInfo.photo ? (
            <img src={personalInfo.photo} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-3xl text-slate-400">
              {(personalInfo.name || '?').charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <h1 className="text-lg font-bold">{personalInfo.name || 'Your Name'}</h1>
        {personalInfo.jobTitle && <p className="mt-1 text-sm text-indigo-600">{personalInfo.jobTitle}</p>}
        <div className="mt-4 space-y-1 text-left text-xs text-slate-600">
          {contact.map((c) => (
            <p key={c}>{c}</p>
          ))}
        </div>
      </aside>
      <main className="flex-1 border-l border-slate-200 pl-6">
        {sections.map((section) => renderSection(section))}
      </main>
    </div>
  )
}
