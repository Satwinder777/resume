import { useState } from 'react'
import { useResume } from '../../context/ResumeContext'
import type { SectionConfig } from '../../types/resume'

const SECTION_LABELS: Record<string, string> = {
  summary: 'Professional Summary',
  experience: 'Work Experience',
  education: 'Education',
  skills: 'Skills',
  languages: 'Languages',
  certifications: 'Certifications',
  projects: 'Projects',
  custom: 'Custom Section',
}

function getSectionLabel(section: SectionConfig, customTitle?: string): string {
  if (section.type === 'custom' && customTitle) return customTitle
  return SECTION_LABELS[section.type] ?? section.type
}

export function SectionOrderPanel() {
  const { data, updateData } = useResume()
  const [dragIndex, setDragIndex] = useState<number | null>(null)

  const reorder = (from: number, to: number) => {
    if (from === to) return
    updateData((prev) => {
      const order = [...prev.sectionOrder]
      const [moved] = order.splice(from, 1)
      order.splice(to, 0, moved)
      return { ...prev, sectionOrder: order }
    })
  }

  const toggleVisibility = (id: string) => {
    updateData((prev) => ({
      ...prev,
      sectionOrder: prev.sectionOrder.map((s) =>
        s.id === id ? { ...s, visible: !s.visible } : s,
      ),
    }))
  }

  const getCustomTitle = (section: SectionConfig) => {
    if (section.type !== 'custom') return undefined
    return data.customSections.find((c) => c.id === section.id)?.title
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-1 text-base font-semibold text-slate-900">Section order</h3>
      <p className="mb-4 text-sm text-slate-500">Drag to reorder sections on your resume. Toggle visibility with the checkbox.</p>
      <ul className="space-y-2">
        {data.sectionOrder.map((section, index) => (
          <li
            key={section.id}
            draggable
            onDragStart={() => setDragIndex(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              if (dragIndex !== null) reorder(dragIndex, index)
              setDragIndex(null)
            }}
            onDragEnd={() => setDragIndex(null)}
            className={`flex cursor-grab items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 active:cursor-grabbing ${
              dragIndex === index ? 'opacity-50' : ''
            }`}
          >
            <span className="text-slate-400" aria-hidden>⠿</span>
            <input
              type="checkbox"
              checked={section.visible}
              onChange={() => toggleVisibility(section.id)}
              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="flex-1 text-sm font-medium text-slate-700">
              {getSectionLabel(section, getCustomTitle(section))}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
