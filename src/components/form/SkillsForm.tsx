import { useState, type KeyboardEvent } from 'react'
import { useResume } from '../../context/ResumeContext'
import { createSkillCategory } from '../../utils/skills'
import { AddButton, FormField, FormSection, inputClass, RemoveItemButton } from './FormPrimitives'

const SUGGESTED_CATEGORIES = [
  'Technical Skills',
  'Frameworks & Libraries',
  'Tools & Platforms',
  'Soft Skills',
]

export function SkillsForm() {
  const { data, updateData } = useResume()
  const [inputs, setInputs] = useState<Record<string, string>>({})

  const addCategory = () => {
    const used = new Set(data.skillCategories.map((category) => category.name.trim().toLowerCase()))
    const suggested = SUGGESTED_CATEGORIES.find((name) => !used.has(name.toLowerCase()))
    updateData((prev) => ({
      ...prev,
      skillCategories: [...prev.skillCategories, createSkillCategory(suggested ?? '')],
    }))
  }

  const removeCategory = (id: string) => {
    updateData((prev) => ({
      ...prev,
      skillCategories: prev.skillCategories.filter((category) => category.id !== id),
    }))
  }

  const updateCategoryName = (id: string, name: string) => {
    updateData((prev) => ({
      ...prev,
      skillCategories: prev.skillCategories.map((category) =>
        category.id === id ? { ...category, name } : category,
      ),
    }))
  }

  const addSkill = (categoryId: string, skill: string) => {
    const trimmed = skill.trim()
    if (!trimmed) return

    updateData((prev) => ({
      ...prev,
      skillCategories: prev.skillCategories.map((category) => {
        if (category.id !== categoryId || category.skills.includes(trimmed)) return category
        return { ...category, skills: [...category.skills, trimmed] }
      }),
    }))
    setInputs((prev) => ({ ...prev, [categoryId]: '' }))
  }

  const removeSkill = (categoryId: string, skill: string) => {
    updateData((prev) => ({
      ...prev,
      skillCategories: prev.skillCategories.map((category) =>
        category.id === categoryId
          ? { ...category, skills: category.skills.filter((item) => item !== skill) }
          : category,
      ),
    }))
  }

  const handleKeyDown = (categoryId: string, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault()
      addSkill(categoryId, inputs[categoryId] ?? '')
    }
  }

  return (
    <FormSection title="Skills">
      <div className="space-y-5">
        {data.skillCategories.map((category) => (
          <div
            key={category.id}
            className="rounded-lg border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-700 dark:bg-slate-800/50"
          >
            <div className="mb-3 flex items-end gap-3">
              <FormField label="Category" className="flex-1">
                <input
                  className={inputClass}
                  value={category.name}
                  onChange={(e) => updateCategoryName(category.id, e.target.value)}
                  placeholder="e.g. Technical Skills"
                />
              </FormField>
              {data.skillCategories.length > 1 && (
                <RemoveItemButton onClick={() => removeCategory(category.id)} />
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-800 dark:bg-indigo-950 dark:text-indigo-200"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(category.id, skill)}
                    className="text-indigo-500 hover:text-indigo-800"
                    aria-label={`Remove ${skill}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <input
              className="mt-3 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-600 dark:bg-slate-800"
              value={inputs[category.id] ?? ''}
              onChange={(e) => setInputs((prev) => ({ ...prev, [category.id]: e.target.value }))}
              onKeyDown={(e) => handleKeyDown(category.id, e)}
              onBlur={() => inputs[category.id] && addSkill(category.id, inputs[category.id])}
              placeholder="Type a skill and press Enter"
            />
          </div>
        ))}
      </div>
      <AddButton onClick={addCategory} label="Add skill category" />
    </FormSection>
  )
}
