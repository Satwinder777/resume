import type { ResumeData, SectionConfig } from '../../types/resume'
import { formatDateRange, getVisibleSections } from './shared'

interface TemplateProps {
  data: ResumeData
  className?: string
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="resume-section-heading mb-2 border-b border-slate-900 pb-1 text-xs font-bold uppercase tracking-widest text-slate-900">
      {children}
    </h2>
  )
}

export function SimpleTemplate({ data, className = '' }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, languages, certifications, projects, customSections, sectionOrder } = data
  const sections = getVisibleSections(sectionOrder)

  const contact = [personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.website, personalInfo.linkedin]
    .filter(Boolean)
    .join(' · ')

  const renderSection = (section: SectionConfig) => {
    switch (section.type) {
      case 'summary':
        if (!summary) return null
        return (
          <section key={section.id} className="resume-section mb-5">
            <SectionHeading>Summary</SectionHeading>
            <p className="text-sm leading-relaxed text-slate-700">{summary}</p>
          </section>
        )
      case 'experience':
        if (!experience.some((e) => e.company || e.role)) return null
        return (
          <section key={section.id} className="resume-section mb-5">
            <SectionHeading>Experience</SectionHeading>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="resume-entry">
                  <div className="resume-job-header">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="text-sm font-semibold text-slate-900">{exp.role || 'Role'}</h3>
                      <span className="shrink-0 text-xs text-slate-500">
                        {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-slate-600">{exp.company}</p>
                  </div>
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
          <section key={section.id} className="resume-section mb-5">
            <SectionHeading>Education</SectionHeading>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="resume-entry">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-sm font-semibold text-slate-900">{edu.degree || 'Degree'}</h3>
                    <span className="shrink-0 text-xs text-slate-500">
                      {formatDateRange(edu.startDate, edu.endDate)}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">{edu.school}</p>
                </div>
              ))}
            </div>
          </section>
        )
      case 'skills':
        if (skills.length === 0) return null
        return (
          <section key={section.id} className="resume-section mb-5">
            <SectionHeading>Skills</SectionHeading>
            <p className="text-sm text-slate-700">{skills.join(' · ')}</p>
          </section>
        )
      case 'languages':
        if (languages.length === 0) return null
        return (
          <section key={section.id} className="resume-section mb-5">
            <SectionHeading>Languages</SectionHeading>
            <p className="text-sm text-slate-700">
              {languages.map((l) => `${l.language}${l.proficiency ? ` (${l.proficiency})` : ''}`).join(' · ')}
            </p>
          </section>
        )
      case 'certifications':
        if (certifications.length === 0) return null
        return (
          <section key={section.id} className="resume-section mb-5">
            <SectionHeading>Certifications</SectionHeading>
            <div className="space-y-2">
              {certifications.map((c) => (
                <div key={c.id} className="text-sm">
                  <span className="font-medium text-slate-900">{c.name}</span>
                  {c.issuer && <span className="text-slate-600"> — {c.issuer}</span>}
                  {c.date && <span className="text-slate-500"> ({c.date})</span>}
                </div>
              ))}
            </div>
          </section>
        )
      case 'projects':
        if (projects.length === 0) return null
        return (
          <section key={section.id} className="resume-section mb-5">
            <SectionHeading>Projects</SectionHeading>
            <div className="space-y-3">
              {projects.map((p) => (
                <div key={p.id}>
                  <h3 className="text-sm font-semibold text-slate-900">{p.name}</h3>
                  <p className="text-sm text-slate-700">{p.description}</p>
                  {p.url && <p className="text-xs text-slate-500">{p.url}</p>}
                </div>
              ))}
            </div>
          </section>
        )
      case 'custom':
        return (
          <>
            {customSections.map((cs) =>
              cs.title || cs.content ? (
                <section key={cs.id} className="resume-section mb-5">
                  <SectionHeading>{cs.title || 'Custom Section'}</SectionHeading>
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
    <div className={`resume-page mx-auto p-10 text-slate-900 ${className}`}>
      <header className="mb-6 border-b border-slate-900 pb-4">
        <h1 className="text-2xl font-bold tracking-tight">{personalInfo.name || 'Your Name'}</h1>
        {personalInfo.jobTitle && (
          <p className="mt-1 text-base text-slate-600">{personalInfo.jobTitle}</p>
        )}
        {contact && <p className="mt-2 text-xs text-slate-500">{contact}</p>}
      </header>
      {sections.map((section) => renderSection(section))}
    </div>
  )
}
