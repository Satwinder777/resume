export interface PersonalInfo {
  name: string
  jobTitle: string
  email: string
  phone: string
  location: string
  linkedin: string
  photo: string | null
}

export interface WorkExperience {
  id: string
  company: string
  role: string
  startDate: string
  endDate: string
  current: boolean
  bullets: string[]
}

export interface Education {
  id: string
  school: string
  degree: string
  startDate: string
  endDate: string
}

export interface Language {
  id: string
  language: string
  proficiency: string
}

export interface Certification {
  id: string
  name: string
  issuer: string
  date: string
}

export interface Project {
  id: string
  name: string
  description: string
  url: string
}

export interface CustomSection {
  id: string
  title: string
  content: string
}

export type SectionType =
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'languages'
  | 'certifications'
  | 'projects'
  | 'custom'

export interface SectionConfig {
  id: string
  type: SectionType
  visible: boolean
}

export interface ResumeData {
  personalInfo: PersonalInfo
  summary: string
  experience: WorkExperience[]
  education: Education[]
  skills: string[]
  languages: Language[]
  certifications: Certification[]
  projects: Project[]
  customSections: CustomSection[]
  sectionOrder: SectionConfig[]
}

export type TemplateId =
  | 'template1' | 'template2' | 'template3' | 'template4' | 'template5'
  | 'template6' | 'template7' | 'template8' | 'template9' | 'template11'
  | 'template12' | 'template13' | 'template14' | 'template16' | 'template17'
  | 'template18' | 'template19' | 'template20' | 'template21' | 'template22'
  | 'template23' | 'template24' | 'template25' | 'template29' | 'template30'
  | 'template31' | 'template32' | 'template33' | 'template34' | 'template35'
  | 'template36' | 'template37' | 'template38'
  // legacy ids (auto-migrated)
  | 'simple' | 'modern' | 'one-column' | 'with-photo' | 'professional' | 'ats'

export type TemplateCategory =
  | 'simple'
  | 'modern'
  | 'one-column'
  | 'with-photo'
  | 'professional'
  | 'ats-friendly'

export interface TemplateMeta {
  id: TemplateId
  name: string
  description: string
  categories: TemplateCategory[]
}

export interface ResumeBuilderState {
  data: ResumeData
  selectedTemplateId: TemplateId | null
}

export const STORAGE_KEY = 'resume-builder-state'
