import type { ResumeData, SectionConfig } from '../../types/resume'
import { hasSkills } from '../../utils/skills'
import { SkillsDisplay } from './SkillsDisplay'
import { formatDateRange, getContactParts, getVisibleSections } from './shared'

interface TemplateProps {
  data: ResumeData
  className?: string
}

const SECTION_LABELS: Record<string, string> = {
  summary: 'PROFESSIONAL SUMMARY',
  experience: 'WORK EXPERIENCE',
  education: 'EDUCATION',
  skills: 'SKILLS',
  languages: 'LANGUAGES',
  certifications: 'CERTIFICATIONS',
  projects: 'PROJECTS',
}

export function OneColumnTemplate({ data, className = '' }: TemplateProps) {
  const { personalInfo, summary, experience, education, languages, certifications, projects, customSections, sectionOrder } = data
  const sections = getVisibleSections(sectionOrder)
  const contact = getContactParts(personalInfo).join(' | ')

  const renderSection = (section: SectionConfig) => {
    const label = SECTION_LABELS[section.type]

    switch (section.type) {
      case 'summary':
        if (!summary) return null
        return (
          <section key={section.id} className="resume-section mb-4">
            <h2 className="mb-1 text-sm font-bold text-black">{label}</h2>
            <p className="text-sm leading-relaxed text-black">{summary}</p>
          </section>
        )
      case 'experience':
        if (!experience.some((e) => e.company || e.role)) return null
        return (
          <section key={section.id} className="resume-section mb-4">
            <h2 className="mb-2 text-sm font-bold text-black">{label}</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="resume-entry mb-3">
                <p className="text-sm font-bold text-black">
                  {exp.role}{exp.company ? `, ${exp.company}` : ''}
                </p>
                <p className="text-sm text-black">
                  {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                </p>
                {exp.bullets.filter(Boolean).map((b, i) => (
                  <p key={i} className="text-sm text-black">- {b}</p>
                ))}
              </div>
            ))}
          </section>
        )
      case 'education':
        if (!education.some((e) => e.school || e.degree)) return null
        return (
          <section key={section.id} className="resume-section mb-4">
            <h2 className="mb-2 text-sm font-bold text-black">{label}</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-2">
                <p className="text-sm font-bold text-black">{edu.degree}{edu.school ? `, ${edu.school}` : ''}</p>
                <p className="text-sm text-black">{formatDateRange(edu.startDate, edu.endDate)}</p>
              </div>
            ))}
          </section>
        )
      case 'skills':
        if (!hasSkills(data.skillCategories)) return null
        return (
          <section key={section.id} className="resume-section mb-4">
            <h2 className="mb-1 text-sm font-bold text-black">{label}</h2>
            <SkillsDisplay categories={data.skillCategories} mode="comma" />
          </section>
        )
      case 'languages':
        if (languages.length === 0) return null
        return (
          <section key={section.id} className="resume-section mb-4">
            <h2 className="mb-1 text-sm font-bold text-black">{label}</h2>
            <p className="text-sm text-black">
              {languages.map((l) => `${l.language}${l.proficiency ? ` (${l.proficiency})` : ''}`).join(', ')}
            </p>
          </section>
        )
      case 'certifications':
        if (certifications.length === 0) return null
        return (
          <section key={section.id} className="resume-section mb-4">
            <h2 className="mb-2 text-sm font-bold text-black">{label}</h2>
            {certifications.map((c) => (
              <p key={c.id} className="text-sm text-black">
                {c.name}{c.issuer ? `, ${c.issuer}` : ''}{c.date ? ` (${c.date})` : ''}
              </p>
            ))}
          </section>
        )
      case 'projects':
        if (projects.length === 0) return null
        return (
          <section key={section.id} className="resume-section mb-4">
            <h2 className="mb-2 text-sm font-bold text-black">{label}</h2>
            {projects.map((p) => (
              <div key={p.id} className="mb-2">
                <p className="text-sm font-bold text-black">{p.name}</p>
                <p className="text-sm text-black">{p.description}</p>
              </div>
            ))}
          </section>
        )
      case 'custom':
        return (
          <>
            {customSections.map((cs) =>
              cs.title || cs.content ? (
                <section key={cs.id} className="resume-section mb-4">
                  <h2 className="mb-1 text-sm font-bold text-black">{cs.title.toUpperCase()}</h2>
                  <p className="whitespace-pre-wrap text-sm text-black">{cs.content}</p>
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
    <div className={`resume-page mx-auto p-10 font-sans text-black ${className}`}>
      <header className="mb-5">
        <h1 className="text-xl font-bold">{personalInfo.name || 'Your Name'}</h1>
        {personalInfo.jobTitle && <p className="text-sm">{personalInfo.jobTitle}</p>}
        {contact && <p className="mt-1 text-sm">{contact}</p>}
      </header>
      {sections.map((section) => renderSection(section))}
    </div>
  )
}
