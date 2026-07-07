import type { SkillCategory } from '../../types/resume'
import { hasSkills } from '../../utils/skills'

export type SkillsDisplayMode = 'grid' | 'pills' | 'comma' | 'inline' | 'sidebar-tags' | 'sidebar-dots'

interface SkillsDisplayProps {
  categories: SkillCategory[]
  mode: SkillsDisplayMode
  accent?: string
  textColor?: string
  className?: string
}

export function SkillsDisplay({ categories, mode, accent, textColor, className = '' }: SkillsDisplayProps) {
  if (!hasSkills(categories)) return null

  const filled = categories.filter((category) => category.skills.some(Boolean))

  switch (mode) {
    case 'pills':
      return (
        <div className={`space-y-2 ${className}`}>
          {filled.map((category) => (
            <div key={category.id}>
              {category.name && (
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide" style={{ color: accent }}>
                  {category.name}
                </p>
              )}
              <div className="flex flex-wrap gap-1.5">
                {category.skills.filter(Boolean).map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full px-2 py-0.5 text-xs font-medium"
                    style={{ background: accent ? `${accent}22` : undefined, color: accent }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )

    case 'comma':
      return (
        <div className={`space-y-1 text-sm ${className}`}>
          {filled.map((category) => (
            <p key={category.id}>
              {category.name ? <span className="font-bold">{category.name}: </span> : null}
              {category.skills.filter(Boolean).join(', ')}
            </p>
          ))}
        </div>
      )

    case 'inline':
      return (
        <p className={`text-sm ${className}`}>
          {filled
            .map((category) => {
              const items = category.skills.filter(Boolean).join(' · ')
              return category.name ? `${category.name}: ${items}` : items
            })
            .join('  |  ')}
        </p>
      )

    case 'sidebar-tags':
      return (
        <div className={`space-y-3 ${className}`}>
          {filled.map((category) => (
            <div key={category.id}>
              {category.name && (
                <p className="mb-1 text-xs font-bold uppercase tracking-widest" style={{ color: accent }}>
                  {category.name}
                </p>
              )}
              <div className="flex flex-wrap gap-1">
                {category.skills.filter(Boolean).map((skill) => (
                  <span
                    key={skill}
                    className="rounded px-1.5 py-0.5 text-xs"
                    style={{ background: 'rgba(255,255,255,0.15)', color: textColor }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )

    case 'sidebar-dots':
      return (
        <div className={`space-y-3 ${className}`}>
          {filled.map((category) => (
            <div key={category.id}>
              {category.name && (
                <p className="mb-1 text-xs font-bold uppercase tracking-widest" style={{ color: accent }}>
                  {category.name}
                </p>
              )}
              <div className="space-y-1">
                {category.skills.filter(Boolean).map((skill) => (
                  <div key={skill} className="flex items-center gap-2 text-xs" style={{ color: textColor }}>
                    <span className="h-1 w-1 rounded-full bg-current" />
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )

    case 'grid':
    default:
      return (
        <div className={`space-y-2.5 ${className}`}>
          {filled.map((category) => (
            <div key={category.id}>
              {category.name && (
                <p className="mb-1 text-xs font-bold uppercase tracking-wide text-slate-700">{category.name}</p>
              )}
              <ul className="resume-skills-grid list-none pl-0 text-sm leading-snug">
                {category.skills.filter(Boolean).map((skill) => (
                  <li key={skill} className="flex gap-1.5">
                    <span className="text-slate-400">•</span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )
  }
}
