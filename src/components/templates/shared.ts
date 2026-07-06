import type { ResumeData, SectionConfig } from '../../types/resume'

export function formatDateRange(start: string, end: string, current?: boolean): string {
  if (!start && !end) return ''
  const endLabel = current ? 'Present' : end
  if (start && endLabel) return `${start} – ${endLabel}`
  return start || endLabel || ''
}

export function getVisibleSections(sectionOrder: SectionConfig[]) {
  return sectionOrder.filter((s) => s.visible)
}

export function getContactParts(personalInfo: ResumeData['personalInfo']) {
  return [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.website,
    personalInfo.linkedin,
  ].filter(Boolean)
}
