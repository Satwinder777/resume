import type { ResumeData, SectionConfig } from '../types/resume'

export function createId(): string {
  return crypto.randomUUID()
}

const defaultSectionOrder: SectionConfig[] = [
  { id: 'summary', type: 'summary', visible: true },
  { id: 'experience', type: 'experience', visible: true },
  { id: 'education', type: 'education', visible: true },
  { id: 'skills', type: 'skills', visible: true },
  { id: 'languages', type: 'languages', visible: true },
  { id: 'certifications', type: 'certifications', visible: true },
  { id: 'projects', type: 'projects', visible: true },
]

export function createDefaultResumeData(): ResumeData {
  return {
    personalInfo: {
      name: '',
      jobTitle: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      website: '',
      photo: null,
    },
    summary: '',
    experience: [
      {
        id: createId(),
        company: '',
        role: '',
        startDate: '',
        endDate: '',
        current: false,
        bullets: [''],
      },
    ],
    education: [
      {
        id: createId(),
        school: '',
        degree: '',
        startDate: '',
        endDate: '',
      },
    ],
    skillCategories: [{ id: createId(), name: 'Technical Skills', skills: [] }],
    languages: [],
    certifications: [],
    projects: [],
    customSections: [],
    sectionOrder: defaultSectionOrder.map((s) => ({ ...s })),
  }
}
