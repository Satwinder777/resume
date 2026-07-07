import type { SkillCategory } from '../types/resume'
import { createId } from './defaults'

export function hasSkills(categories: SkillCategory[]): boolean {
  return categories.some((category) => category.skills.some((skill) => skill.trim().length > 0))
}

export function getAllSkills(categories: SkillCategory[]): string[] {
  return categories.flatMap((category) => category.skills.filter(Boolean))
}

export function createSkillCategory(name = ''): SkillCategory {
  return { id: createId(), name, skills: [] }
}

export function normalizeSkillCategories(raw: unknown, fallback: SkillCategory[]): SkillCategory[] {
  if (!Array.isArray(raw) || raw.length === 0) return fallback

  if (typeof raw[0] === 'string') {
    return [{ id: createId(), name: 'Skills', skills: raw.filter((item) => typeof item === 'string') }]
  }

  return raw.map((item) => {
    const category = item as Partial<SkillCategory>
    return {
      id: typeof category.id === 'string' ? category.id : createId(),
      name: typeof category.name === 'string' ? category.name : 'Skills',
      skills: Array.isArray(category.skills)
        ? category.skills.filter((skill): skill is string => typeof skill === 'string')
        : [],
    }
  })
}
