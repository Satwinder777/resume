import type { TemplateCategory, TemplateId } from '../types/resume'
import type { StructureId } from '../components/templates/layouts'

export interface TemplateTheme {
  primary: string
  accent: string
  sidebarBg?: string
  sidebarText?: string
  headerBg?: string
  fontFamily: 'sans' | 'serif'
  headingStyle: 'uppercase' | 'capitalize' | 'serif-upper'
}

export interface TemplateVariant {
  id: TemplateId
  name: string
  structureId: StructureId
  theme: TemplateTheme
  categories: TemplateCategory[]
}

const T = (n: number) => `template${n}` as TemplateId

export const TEMPLATE_VARIANTS: TemplateVariant[] = [
  { id: T(1), name: 'Indigo Sidebar', structureId: 'modern-sidebar-left', theme: { primary: '#1e293b', accent: '#818cf8', sidebarBg: '#312e81', sidebarText: '#e0e7ff', fontFamily: 'sans', headingStyle: 'uppercase' }, categories: ['modern'] },
  { id: T(2), name: 'Clean Black', structureId: 'one-col-strict', theme: { primary: '#000', accent: '#000', fontFamily: 'sans', headingStyle: 'uppercase' }, categories: ['simple', 'one-column', 'ats-friendly'] },
  { id: T(3), name: 'Blue Classic', structureId: 'simple-stack', theme: { primary: '#1e40af', accent: '#2563eb', fontFamily: 'sans', headingStyle: 'uppercase' }, categories: ['simple', 'professional'] },
  { id: T(4), name: 'Green Header', structureId: 'modern-top-band', theme: { primary: '#14532d', accent: '#16a34a', headerBg: '#16a34a', fontFamily: 'sans', headingStyle: 'uppercase' }, categories: ['simple', 'modern', 'professional'] },
  { id: T(5), name: 'Purple Modern', structureId: 'modern-two-col', theme: { primary: '#4c1d95', accent: '#8b5cf6', fontFamily: 'sans', headingStyle: 'uppercase' }, categories: ['modern', 'professional'] },
  { id: T(6), name: 'ATS Plain', structureId: 'ats-plain', theme: { primary: '#000', accent: '#000', fontFamily: 'sans', headingStyle: 'uppercase' }, categories: ['ats-friendly', 'one-column', 'simple'] },
  { id: T(7), name: 'Navy Professional', structureId: 'pro-centered', theme: { primary: '#1e3a5f', accent: '#b45309', fontFamily: 'serif', headingStyle: 'serif-upper' }, categories: ['professional', 'simple'] },
  { id: T(8), name: 'Gray Minimal', structureId: 'ats-compact', theme: { primary: '#374151', accent: '#6b7280', fontFamily: 'sans', headingStyle: 'uppercase' }, categories: ['simple', 'one-column', 'ats-friendly'] },
  { id: T(9), name: 'Minimal Light', structureId: 'simple-minimal', theme: { primary: '#111827', accent: '#374151', fontFamily: 'sans', headingStyle: 'capitalize' }, categories: ['simple', 'one-column', 'professional'] },
  { id: T(11), name: 'Teal Accent', structureId: 'modern-accent-corner', theme: { primary: '#134e4a', accent: '#14b8a6', fontFamily: 'sans', headingStyle: 'uppercase' }, categories: ['modern', 'one-column'] },
  { id: T(12), name: 'Coral Two-Column', structureId: 'modern-two-col', theme: { primary: '#9a3412', accent: '#f97316', fontFamily: 'sans', headingStyle: 'uppercase' }, categories: ['modern', 'professional'] },
  { id: T(13), name: 'Dark Modern', structureId: 'modern-sidebar-left', theme: { primary: '#0f172a', accent: '#38bdf8', sidebarBg: '#0f172a', sidebarText: '#f1f5f9', fontFamily: 'sans', headingStyle: 'uppercase' }, categories: ['modern', 'with-photo', 'professional'] },
  { id: T(14), name: 'Blue Photo', structureId: 'photo-left-col', theme: { primary: '#1e40af', accent: '#3b82f6', fontFamily: 'sans', headingStyle: 'uppercase' }, categories: ['with-photo', 'modern', 'one-column'] },
  { id: T(16), name: 'Burgundy Executive', structureId: 'pro-executive', theme: { primary: '#7f1d1d', accent: '#b91c1c', fontFamily: 'serif', headingStyle: 'serif-upper' }, categories: ['professional', 'simple'] },
  { id: T(17), name: 'Centered Simple', structureId: 'simple-centered', theme: { primary: '#365314', accent: '#65a30d', fontFamily: 'sans', headingStyle: 'uppercase' }, categories: ['simple', 'one-column', 'professional'] },
  { id: T(18), name: 'ATS Standard', structureId: 'ats-plain', theme: { primary: '#000', accent: '#333', fontFamily: 'sans', headingStyle: 'uppercase' }, categories: ['ats-friendly', 'one-column', 'simple'] },
  { id: T(19), name: 'Gray Photo', structureId: 'photo-sidebar', theme: { primary: '#374151', accent: '#6b7280', sidebarBg: '#f1f5f9', fontFamily: 'sans', headingStyle: 'capitalize' }, categories: ['with-photo', 'simple', 'ats-friendly'] },
  { id: T(20), name: 'Indigo Photo', structureId: 'photo-top-right', theme: { primary: '#312e81', accent: '#6366f1', fontFamily: 'sans', headingStyle: 'uppercase' }, categories: ['with-photo', 'modern', 'one-column', 'professional'] },
  { id: T(21), name: 'Blue Right Bar', structureId: 'modern-sidebar-right', theme: { primary: '#1e3a8a', accent: '#3b82f6', sidebarBg: '#1e40af', sidebarText: '#dbeafe', fontFamily: 'sans', headingStyle: 'uppercase' }, categories: ['modern', 'professional'] },
  { id: T(22), name: 'Bold One Column', structureId: 'one-col-strict', theme: { primary: '#0f172a', accent: '#0f172a', fontFamily: 'sans', headingStyle: 'uppercase' }, categories: ['modern', 'one-column', 'professional'] },
  { id: T(23), name: 'ATS Compact', structureId: 'ats-compact', theme: { primary: '#000', accent: '#000', fontFamily: 'sans', headingStyle: 'uppercase' }, categories: ['ats-friendly', 'simple'] },
  { id: T(24), name: 'Split Header', structureId: 'simple-split', theme: { primary: '#18181b', accent: '#3f3f46', fontFamily: 'sans', headingStyle: 'uppercase' }, categories: ['simple', 'one-column', 'ats-friendly', 'professional'] },
  { id: T(25), name: 'Rose Modern', structureId: 'modern-top-band', theme: { primary: '#881337', accent: '#f43f5e', headerBg: '#9f1239', fontFamily: 'sans', headingStyle: 'uppercase' }, categories: ['modern', 'professional'] },
  { id: T(29), name: 'Sky Photo', structureId: 'photo-left-col', theme: { primary: '#0c4a6e', accent: '#0ea5e9', fontFamily: 'sans', headingStyle: 'uppercase' }, categories: ['with-photo', 'simple', 'professional'] },
  { id: T(30), name: 'Emerald Banner', structureId: 'photo-top-banner', theme: { primary: '#064e3b', accent: '#10b981', headerBg: '#059669', fontFamily: 'sans', headingStyle: 'uppercase' }, categories: ['with-photo', 'simple', 'professional'] },
  { id: T(31), name: 'Amber Photo', structureId: 'photo-sidebar', theme: { primary: '#78350f', accent: '#d97706', sidebarBg: '#fffbeb', fontFamily: 'sans', headingStyle: 'capitalize' }, categories: ['with-photo', 'simple', 'professional'] },
  { id: T(32), name: 'Violet Sidebar', structureId: 'modern-sidebar-right', theme: { primary: '#4c1d95', accent: '#a78bfa', sidebarBg: '#5b21b6', sidebarText: '#ede9fe', fontFamily: 'sans', headingStyle: 'uppercase' }, categories: ['modern', 'with-photo', 'professional'] },
  { id: T(33), name: 'Cyan Modern', structureId: 'modern-accent-corner', theme: { primary: '#164e63', accent: '#06b6d4', fontFamily: 'sans', headingStyle: 'uppercase' }, categories: ['modern', 'with-photo', 'professional'] },
  { id: T(34), name: 'Pink Photo', structureId: 'photo-top-right', theme: { primary: '#9d174d', accent: '#ec4899', fontFamily: 'sans', headingStyle: 'uppercase' }, categories: ['with-photo', 'professional'] },
  { id: T(35), name: 'Slate Photo Band', structureId: 'photo-top-banner', theme: { primary: '#1e293b', accent: '#64748b', headerBg: '#334155', fontFamily: 'sans', headingStyle: 'uppercase' }, categories: ['with-photo', 'modern'] },
  { id: T(36), name: 'Gold Professional', structureId: 'photo-left-col', theme: { primary: '#78350f', accent: '#ca8a04', fontFamily: 'serif', headingStyle: 'serif-upper' }, categories: ['with-photo', 'professional'] },
  { id: T(37), name: 'Indigo Classic', structureId: 'simple-stack', theme: { primary: '#312e81', accent: '#6366f1', fontFamily: 'sans', headingStyle: 'uppercase' }, categories: ['simple', 'modern'] },
  { id: T(38), name: 'ATS Minimal', structureId: 'ats-plain', theme: { primary: '#000', accent: '#000', fontFamily: 'sans', headingStyle: 'uppercase' }, categories: ['ats-friendly', 'simple'] },
]

export const CATEGORY_PAGES: Record<
  TemplateCategory | 'all',
  { title: string; description: string; path: string }
> = {
  all: {
    title: 'Resume templates',
    description: 'Simple to use and ready in minutes resume templates — give it a try for free now!',
    path: '/templates',
  },
  simple: {
    title: 'Simple resume templates',
    description: 'Embrace simplicity! Our simple resume templates blend ease and professionalism!',
    path: '/templates/simple',
  },
  modern: {
    title: 'Modern resume templates',
    description: 'Boost your image with our sleek, modern resume templates: showcasing your innovation and originality in a stylish, contemporary design.',
    path: '/templates/modern',
  },
  'one-column': {
    title: 'One column resume templates',
    description: 'Clean single-column layouts that are easy to read and ATS-friendly.',
    path: '/templates/one-column',
  },
  'with-photo': {
    title: 'Resume templates with photo',
    description: 'Stand out with professional photo layouts — perfect for creative and client-facing roles.',
    path: '/templates/with-photo',
  },
  professional: {
    title: 'Professional resume templates',
    description: 'Propel your career prospects with our precision-designed professional resume templates, offering the perfect blend of professionalism and style.',
    path: '/templates/professional',
  },
  'ats-friendly': {
    title: 'ATS resume templates',
    description: 'Enhance your job search with our ATS resume templates. Beat the algorithm, and showcase attention to detail.',
    path: '/templates/ats',
  },
}

export const FILTER_TABS: { label: string; value: TemplateCategory | 'all' }[] = [
  { label: 'All Templates', value: 'all' },
  { label: 'Simple', value: 'simple' },
  { label: 'Modern', value: 'modern' },
  { label: 'One column', value: 'one-column' },
  { label: 'With photo', value: 'with-photo' },
  { label: 'Professional', value: 'professional' },
  { label: 'ATS', value: 'ats-friendly' },
]

export const ALL_TEMPLATE_IDS = TEMPLATE_VARIANTS.map((t) => t.id)

const LEGACY_MAP: Record<string, TemplateId> = {
  simple: T(3),
  modern: T(13),
  'one-column': T(6),
  'with-photo': T(29),
  professional: T(7),
  ats: T(6),
}

export function normalizeTemplateId(id: string | null): TemplateId | null {
  if (!id) return null
  if (LEGACY_MAP[id]) return LEGACY_MAP[id]
  if (ALL_TEMPLATE_IDS.includes(id as TemplateId)) return id as TemplateId
  return T(13)
}

export function getVariantById(id: TemplateId): TemplateVariant {
  return TEMPLATE_VARIANTS.find((t) => t.id === id) ?? TEMPLATE_VARIANTS.find((t) => t.id === T(13))!
}

export function filterVariants(category: TemplateCategory | 'all'): TemplateVariant[] {
  if (category === 'all') return TEMPLATE_VARIANTS
  return TEMPLATE_VARIANTS.filter((t) => t.categories.includes(category))
}

export function parseCategoryParam(param?: string): TemplateCategory | 'all' {
  if (!param || param === 'all') return 'all'
  const map: Record<string, TemplateCategory | 'all'> = {
    simple: 'simple',
    modern: 'modern',
    'one-column': 'one-column',
    'with-photo': 'with-photo',
    professional: 'professional',
    ats: 'ats-friendly',
    'ats-friendly': 'ats-friendly',
  }
  return map[param] ?? 'all'
}

export const DEFAULT_TEMPLATE_ID: TemplateId = T(13)
