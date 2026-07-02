import type { ResumeData } from '../../../types/resume'
import type { TemplateVariant } from '../../../data/templateVariants'
import { getContactParts } from '../shared'
import { ContactIcons, RenderSections, SidebarBlock } from './sectionRenderers'

export interface LayoutProps {
  data: ResumeData
  variant: TemplateVariant
  className?: string
}

function Photo({ data, size = 'lg', accent }: { data: ResumeData; size?: 'sm' | 'lg'; accent: string }) {
  const dim = size === 'lg' ? 'h-28 w-28' : 'h-16 w-16'
  const { personalInfo } = data
  return (
    <div className={`${dim} overflow-hidden rounded-full border-4 bg-slate-100`} style={{ borderColor: accent }}>
      {personalInfo.photo ? (
        <img src={personalInfo.photo} alt="" className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-2xl text-slate-400">
          {(personalInfo.name || '?').charAt(0)}
        </div>
      )}
    </div>
  )
}

/** Simple: left-aligned name, underline sections */
export function SimpleStack({ data, variant, className = '' }: LayoutProps) {
  const { personalInfo } = data
  const contact = getContactParts(personalInfo).join('  ·  ')
  return (
    <div className={`resume-page mx-auto p-10 text-slate-900 ${className}`}>
      <header className="mb-6 border-b-2 border-black pb-3">
        <h1 className="text-3xl font-bold tracking-tight">{personalInfo.name || 'Your Name'}</h1>
        {personalInfo.jobTitle && <p className="mt-1 text-base text-slate-600">{personalInfo.jobTitle}</p>}
        {contact && <p className="mt-2 text-xs text-slate-500">{contact}</p>}
      </header>
      <RenderSections data={data} theme={variant.theme} mode="simple" />
    </div>
  )
}

/** Simple: centered header */
export function SimpleCentered({ data, variant, className = '' }: LayoutProps) {
  const { personalInfo } = data
  const contact = getContactParts(personalInfo).join(' | ')
  return (
    <div className={`resume-page mx-auto p-10 text-slate-900 ${className}`}>
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold">{personalInfo.name || 'Your Name'}</h1>
        {personalInfo.jobTitle && <p className="mt-1 text-slate-600">{personalInfo.jobTitle}</p>}
        {contact && <p className="mt-3 text-xs text-slate-500">{contact}</p>}
        <div className="mx-auto mt-4 h-px w-24 bg-black" />
      </header>
      <RenderSections data={data} theme={variant.theme} mode="simple" />
    </div>
  )
}

/** Simple: split header name left, contact right */
export function SimpleSplitHeader({ data, variant, className = '' }: LayoutProps) {
  const { personalInfo } = data
  return (
    <div className={`resume-page mx-auto p-10 text-slate-900 ${className}`}>
      <header className="mb-6 flex items-start justify-between gap-6 border-b border-slate-300 pb-4">
        <div>
          <h1 className="text-2xl font-bold">{personalInfo.name || 'Your Name'}</h1>
          {personalInfo.jobTitle && <p className="text-sm text-slate-600">{personalInfo.jobTitle}</p>}
        </div>
        <div className="text-right text-xs text-slate-500">
          {getContactParts(personalInfo).map((c) => <p key={c}>{c}</p>)}
        </div>
      </header>
      <RenderSections data={data} theme={variant.theme} mode="simple" />
    </div>
  )
}

/** Simple: ultra minimal whitespace */
export function SimpleMinimal({ data, variant, className = '' }: LayoutProps) {
  const { personalInfo } = data
  return (
    <div className={`resume-page mx-auto p-12 text-slate-900 ${className}`}>
      <h1 className="text-4xl font-light tracking-tight">{personalInfo.name || 'Your Name'}</h1>
      {personalInfo.jobTitle && <p className="mt-2 text-lg text-slate-500">{personalInfo.jobTitle}</p>}
      <p className="mt-4 text-xs text-slate-400">{getContactParts(personalInfo).join(' / ')}</p>
      <div className="mt-10">
        <RenderSections data={data} theme={variant.theme} mode="simple" />
      </div>
    </div>
  )
}

/** Modern: dark left sidebar with icons */
export function ModernSidebarLeft({ data, variant, className = '' }: LayoutProps) {
  const { personalInfo } = data
  const { theme } = variant
  return (
    <div className={`resume-page mx-auto flex overflow-hidden ${className}`}>
      <aside
        className="flex w-[74mm] shrink-0 flex-col p-6"
        style={{ background: theme.sidebarBg ?? theme.primary, color: theme.sidebarText ?? '#fff' }}
      >
        <h1 className="text-xl font-bold leading-tight">{personalInfo.name || 'Your Name'}</h1>
        {personalInfo.jobTitle && <p className="mt-2 text-sm font-medium" style={{ color: theme.accent }}>{personalInfo.jobTitle}</p>}
        <div className="my-5 h-px w-full bg-white/20" />
        <ContactIcons data={data} light />
        <div className="mt-6 flex-1">
          <SidebarBlock data={data} theme={theme} />
        </div>
      </aside>
      <main className="flex-1 p-8 text-slate-800">
        <RenderSections data={data} theme={theme} mode="modern" exclude={['skills', 'languages']} />
      </main>
    </div>
  )
}

/** Modern: right sidebar */
export function ModernSidebarRight({ data, variant, className = '' }: LayoutProps) {
  const { personalInfo } = data
  const { theme } = variant
  return (
    <div className={`resume-page mx-auto flex overflow-hidden ${className}`}>
      <main className="flex-1 p-8 text-slate-800">
        <header className="mb-6">
          <h1 className="text-2xl font-bold" style={{ color: theme.primary }}>{personalInfo.name || 'Your Name'}</h1>
          {personalInfo.jobTitle && <p className="text-sm" style={{ color: theme.accent }}>{personalInfo.jobTitle}</p>}
        </header>
        <RenderSections data={data} theme={theme} mode="modern" exclude={['skills', 'languages']} />
      </main>
      <aside
        className="w-[68mm] shrink-0 p-5"
        style={{ background: theme.sidebarBg ?? theme.accent, color: theme.sidebarText ?? '#fff' }}
      >
        <ContactIcons data={data} light />
        <div className="mt-5">
          <SidebarBlock data={data} theme={theme} />
        </div>
      </aside>
    </div>
  )
}

/** Modern: full-width colored top band */
export function ModernTopBand({ data, variant, className = '' }: LayoutProps) {
  const { personalInfo } = data
  const { theme } = variant
  const contact = getContactParts(personalInfo).join('   ')
  return (
    <div className={`resume-page mx-auto overflow-hidden ${className}`}>
      <header className="px-8 py-6 text-white" style={{ background: theme.headerBg ?? theme.accent }}>
        <h1 className="text-3xl font-bold">{personalInfo.name || 'Your Name'}</h1>
        {personalInfo.jobTitle && <p className="mt-1 text-sm opacity-90">{personalInfo.jobTitle}</p>}
        {contact && <p className="mt-3 text-xs opacity-75">{contact}</p>}
      </header>
      <div className="flex gap-0">
        <aside className="w-[55mm] shrink-0 bg-slate-50 p-5">
          <RenderSections data={data} theme={theme} mode="modern" exclude={['summary', 'experience', 'education', 'certifications', 'projects', 'custom']} />
        </aside>
        <main className="flex-1 p-8">
          <RenderSections data={data} theme={theme} mode="modern" exclude={['skills', 'languages']} />
        </main>
      </div>
    </div>
  )
}

/** Modern: two columns under plain header — skills left */
export function ModernTwoCol({ data, variant, className = '' }: LayoutProps) {
  const { personalInfo } = data
  const { theme } = variant
  return (
    <div className={`resume-page mx-auto p-8 ${className}`}>
      <header className="mb-5 flex items-end justify-between border-b-2 pb-3" style={{ borderColor: theme.accent }}>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: theme.primary }}>{personalInfo.name || 'Your Name'}</h1>
          {personalInfo.jobTitle && <p className="text-sm text-slate-600">{personalInfo.jobTitle}</p>}
        </div>
        <p className="max-w-[50%] text-right text-xs text-slate-500">{getContactParts(personalInfo).join(' · ')}</p>
      </header>
      <div className="flex gap-6">
        <aside className="w-[52mm] shrink-0 border-r pr-4" style={{ borderColor: `${theme.accent}33` }}>
          <RenderSections data={data} theme={theme} mode="modern" exclude={['summary', 'experience', 'education', 'certifications', 'projects', 'custom']} />
        </aside>
        <main className="flex-1">
          <RenderSections data={data} theme={theme} mode="modern" exclude={['skills', 'languages']} />
        </main>
      </div>
    </div>
  )
}

/** Modern: diagonal accent corner */
export function ModernAccentCorner({ data, variant, className = '' }: LayoutProps) {
  const { personalInfo } = data
  const { theme } = variant
  return (
    <div className={`resume-page relative mx-auto overflow-hidden p-8 ${className}`}>
      <div className="absolute right-0 top-0 h-32 w-32 opacity-20" style={{ background: `linear-gradient(135deg, ${theme.accent}, transparent)` }} />
      <header className="relative mb-6">
        <h1 className="text-3xl font-bold" style={{ color: theme.primary }}>{personalInfo.name || 'Your Name'}</h1>
        {personalInfo.jobTitle && <p className="mt-1 text-base" style={{ color: theme.accent }}>{personalInfo.jobTitle}</p>}
        <p className="mt-2 text-xs text-slate-500">{getContactParts(personalInfo).join(' · ')}</p>
      </header>
      <RenderSections data={data} theme={theme} mode="modern" />
    </div>
  )
}

/** ATS: plain stacked lines */
export function AtsPlain({ data, variant, className = '' }: LayoutProps) {
  const { personalInfo } = data
  return (
    <div className={`resume-page mx-auto p-10 text-black ${className}`} style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
      <p className="text-lg font-bold">{personalInfo.name || 'Your Name'}</p>
      {personalInfo.jobTitle && <p className="text-sm">{personalInfo.jobTitle}</p>}
      {getContactParts(personalInfo).map((c) => <p key={c} className="text-sm">{c}</p>)}
      <div className="mt-5">
        <RenderSections data={data} theme={variant.theme} mode="ats" />
      </div>
    </div>
  )
}

/** ATS: compact inline contact */
export function AtsCompact({ data, variant, className = '' }: LayoutProps) {
  const { personalInfo } = data
  return (
    <div className={`resume-page mx-auto p-10 text-black ${className}`} style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
      <p className="text-base font-bold">{personalInfo.name || 'Your Name'}</p>
      <p className="text-sm">{personalInfo.jobTitle}</p>
      <p className="text-sm">{getContactParts(personalInfo).join(' | ')}</p>
      <div className="mt-4 space-y-4">
        <RenderSections data={data} theme={variant.theme} mode="ats" />
      </div>
    </div>
  )
}

/** Professional: centered serif */
export function ProCentered({ data, variant, className = '' }: LayoutProps) {
  const { personalInfo } = data
  const { theme } = variant
  return (
    <div className={`resume-page mx-auto bg-amber-50/40 p-10 font-serif text-slate-900 ${className}`}>
      <header className="mb-8 border-b-2 pb-5 text-center" style={{ borderColor: theme.accent }}>
        <h1 className="text-4xl font-bold tracking-tight" style={{ color: theme.primary }}>{personalInfo.name || 'Your Name'}</h1>
        {personalInfo.jobTitle && <p className="mt-2 text-lg italic" style={{ color: theme.accent }}>{personalInfo.jobTitle}</p>}
        <p className="mt-3 text-xs text-slate-600">{getContactParts(personalInfo).join('  ·  ')}</p>
      </header>
      <RenderSections data={data} theme={theme} mode="professional" />
    </div>
  )
}

/** Professional: executive split */
export function ProExecutive({ data, variant, className = '' }: LayoutProps) {
  const { personalInfo } = data
  const { theme } = variant
  return (
    <div className={`resume-page mx-auto p-10 font-serif ${className}`} style={{ color: theme.primary }}>
      <header className="mb-6 flex justify-between border-b-4 pb-4" style={{ borderColor: theme.primary }}>
        <div>
          <h1 className="text-3xl font-bold">{personalInfo.name || 'Your Name'}</h1>
          {personalInfo.jobTitle && <p className="mt-1 text-base" style={{ color: theme.accent }}>{personalInfo.jobTitle}</p>}
        </div>
        <div className="text-right text-xs leading-relaxed text-slate-600">
          {getContactParts(personalInfo).map((c) => <p key={c}>{c}</p>)}
        </div>
      </header>
      <RenderSections data={data} theme={theme} mode="professional" />
    </div>
  )
}

/** One column: strict ATS-style with gray headers */
export function OneColStrict({ data, variant, className = '' }: LayoutProps) {
  const { personalInfo } = data
  return (
    <div className={`resume-page mx-auto p-10 text-black ${className}`}>
      <h1 className="text-xl font-bold">{personalInfo.name || 'Your Name'}</h1>
      <p className="text-sm">{personalInfo.jobTitle}</p>
      <p className="mt-1 text-sm">{getContactParts(personalInfo).join(' | ')}</p>
      <div className="mt-5">
        <RenderSections data={data} theme={variant.theme} mode="one-column" />
      </div>
    </div>
  )
}

/** Photo: left column with circle */
export function PhotoLeftCol({ data, variant, className = '' }: LayoutProps) {
  const { personalInfo } = data
  const { theme } = variant
  return (
    <div className={`resume-page mx-auto flex gap-5 p-7 ${className}`}>
      <aside className="w-[58mm] shrink-0 text-center">
        <div className="flex justify-center">
          <Photo data={data} accent={theme.accent} />
        </div>
        <h1 className="mt-4 text-lg font-bold" style={{ color: theme.primary }}>{personalInfo.name || 'Your Name'}</h1>
        {personalInfo.jobTitle && <p className="mt-1 text-sm" style={{ color: theme.accent }}>{personalInfo.jobTitle}</p>}
        <div className="mt-4 text-left text-xs text-slate-600">
          {getContactParts(personalInfo).map((c) => <p key={c} className="mb-1">{c}</p>)}
        </div>
        <div className="mt-4 text-left">
          <SidebarBlock data={data} theme={{ ...theme, sidebarText: theme.primary }} />
        </div>
      </aside>
      <main className="flex-1 border-l pl-5" style={{ borderColor: `${theme.accent}44` }}>
        <RenderSections data={data} theme={theme} mode="modern" exclude={['skills', 'languages']} />
      </main>
    </div>
  )
}

/** Photo: centered top banner */
export function PhotoTopBanner({ data, variant, className = '' }: LayoutProps) {
  const { personalInfo } = data
  const { theme } = variant
  return (
    <div className={`resume-page mx-auto overflow-hidden ${className}`}>
      <header className="flex flex-col items-center px-8 py-7 text-white" style={{ background: theme.headerBg ?? theme.primary }}>
        <Photo data={data} accent="#ffffff" size="lg" />
        <h1 className="mt-4 text-2xl font-bold">{personalInfo.name || 'Your Name'}</h1>
        {personalInfo.jobTitle && <p className="mt-1 text-sm opacity-90">{personalInfo.jobTitle}</p>}
        <p className="mt-2 text-xs opacity-75">{getContactParts(personalInfo).join(' · ')}</p>
      </header>
      <main className="p-8">
        <RenderSections data={data} theme={theme} mode="modern" />
      </main>
    </div>
  )
}

/** Photo: top-right corner layout */
export function PhotoTopRight({ data, variant, className = '' }: LayoutProps) {
  const { personalInfo } = data
  const { theme } = variant
  return (
    <div className={`resume-page mx-auto p-8 ${className}`}>
      <header className="mb-6 flex items-start justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-3xl font-bold" style={{ color: theme.primary }}>{personalInfo.name || 'Your Name'}</h1>
          {personalInfo.jobTitle && <p className="mt-1 text-base" style={{ color: theme.accent }}>{personalInfo.jobTitle}</p>}
          <p className="mt-3 text-xs text-slate-500">{getContactParts(personalInfo).join(' · ')}</p>
        </div>
        <Photo data={data} accent={theme.accent} size="sm" />
      </header>
      <RenderSections data={data} theme={theme} mode="professional" />
    </div>
  )
}

/** Photo: sidebar with photo on top */
export function PhotoSidebar({ data, variant, className = '' }: LayoutProps) {
  const { personalInfo } = data
  const { theme } = variant
  return (
    <div className={`resume-page mx-auto flex overflow-hidden ${className}`}>
      <aside
        className="flex w-[70mm] shrink-0 flex-col items-center p-5 text-center"
        style={{ background: theme.sidebarBg ?? '#f8fafc', color: theme.primary }}
      >
        <Photo data={data} accent={theme.accent} />
        <h1 className="mt-3 text-base font-bold">{personalInfo.name || 'Your Name'}</h1>
        {personalInfo.jobTitle && <p className="mt-1 text-xs" style={{ color: theme.accent }}>{personalInfo.jobTitle}</p>}
        <div className="mt-4 w-full text-left text-xs">
          <ContactIcons data={data} />
        </div>
        <div className="mt-4 w-full text-left">
          <SidebarBlock data={data} theme={{ ...theme, sidebarText: theme.primary }} />
        </div>
      </aside>
      <main className="flex-1 p-7">
        <RenderSections data={data} theme={theme} mode="modern" exclude={['skills', 'languages']} />
      </main>
    </div>
  )
}
