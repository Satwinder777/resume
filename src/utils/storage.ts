import type { ResumeBuilderState, ResumeData } from '../types/resume'
import { STORAGE_KEY } from '../types/resume'
import { normalizeTemplateId } from '../data/templateVariants'
import { createDefaultResumeData } from './defaults'

const STORAGE_VERSION = 2

export interface StoredPayload extends ResumeBuilderState {
  version: number
  lastSavedAt: string
}

function mergeResumeData(parsed: Partial<ResumeData> | undefined, defaults: ResumeData): ResumeData {
  if (!parsed) return defaults

  return {
    personalInfo: { ...defaults.personalInfo, ...parsed.personalInfo },
    summary: parsed.summary ?? defaults.summary,
    experience: Array.isArray(parsed.experience) ? parsed.experience : defaults.experience,
    education: Array.isArray(parsed.education) ? parsed.education : defaults.education,
    skills: Array.isArray(parsed.skills) ? parsed.skills : defaults.skills,
    languages: Array.isArray(parsed.languages) ? parsed.languages : defaults.languages,
    certifications: Array.isArray(parsed.certifications) ? parsed.certifications : defaults.certifications,
    projects: Array.isArray(parsed.projects) ? parsed.projects : defaults.projects,
    customSections: Array.isArray(parsed.customSections) ? parsed.customSections : defaults.customSections,
    sectionOrder: Array.isArray(parsed.sectionOrder) && parsed.sectionOrder.length > 0
      ? parsed.sectionOrder
      : defaults.sectionOrder,
  }
}

export function loadState(): ResumeBuilderState & { lastSavedAt: string | null } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return { data: createDefaultResumeData(), selectedTemplateId: null, lastSavedAt: null }
    }

    const parsed = JSON.parse(raw) as Partial<StoredPayload>
    const defaults = createDefaultResumeData()

    return {
      data: mergeResumeData(parsed.data, defaults),
      selectedTemplateId: normalizeTemplateId(parsed.selectedTemplateId ?? null),
      lastSavedAt: parsed.lastSavedAt ?? null,
    }
  } catch {
    return { data: createDefaultResumeData(), selectedTemplateId: null, lastSavedAt: null }
  }
}

export function saveState(state: ResumeBuilderState): string {
  const lastSavedAt = new Date().toISOString()
  const payload: StoredPayload = {
    ...state,
    version: STORAGE_VERSION,
    lastSavedAt,
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch (err) {
    console.error('Failed to save draft to localStorage:', err)
    throw new Error('Storage full — try removing your profile photo or clear browser data.')
  }

  return lastSavedAt
}

export function formatLastSaved(iso: string | null): string {
  if (!iso) return 'Not saved yet'
  const date = new Date(iso)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffSec = Math.floor(diffMs / 1000)

  if (diffSec < 10) return 'Just now'
  if (diffSec < 60) return `${diffSec}s ago`

  return date.toLocaleString(undefined, {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function hasDraftData(data: ResumeData): boolean {
  const { personalInfo, summary, experience, education, skills } = data
  return Boolean(
    personalInfo.name ||
    personalInfo.email ||
    summary ||
    skills.length > 0 ||
    experience.some((e) => e.company || e.role) ||
    education.some((e) => e.school || e.degree),
  )
}
