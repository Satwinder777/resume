import type { ResumeData, SectionConfig } from '../../../types/resume'
import type { TemplateTheme } from '../../../data/templateVariants'
import { formatDateRange, getVisibleSections } from '../shared'

export type SectionMode = 'simple' | 'modern' | 'ats' | 'professional' | 'one-column'

interface RenderSectionsProps {
  data: ResumeData
  theme: TemplateTheme
  mode: SectionMode
  exclude?: SectionConfig['type'][]
}

export function RenderSections({ data, theme, mode, exclude = [] }: RenderSectionsProps) {
  const sections = getVisibleSections(data.sectionOrder).filter((s) => !exclude.includes(s.type))
  const { primary, accent } = theme

  const Heading = ({ children }: { children: React.ReactNode }) => {
    switch (mode) {
      case 'ats':
        return <p className="resume-section-heading mb-1 text-sm font-bold text-black">{children}</p>
      case 'professional':
        return (
          <h2
            className="resume-section-heading mb-3 border-b pb-1.5 font-serif text-sm font-bold uppercase tracking-widest"
            style={{ color: accent, borderColor: `${accent}55` }}
          >
            {children}
          </h2>
        )
      case 'one-column':
        return (
          <h2 className="resume-section-heading mb-2 bg-slate-100 px-2 py-1 text-xs font-bold uppercase tracking-wide text-black">
            {children}
          </h2>
        )
      case 'modern':
        return (
          <h2 className="resume-section-heading mb-2 text-sm font-bold uppercase tracking-wide" style={{ color: accent }}>
            {children}
          </h2>
        )
      case 'simple':
      default:
        return (
          <h2
            className="resume-section-heading mb-3 border-b pb-1.5 text-xs font-bold uppercase tracking-widest text-black"
            style={{ borderColor: primary }}
          >
            {children}
          </h2>
        )
    }
  }

  const renderSection = (section: SectionConfig) => {
    switch (section.type) {
      case 'summary':
        if (!data.summary) return null
        return (
          <section key={section.id} className="resume-section mb-5">
            <Heading>Summary</Heading>
            <p className={`text-sm leading-relaxed ${mode === 'ats' ? 'text-black' : ''}`}>{data.summary}</p>
          </section>
        )

      case 'experience':
        if (!data.experience.some((e) => e.company || e.role)) return null
        return (
          <section key={section.id} className="resume-section mb-5">
            <Heading>Experience</Heading>
            {data.experience.map((exp) => (
              <div
                key={exp.id}
                className={`resume-entry mb-4 ${mode === 'modern' ? 'border-l-2 pl-3' : ''} ${mode === 'professional' ? 'border-l-2 border-amber-200 pl-4' : ''} ${mode === 'simple' ? 'pb-1' : ''}`}
                style={mode === 'modern' ? { borderColor: accent } : undefined}
              >
                {mode === 'one-column' || mode === 'ats' ? (
                  <div className="resume-job-header">
                    <p className={`text-sm ${mode === 'ats' ? 'font-bold text-black' : 'font-bold'}`}>
                      {exp.role}{exp.company ? `, ${exp.company}` : ''}
                    </p>
                    <p className="text-sm">{formatDateRange(exp.startDate, exp.endDate, exp.current)}</p>
                  </div>
                ) : (
                  <div className="resume-job-header">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-sm font-bold" style={{ color: mode === 'professional' ? primary : undefined }}>
                        {exp.role || 'Role'}
                      </h3>
                      <span className="shrink-0 text-xs text-slate-500">
                        {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                      </span>
                    </div>
                    <p className="text-sm font-medium" style={{ color: mode === 'modern' || mode === 'professional' ? accent : undefined }}>
                      {exp.company}
                    </p>
                  </div>
                )}
                {exp.bullets.filter(Boolean).length > 0 && (
                  mode === 'ats' ? (
                    exp.bullets.filter(Boolean).map((b, i) => (
                      <p key={i} className="text-sm text-black">- {b}</p>
                    ))
                  ) : (
                    <ul className={`mt-1 text-sm ${mode === 'simple' ? 'list-disc pl-5' : 'list-disc pl-4'}`}>
                      {exp.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                  )
                )}
              </div>
            ))}
          </section>
        )

      case 'education':
        if (!data.education.some((e) => e.school || e.degree)) return null
        return (
          <section key={section.id} className="resume-section mb-5">
            <Heading>Education</Heading>
            {data.education.map((edu) => (
              <div key={edu.id} className="resume-entry mb-2">
                {mode === 'one-column' || mode === 'ats' ? (
                  <p className="text-sm font-bold">{edu.degree}{edu.school ? `, ${edu.school}` : ''}</p>
                ) : (
                  <>
                    <h3 className="text-sm font-semibold">{edu.degree}</h3>
                    <p className="text-sm">{edu.school}</p>
                  </>
                )}
                <p className="text-xs text-slate-500">{formatDateRange(edu.startDate, edu.endDate)}</p>
              </div>
            ))}
          </section>
        )

      case 'skills':
        if (data.skills.length === 0) return null
        return (
          <section key={section.id} className="resume-section mb-5">
            <Heading>Skills</Heading>
            {mode === 'modern' ? (
              <div className="flex flex-wrap gap-1.5">
                {data.skills.map((s) => (
                  <span key={s} className="rounded-full px-2 py-0.5 text-xs font-medium" style={{ background: `${accent}22`, color: accent }}>
                    {s}
                  </span>
                ))}
              </div>
            ) : mode === 'ats' ? (
              <p className="text-sm">{data.skills.join(', ')}</p>
            ) : (
              <ul className="resume-skills-grid list-none pl-0 text-sm leading-snug">
                {data.skills.map((s) => (
                  <li key={s} className="flex gap-1.5">
                    <span className="text-slate-400">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )

      case 'languages':
        if (data.languages.length === 0) return null
        return (
          <section key={section.id} className="resume-section mb-5">
            <Heading>Languages</Heading>
            <p className="text-sm">
              {data.languages.map((l) => `${l.language}${l.proficiency ? ` (${l.proficiency})` : ''}`).join(', ')}
            </p>
          </section>
        )

      case 'certifications':
        if (data.certifications.length === 0) return null
        return (
          <section key={section.id} className="resume-section mb-5">
            <Heading>Certifications</Heading>
            <ul className="list-disc space-y-0.5 pl-4 text-sm">
              {data.certifications.map((c) => (
                <li key={c.id}>
                  {c.name}{c.issuer ? ` — ${c.issuer}` : ''}{c.date ? ` (${c.date})` : ''}
                </li>
              ))}
            </ul>
          </section>
        )

      case 'projects':
        if (data.projects.length === 0) return null
        return (
          <section key={section.id} className="resume-section mb-5">
            <Heading>Projects</Heading>
            {data.projects.map((p) => (
              <div key={p.id} className="resume-entry resume-project mb-3">
                <h3 className="text-sm font-bold text-slate-900">{p.name}</h3>
                <p className="mt-0.5 text-sm leading-snug text-slate-700">{p.description}</p>
              </div>
            ))}
          </section>
        )

      case 'custom':
        return (
          <>
            {data.customSections.map((cs) =>
              cs.title || cs.content ? (
                <section key={cs.id} className="resume-section mb-5">
                  <Heading>{cs.title || 'Custom'}</Heading>
                  {cs.content.includes('\n') ? (
                    <ul className="list-disc space-y-0.5 pl-4 text-sm">
                      {cs.content.split('\n').filter(Boolean).map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="whitespace-pre-wrap text-sm">{cs.content}</p>
                  )}
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

export function SidebarBlock({
  data,
  theme,
  withPhoto = false,
}: {
  data: ResumeData
  theme: TemplateTheme
  withPhoto?: boolean
}) {
  const { personalInfo } = data
  const text = theme.sidebarText ?? '#fff'

  return (
    <>
      {withPhoto && (
        <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full border-2 border-white/40 bg-white/10">
          {personalInfo.photo ? (
            <img src={personalInfo.photo} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-2xl text-white/60">
              {(personalInfo.name || '?').charAt(0)}
            </div>
          )}
        </div>
      )}
      {data.skills.length > 0 && (
        <div className="mb-5">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest" style={{ color: theme.accent }}>Skills</p>
          <div className="space-y-1">
            {data.skills.map((s) => (
              <div key={s} className="flex items-center gap-2 text-xs" style={{ color: text }}>
                <span className="h-1 w-1 rounded-full bg-current" />
                {s}
              </div>
            ))}
          </div>
        </div>
      )}
      {data.languages.length > 0 && (
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-widest" style={{ color: theme.accent }}>Languages</p>
          {data.languages.map((l) => (
            <p key={l.id} className="text-xs" style={{ color: text }}>
              {l.language}{l.proficiency ? ` — ${l.proficiency}` : ''}
            </p>
          ))}
        </div>
      )}
    </>
  )
}

export function ContactIcons({ data, light }: { data: ResumeData; light?: boolean }) {
  const { personalInfo } = data
  const color = light ? 'text-white/90' : 'text-slate-600'
  const items = [
    personalInfo.email && { icon: '✉', value: personalInfo.email },
    personalInfo.phone && { icon: '☎', value: personalInfo.phone },
    personalInfo.location && { icon: '⌖', value: personalInfo.location },
    personalInfo.linkedin && { icon: 'in', value: personalInfo.linkedin },
    personalInfo.website && { icon: '⌁', value: personalInfo.website },
  ].filter(Boolean) as { icon: string; value: string }[]

  return (
    <div className="space-y-1.5 text-xs">
      {items.map((item) => (
        <p key={item.value} className={`flex items-start gap-2 ${color}`}>
          <span className="w-4 shrink-0 text-center opacity-70">{item.icon}</span>
          <span className="break-all">{item.value}</span>
        </p>
      ))}
    </div>
  )
}
