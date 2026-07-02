import type { ResumeBuilderState } from '../types/resume'
import { STORAGE_KEY } from '../types/resume'
import { normalizeTemplateId } from '../data/templateVariants'
import { createDefaultResumeData } from './defaults'

export function loadState(): ResumeBuilderState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return { data: createDefaultResumeData(), selectedTemplateId: null }
    }
    const parsed = JSON.parse(raw) as ResumeBuilderState
    const defaults = createDefaultResumeData()
    return {
      data: {
        ...defaults,
        ...parsed.data,
        personalInfo: { ...defaults.personalInfo, ...parsed.data?.personalInfo },
        sectionOrder: parsed.data?.sectionOrder?.length
          ? parsed.data.sectionOrder
          : defaults.sectionOrder,
      },
      selectedTemplateId: normalizeTemplateId(parsed.selectedTemplateId),
    }
  } catch {
    return { data: createDefaultResumeData(), selectedTemplateId: null }
  }
}

export function saveState(state: ResumeBuilderState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}
