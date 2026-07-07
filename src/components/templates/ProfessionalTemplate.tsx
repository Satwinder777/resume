import type { ResumeData, SectionConfig } from '../../types/resume'
import { hasSkills } from '../../utils/skills'
import { SkillsDisplay } from './SkillsDisplay'
import { formatDateRange, getContactParts, getVisibleSections } from './shared'

interface TemplateProps {
  data: ResumeData
  className?: string
}

export function ProfessionalTemplate({ data, className = '' }: TemplateProps) {
  const { personalInfo, summary, experience, education, languages, certifications, projects, customSections, sectionOrder } = data
  const sections = getVisibleSections(sectionOrder)
  const contact = getContactParts(personalInfo).join('  ·  ')

  const renderSection = (section: SectionConfig) => {
    switch (section.type) {
      case 'summary':
        if (!summary) return null
        return (
          <section key={section.id} className="resume-section mb-5">
            <h2 className="mb-2 font-serif text-sm font-bold uppercase tracking-wider text-amber-900">Executive Summary</h2>
            <p className="font-serif text-sm leading-relaxed text-slate-800">{summary}</p>
          </section>
        )
      case 'experience':
        if (!experience.some((e) => e.company || e.role)) return null
        return (
          <section key={section.id} className="resume-section mb-5">
            <h2 className="mb-3 font-serif text-sm font-bold uppercase tracking-wider text-amber-900">Professional Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="resume-entry mb-4 border-l-2 border-amber-200 pl-4">
                <div className="flex justify-between">
                  <h3 className="font-serif font-bold text-slate-900">{exp.role}</h3>
                  <span className="font-serif text-xs italic text-slate-500">{formatDateRange(exp.startDate, exp.endDate, exp.current)}</span>
                </div>
                <p className="font-serif text-sm font-medium text-amber-800">{exp.company}</p>
                <ul className="mt-1 list-disc pl-4 font-serif text-sm text-slate-700">
                  {exp.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            ))}
          </section>
        )
      case 'education':
        if (!education.some((e) => e.school || e.degree)) return null
        return (
          <section key={section.id} className="resume-section mb-5">
            <h2 className="mb-3 font-serif text-sm font-bold uppercase tracking-wider text-amber-900">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-2">
                <h3 className="font-serif font-bold">{edu.degree}</h3>
                <p className="font-serif text-sm text-slate-700">{edu.school}</p>
                <p className="font-serif text-xs italic text-slate-500">{formatDateRange(edu.startDate, edu.endDate)}</p>
              </div>
            ))}
          </section>
        )
      case 'skills':
        if (!hasSkills(data.skillCategories)) return null
        return (
          <section key={section.id} className="resume-section mb-5">
            <h2 className="mb-2 font-serif text-sm font-bold uppercase tracking-wider text-amber-900">Core Competencies</h2>
            <SkillsDisplay categories={data.skillCategories} mode="grid" />
          </section>
        )
      case 'languages':
        if (languages.length === 0) return null
        return (
          <section key={section.id} className="resume-section mb-5">
            <h2 className="mb-2 font-serif text-sm font-bold uppercase tracking-wider text-amber-900">Languages</h2>
            <p className="font-serif text-sm">{languages.map((l) => `${l.language} (${l.proficiency})`).join('  ·  ')}</p>
          </section>
        )
      case 'certifications':
        if (certifications.length === 0) return null
        return (
          <section key={section.id} className="resume-section mb-5">
            <h2 className="mb-2 font-serif text-sm font-bold uppercase tracking-wider text-amber-900">Certifications</h2>
            {certifications.map((c) => (
              <p key={c.id} className="font-serif text-sm">{c.name}, {c.issuer} ({c.date})</p>
            ))}
          </section>
        )
      case 'projects':
        if (projects.length === 0) return null
        return (
          <section key={section.id} className="resume-section mb-5">
            <h2 className="mb-2 font-serif text-sm font-bold uppercase tracking-wider text-amber-900">Projects</h2>
            {projects.map((p) => (
              <div key={p.id} className="mb-2">
                <h3 className="font-serif font-bold text-sm">{p.name}</h3>
                <p className="font-serif text-sm text-slate-700">{p.description}</p>
              </div>
            ))}
          </section>
        )
      case 'custom':
        return (
          <>
            {customSections.map((cs) =>
              cs.title || cs.content ? (
                <section key={cs.id} className="resume-section mb-5">
                  <h2 className="mb-2 font-serif text-sm font-bold uppercase tracking-wider text-amber-900">{cs.title}</h2>
                  <p className="whitespace-pre-wrap font-serif text-sm">{cs.content}</p>
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
    <div className={`resume-page mx-auto bg-amber-50/30 p-10 text-slate-900 ${className}`}>
      <header className="mb-6 border-b-2 border-amber-800 pb-4 text-center">
        <h1 className="font-serif text-3xl font-bold tracking-tight text-amber-950">{personalInfo.name || 'Your Name'}</h1>
        {personalInfo.jobTitle && <p className="mt-1 font-serif text-base text-amber-800">{personalInfo.jobTitle}</p>}
        {contact && <p className="mt-2 font-serif text-xs text-slate-600">{contact}</p>}
      </header>
      {sections.map((section) => renderSection(section))}
    </div>
  )
}
