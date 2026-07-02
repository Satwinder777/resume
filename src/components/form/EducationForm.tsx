import { useResume } from '../../context/ResumeContext'
import { createId } from '../../utils/defaults'
import { AddButton, FormField, FormSection, inputClass, RemoveItemButton } from './FormPrimitives'

export function EducationForm() {
  const { data, updateData } = useResume()

  const addEducation = () => {
    updateData((prev) => ({
      ...prev,
      education: [...prev.education, { id: createId(), school: '', degree: '', startDate: '', endDate: '' }],
    }))
  }

  const removeEducation = (id: string) => {
    updateData((prev) => ({
      ...prev,
      education: prev.education.filter((e) => e.id !== id),
    }))
  }

  const updateEducation = (id: string, field: string, value: string) => {
    updateData((prev) => ({
      ...prev,
      education: prev.education.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    }))
  }

  return (
    <FormSection title="Education">
      <div className="space-y-4">
        {data.education.map((edu, idx) => (
          <div key={edu.id} className="rounded-lg border border-slate-100 bg-slate-50 p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">Education {idx + 1}</span>
              {data.education.length > 1 && (
                <RemoveItemButton onClick={() => removeEducation(edu.id)} />
              )}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <FormField label="School">
                <input className={inputClass} value={edu.school} onChange={(e) => updateEducation(edu.id, 'school', e.target.value)} />
              </FormField>
              <FormField label="Degree">
                <input className={inputClass} value={edu.degree} onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} />
              </FormField>
              <FormField label="Start date">
                <input className={inputClass} value={edu.startDate} onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)} />
              </FormField>
              <FormField label="End date">
                <input className={inputClass} value={edu.endDate} onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)} />
              </FormField>
            </div>
          </div>
        ))}
      </div>
      <AddButton onClick={addEducation} label="Add education" />
    </FormSection>
  )
}
