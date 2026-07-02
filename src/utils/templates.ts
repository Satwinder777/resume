import type { TemplateCategory, TemplateId } from '../types/resume'

export {
  TEMPLATE_VARIANTS,
  FILTER_TABS,
  ALL_TEMPLATE_IDS,
  DEFAULT_TEMPLATE_ID,
  CATEGORY_PAGES,
  normalizeTemplateId,
  getVariantById,
  filterVariants,
  parseCategoryParam,
} from '../data/templateVariants'

export type { TemplateVariant, TemplateTheme } from '../data/templateVariants'
export type { StructureId } from '../components/templates/layouts'

import { TEMPLATE_VARIANTS, getVariantById, filterVariants } from '../data/templateVariants'

export const TEMPLATES = TEMPLATE_VARIANTS

export function getTemplateById(id: TemplateId) {
  return getVariantById(id)
}

export function filterTemplates(category: TemplateCategory | 'all') {
  return filterVariants(category)
}
