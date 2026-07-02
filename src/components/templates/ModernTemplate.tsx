import type { ResumeData, SectionConfig } from '../../types/resume'
import { formatDateRange, getContactParts, getVisibleSections } from './shared'

interface TemplateProps {
  data: ResumeData
  className?: string
}

function ContactIcon({ children }: { children: React.ReactNode }) {
  return <span className="mr-2 inline-block w-4 text-center text-indigo-300">{children}</span>
}

export function ModernTemplate({ data, className = '' }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, languages, certifications, projects, customSections, sectionOrder } = data
  const sections = getVisibleSections(sectionOrder)
  const contact = getContactParts(personalInfo)

  const renderSection = (section: SectionConfig) => {
    switch (section.type) {
      case 'summary':
        if (!summary) return null
        return (
          <section key={section.id} className="mb-5">
            <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-indigo-600">About</h2>
            <p className="text-sm leading-relaxed text-slate-700">{summary}</p>
          </section>
        )
      case 'experience':
        if (!experience.some((e) => e.company || e.role)) return null
        return (
          <section key={section.id} className="mb-5">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-indigo-600">Experience</h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <h3 className="font-semibold text-slate-900">{exp.role || 'Role'}</h3>
                  <p className="text-sm text-indigo-600">{exp.company}</p>
                  <p className="text-xs text-slate-500">{formatDateRange(exp.startDate, exp.endDate, exp.current)}</p>
                  {exp.bullets.filter(Boolean).length > 0 && (
                    <ul className="mt-1 list-disc space-y-0.5 pl-4 text-sm text-slate-700">
                      {exp.bullets.filter(Boolean).map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )
      case 'education':
        if (!education.some((e) => e.school || e.degree)) return null
        return (
          <section key={section.id} className="mb-5">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-indigo-600">Education</h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-semibold text-slate-900">{edu.degree}</h3>
                  <p className="text-sm text-slate-600">{edu.school}</p>
                  <p className="text-xs text-slate-500">{formatDateRange(edu.startDate, edu.endDate)}</p>
                </div>
              ))}
            </div>
          </section>
        )
      case 'skills':
        if (skills.length === 0) return null
        return (
          <section key={section.id} className="mb-5">
            <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-indigo-600">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill} className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )
      case 'languages':
        if (languages.length === 0) return null
        return (
          <section key={section.id} className="mb-5">
            <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-indigo-600">Languages</h2>
            <div className="space-y-1">
              {languages.map((l) => (
                <p key={l.id} className="text-sm text-slate-700">
                  <span className="font-medium">{l.language}</span>
                  {l.proficiency && <span className="text-slate-500"> — {l.proficiency}</span>}
                </p>
              ))}
            </div>
          </section>
        )
      case 'certifications':
        if (certifications.length === 0) return null
        return (
          <section key={section.id} className="mb-5">
            <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-indigo-600">Certifications</h2>
            {certifications.map((c) => (
              <p key={c.id} className="text-sm text-slate-700">
                {c.name}{c.issuer ? ` — ${c.issuer}` : ''}{c.date ? ` (${c.date})` : ''}
              </p>
            ))}
          </section>
        )
      case 'projects':
        if (projects.length === 0) return null
        return (
          <section key={section.id} className="mb-5">
            <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-indigo-600">Projects</h2>
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
                  <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-indigo-600">{cs.title}</h2>
                  <p className="whitespace-pre-wrap text-sm text-slate-700">{cs.content}</p>
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
    <div className={`resume-page mx-auto flex overflow-hidden text-slate-900 ${className}`}>
      <aside className="w-[72mm] shrink-0 bg-slate-800 p-6 text-white">
        <h1 className="text-xl font-bold leading-tight">{personalInfo.name || 'Your Name'}</h1>
        {personalInfo.jobTitle && <p className="mt-2 text-sm text-indigo-300">{personalInfo.jobTitle}</p>}
        <div className="mt-6 space-y-2 text-xs">
          {personalInfo.email && (
            <p><ContactIcon>✉</ContactIcon>{personalInfo.email}</p>
          )}
          {personalInfo.phone && (
            <p><ContactIcon>☎</ContactIcon>{personalInfo.phone}</p>
          )}
          {personalInfo.location && (
            <p><ContactIcon>⌖</ContactIcon>{personalInfo.location}</p>
          )}
          {personalInfo.linkedin && (
            <p><ContactIcon>in</ContactIcon>{personalInfo.linkedin}</p>
          )}
        </div>
        {skills.length > 0 && (
          <div className="mt-8">
            <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-indigo-300">Skills</h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((s) => (
                <span key={s} className="rounded bg-slate-700 px-2 py-0.5 text-xs">{s}</span>
              ))}
            </div>
          </div>
        )}
        {languages.length > 0 && (
          <div className="mt-6">
            <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-indigo-300">Languages</h2>
            {languages.map((l) => (
              <p key={l.id} className="text-xs">{l.language}{l.proficiency ? ` — ${l.proficiency}` : ''}</p>
            ))}
          </div>
        )}
      </aside>
      <main className="flex-1 p-8">
        {sections
          .filter((s) => !['skills', 'languages'].includes(s.type))
          .map((section) => renderSection(section))}
        {contact.length === 0 && sections.length === 0 && (
          <p className="text-sm text-slate-400">Start filling in your details to see your resume.</p>
        )}
      </main>
    </div>
  )
}
