import { useResume } from '../../context/ResumeContext'
import { createId } from '../../utils/defaults'
import { AddButton, FormField, FormSection, inputClass, RemoveItemButton } from './FormPrimitives'

const PROFICIENCY_LEVELS = ['Native', 'Fluent', 'Advanced', 'Intermediate', 'Basic']

export function LanguagesForm() {
  const { data, updateData } = useResume()

  const addLanguage = () => {
    updateData((prev) => ({
      ...prev,
      languages: [...prev.languages, { id: createId(), language: '', proficiency: 'Fluent' }],
    }))
  }

  const removeLanguage = (id: string) => {
    updateData((prev) => ({
      ...prev,
      languages: prev.languages.filter((l) => l.id !== id),
    }))
  }

  const updateLanguage = (id: string, field: string, value: string) => {
    updateData((prev) => ({
      ...prev,
      languages: prev.languages.map((l) => (l.id === id ? { ...l, [field]: value } : l)),
    }))
  }

  return (
    <FormSection title="Languages">
      <div className="space-y-3">
        {data.languages.map((lang) => (
          <div key={lang.id} className="flex items-end gap-3">
            <FormField label="Language" className="flex-1">
              <input className={inputClass} value={lang.language} onChange={(e) => updateLanguage(lang.id, 'language', e.target.value)} placeholder="English" />
            </FormField>
            <FormField label="Proficiency" className="flex-1">
              <select className={inputClass} value={lang.proficiency} onChange={(e) => updateLanguage(lang.id, 'proficiency', e.target.value)}>
                {PROFICIENCY_LEVELS.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </FormField>
            <RemoveItemButton onClick={() => removeLanguage(lang.id)} />
          </div>
        ))}
      </div>
      <AddButton onClick={addLanguage} label="Add language" />
    </FormSection>
  )
}
