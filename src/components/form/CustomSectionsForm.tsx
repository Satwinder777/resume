import { useResume } from '../../context/ResumeContext'
import { createId } from '../../utils/defaults'
import { AddButton, FormField, FormSection, inputClass, RemoveItemButton, textareaClass } from './FormPrimitives'

export function CustomSectionsForm() {
  const { data, updateData } = useResume()

  const addSection = () => {
    const id = createId()
    updateData((prev) => ({
      ...prev,
      customSections: [...prev.customSections, { id, title: '', content: '' }],
      sectionOrder: [...prev.sectionOrder, { id, type: 'custom', visible: true }],
    }))
  }

  const removeSection = (id: string) => {
    updateData((prev) => ({
      ...prev,
      customSections: prev.customSections.filter((s) => s.id !== id),
      sectionOrder: prev.sectionOrder.filter((s) => s.id !== id),
    }))
  }

  const updateSection = (id: string, field: 'title' | 'content', value: string) => {
    updateData((prev) => ({
      ...prev,
      customSections: prev.customSections.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    }))
  }

  return (
    <FormSection title="Custom Sections" optional>
      <div className="space-y-4">
        {data.customSections.map((section) => (
          <div key={section.id} className="rounded-lg border border-slate-100 bg-slate-50 p-4">
            <div className="mb-3 flex justify-end">
              <RemoveItemButton onClick={() => removeSection(section.id)} />
            </div>
            <div className="grid gap-3">
              <FormField label="Section title">
                <input className={inputClass} value={section.title} onChange={(e) => updateSection(section.id, 'title', e.target.value)} placeholder="Volunteer Work" />
              </FormField>
              <FormField label="Content">
                <textarea className={textareaClass} value={section.content} onChange={(e) => updateSection(section.id, 'content', e.target.value)} rows={4} />
              </FormField>
            </div>
          </div>
        ))}
      </div>
      <AddButton onClick={addSection} label="Add custom section" />
    </FormSection>
  )
}
