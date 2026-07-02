import { useResume } from '../../context/ResumeContext'
import { createId } from '../../utils/defaults'
import { AddButton, FormField, FormSection, inputClass, RemoveItemButton, textareaClass } from './FormPrimitives'

export function ExperienceForm() {
  const { data, updateData } = useResume()

  const addExperience = () => {
    updateData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        { id: createId(), company: '', role: '', startDate: '', endDate: '', current: false, bullets: [''] },
      ],
    }))
  }

  const removeExperience = (id: string) => {
    updateData((prev) => ({
      ...prev,
      experience: prev.experience.filter((e) => e.id !== id),
    }))
  }

  const updateExperience = (id: string, field: string, value: string | boolean | string[]) => {
    updateData((prev) => ({
      ...prev,
      experience: prev.experience.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    }))
  }

  const addBullet = (id: string) => {
    updateData((prev) => ({
      ...prev,
      experience: prev.experience.map((e) =>
        e.id === id ? { ...e, bullets: [...e.bullets, ''] } : e,
      ),
    }))
  }

  const updateBullet = (expId: string, index: number, value: string) => {
    updateData((prev) => ({
      ...prev,
      experience: prev.experience.map((e) => {
        if (e.id !== expId) return e
        const bullets = [...e.bullets]
        bullets[index] = value
        return { ...e, bullets }
      }),
    }))
  }

  const removeBullet = (expId: string, index: number) => {
    updateData((prev) => ({
      ...prev,
      experience: prev.experience.map((e) => {
        if (e.id !== expId) return e
        return { ...e, bullets: e.bullets.filter((_, i) => i !== index) }
      }),
    }))
  }

  return (
    <FormSection title="Work Experience">
      <div className="space-y-6">
        {data.experience.map((exp, idx) => (
          <div key={exp.id} className="rounded-lg border border-slate-100 bg-slate-50 p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">Position {idx + 1}</span>
              {data.experience.length > 1 && (
                <RemoveItemButton onClick={() => removeExperience(exp.id)} />
              )}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <FormField label="Company">
                <input className={inputClass} value={exp.company} onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} />
              </FormField>
              <FormField label="Role">
                <input className={inputClass} value={exp.role} onChange={(e) => updateExperience(exp.id, 'role', e.target.value)} />
              </FormField>
              <FormField label="Start date">
                <input className={inputClass} value={exp.startDate} onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)} placeholder="Jan 2020" />
              </FormField>
              <FormField label="End date">
                <input className={inputClass} value={exp.endDate} onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)} placeholder="Dec 2023" disabled={exp.current} />
              </FormField>
            </div>
            <label className="mt-3 flex items-center gap-2 text-sm text-slate-600">
              <input type="checkbox" checked={exp.current} onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)} />
              I currently work here
            </label>
            <div className="mt-3 space-y-2">
              <span className="text-sm font-medium text-slate-700">Bullet points</span>
              {exp.bullets.map((bullet, i) => (
                <div key={i} className="flex gap-2">
                  <textarea
                    className={`${textareaClass} min-h-[60px] flex-1`}
                    value={bullet}
                    onChange={(e) => updateBullet(exp.id, i, e.target.value)}
                    placeholder="Describe an achievement or responsibility..."
                    rows={2}
                  />
                  {exp.bullets.length > 1 && (
                    <button type="button" onClick={() => removeBullet(exp.id, i)} className="self-start text-xs text-red-500">×</button>
                  )}
                </div>
              ))}
              <button type="button" onClick={() => addBullet(exp.id)} className="text-sm text-indigo-600 hover:text-indigo-800">+ Add bullet</button>
            </div>
          </div>
        ))}
      </div>
      <AddButton onClick={addExperience} label="Add experience" />
    </FormSection>
  )
}
