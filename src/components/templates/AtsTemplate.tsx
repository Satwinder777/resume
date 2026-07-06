import type { ResumeData, SectionConfig } from '../../types/resume'
import { formatDateRange, getContactParts, getVisibleSections } from './shared'

interface TemplateProps {
  data: ResumeData
  className?: string
}

const SECTION_LABELS: Record<string, string> = {
  summary: 'SUMMARY',
  experience: 'EXPERIENCE',
  education: 'EDUCATION',
  skills: 'SKILLS',
  languages: 'LANGUAGES',
  certifications: 'CERTIFICATIONS',
  projects: 'PROJECTS',
}

export function AtsTemplate({ data, className = '' }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, languages, certifications, projects, customSections, sectionOrder } = data
  const sections = getVisibleSections(sectionOrder)
  const contact = getContactParts(personalInfo)

  const renderSection = (section: SectionConfig) => {
    const label = SECTION_LABELS[section.type]

    switch (section.type) {
      case 'summary':
        if (!summary) return null
        return (
          <div key={section.id} className="resume-section mb-4">
            <p className="mb-1 text-sm font-bold">{label}</p>
            <p className="text-sm">{summary}</p>
          </div>
        )
      case 'experience':
        if (!experience.some((e) => e.company || e.role)) return null
        return (
          <div key={section.id} className="resume-section mb-4">
            <p className="mb-2 text-sm font-bold">{label}</p>
            {experience.map((exp) => (
              <div key={exp.id} className="resume-entry mb-3">
                <p className="text-sm font-bold">{exp.role}</p>
                <p className="text-sm">{exp.company}</p>
                <p className="text-sm">{formatDateRange(exp.startDate, exp.endDate, exp.current)}</p>
                {exp.bullets.filter(Boolean).map((b, i) => (
                  <p key={i} className="text-sm">- {b}</p>
                ))}
              </div>
            ))}
          </div>
        )
      case 'education':
        if (!education.some((e) => e.school || e.degree)) return null
        return (
          <div key={section.id} className="resume-section mb-4">
            <p className="mb-2 text-sm font-bold">{label}</p>
            {education.map((edu) => (
              <div key={edu.id} className="mb-2">
                <p className="text-sm font-bold">{edu.degree}</p>
                <p className="text-sm">{edu.school}</p>
                <p className="text-sm">{formatDateRange(edu.startDate, edu.endDate)}</p>
              </div>
            ))}
          </div>
        )
      case 'skills':
        if (skills.length === 0) return null
        return (
          <div key={section.id} className="resume-section mb-4">
            <p className="mb-1 text-sm font-bold">{label}</p>
            <p className="text-sm">{skills.join(', ')}</p>
          </div>
        )
      case 'languages':
        if (languages.length === 0) return null
        return (
          <div key={section.id} className="resume-section mb-4">
            <p className="mb-1 text-sm font-bold">{label}</p>
            <p className="text-sm">
              {languages.map((l) => `${l.language}${l.proficiency ? ` - ${l.proficiency}` : ''}`).join(', ')}
            </p>
          </div>
        )
      case 'certifications':
        if (certifications.length === 0) return null
        return (
          <div key={section.id} className="resume-section mb-4">
            <p className="mb-2 text-sm font-bold">{label}</p>
            {certifications.map((c) => (
              <p key={c.id} className="text-sm">
                {c.name}{c.issuer ? `, ${c.issuer}` : ''}{c.date ? `, ${c.date}` : ''}
              </p>
            ))}
          </div>
        )
      case 'projects':
        if (projects.length === 0) return null
        return (
          <div key={section.id} className="resume-section mb-4">
            <p className="mb-2 text-sm font-bold">{label}</p>
            {projects.map((p) => (
              <div key={p.id} className="mb-2">
                <p className="text-sm font-bold">{p.name}</p>
                <p className="text-sm">{p.description}</p>
              </div>
            ))}
          </div>
        )
      case 'custom':
        return (
          <>
            {customSections.map((cs) =>
              cs.title || cs.content ? (
                <div key={cs.id} className="resume-section mb-4">
                  <p className="mb-1 text-sm font-bold">{cs.title.toUpperCase()}</p>
                  <p className="whitespace-pre-wrap text-sm">{cs.content}</p>
                </div>
              ) : null,
            )}
          </>
        )
      default:
        return null
    }
  }

  return (
    <div className={`resume-page mx-auto p-10 font-sans text-black ${className}`} style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
      <div className="resume-section mb-4">
        <p className="text-lg font-bold">{personalInfo.name || 'Your Name'}</p>
        {personalInfo.jobTitle && <p className="text-sm">{personalInfo.jobTitle}</p>}
        {contact.map((c) => (
          <p key={c} className="text-sm">{c}</p>
        ))}
      </div>
      {sections.map((section) => renderSection(section))}
    </div>
  )
}
