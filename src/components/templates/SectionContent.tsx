import type { ResumeData, SectionConfig } from '../../types/resume'
import type { TemplateTheme } from '../../data/templateVariants'
import { formatDateRange, getVisibleSections } from './shared'

interface SectionContentProps {
  data: ResumeData
  theme: TemplateTheme
  sidebarSections?: SectionType[]
}

type SectionType = SectionConfig['type']

function headingClass(theme: TemplateTheme): string {
  if (theme.headingStyle === 'serif-upper') {
    return 'mb-2 font-serif text-sm font-bold uppercase tracking-wider'
  }
  if (theme.headingStyle === 'capitalize') {
    return 'mb-2 text-sm font-semibold capitalize'
  }
  return 'mb-2 text-xs font-bold uppercase tracking-widest'
}

export function SectionContent({ data, theme, sidebarSections = [] }: SectionContentProps) {
  const sections = getVisibleSections(data.sectionOrder).filter(
    (s) => !sidebarSections.includes(s.type),
  )
  const accent = theme.accent
  const primary = theme.primary

  const renderSection = (section: SectionConfig) => {
    switch (section.type) {
      case 'summary':
        if (!data.summary) return null
        return (
          <section key={section.id} className="mb-4">
            <h2 className={headingClass(theme)} style={{ color: accent }}>Summary</h2>
            <p className="text-sm leading-relaxed" style={{ color: primary }}>{data.summary}</p>
          </section>
        )
      case 'experience':
        if (!data.experience.some((e) => e.company || e.role)) return null
        return (
          <section key={section.id} className="mb-4">
            <h2 className={headingClass(theme)} style={{ color: accent }}>Experience</h2>
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-3">
                <div className="flex justify-between gap-2">
                  <h3 className="text-sm font-semibold" style={{ color: primary }}>{exp.role || 'Role'}</h3>
                  <span className="shrink-0 text-xs opacity-60">{formatDateRange(exp.startDate, exp.endDate, exp.current)}</span>
                </div>
                <p className="text-sm font-medium" style={{ color: accent }}>{exp.company}</p>
                {exp.bullets.filter(Boolean).length > 0 && (
                  <ul className="mt-1 list-disc pl-4 text-sm">
                    {exp.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )
      case 'education':
        if (!data.education.some((e) => e.school || e.degree)) return null
        return (
          <section key={section.id} className="mb-4">
            <h2 className={headingClass(theme)} style={{ color: accent }}>Education</h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-2">
                <h3 className="text-sm font-semibold" style={{ color: primary }}>{edu.degree}</h3>
                <p className="text-sm">{edu.school}</p>
                <p className="text-xs opacity-60">{formatDateRange(edu.startDate, edu.endDate)}</p>
              </div>
            ))}
          </section>
        )
      case 'skills':
        if (data.skills.length === 0) return null
        return (
          <section key={section.id} className="mb-4">
            <h2 className={headingClass(theme)} style={{ color: accent }}>Skills</h2>
            <p className="text-sm">{data.skills.join(' · ')}</p>
          </section>
        )
      case 'languages':
        if (data.languages.length === 0) return null
        return (
          <section key={section.id} className="mb-4">
            <h2 className={headingClass(theme)} style={{ color: accent }}>Languages</h2>
            <p className="text-sm">
              {data.languages.map((l) => `${l.language}${l.proficiency ? ` (${l.proficiency})` : ''}`).join(' · ')}
            </p>
          </section>
        )
      case 'certifications':
        if (data.certifications.length === 0) return null
        return (
          <section key={section.id} className="mb-4">
            <h2 className={headingClass(theme)} style={{ color: accent }}>Certifications</h2>
            {data.certifications.map((c) => (
              <p key={c.id} className="text-sm">{c.name}{c.issuer ? ` — ${c.issuer}` : ''}{c.date ? ` (${c.date})` : ''}</p>
            ))}
          </section>
        )
      case 'projects':
        if (data.projects.length === 0) return null
        return (
          <section key={section.id} className="mb-4">
            <h2 className={headingClass(theme)} style={{ color: accent }}>Projects</h2>
            {data.projects.map((p) => (
              <div key={p.id} className="mb-2">
                <h3 className="text-sm font-semibold" style={{ color: primary }}>{p.name}</h3>
                <p className="text-sm">{p.description}</p>
              </div>
            ))}
          </section>
        )
      case 'custom':
        return (
          <>
            {data.customSections.map((cs) =>
              cs.title || cs.content ? (
                <section key={cs.id} className="mb-4">
                  <h2 className={headingClass(theme)} style={{ color: accent }}>{cs.title || 'Custom'}</h2>
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

  return <>{sections.map((s) => renderSection(s))}</>
}

export function SidebarSkillsLanguages({ data, theme }: { data: ResumeData; theme: TemplateTheme }) {
  const textColor = theme.sidebarText ?? '#fff'
  const accent = theme.accent

  return (
    <>
      {data.skills.length > 0 && (
        <div className="mb-5">
          <h2 className="mb-2 text-xs font-bold uppercase tracking-widest" style={{ color: accent }}>Skills</h2>
          <div className="flex flex-wrap gap-1">
            {data.skills.map((s) => (
              <span key={s} className="rounded px-1.5 py-0.5 text-xs" style={{ background: 'rgba(255,255,255,0.15)', color: textColor }}>{s}</span>
            ))}
          </div>
        </div>
      )}
      {data.languages.length > 0 && (
        <div>
          <h2 className="mb-2 text-xs font-bold uppercase tracking-widest" style={{ color: accent }}>Languages</h2>
          {data.languages.map((l) => (
            <p key={l.id} className="text-xs" style={{ color: textColor }}>
              {l.language}{l.proficiency ? ` — ${l.proficiency}` : ''}
            </p>
          ))}
        </div>
      )}
    </>
  )
}
