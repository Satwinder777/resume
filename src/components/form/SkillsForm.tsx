import { useState, type KeyboardEvent } from 'react'
import { useResume } from '../../context/ResumeContext'
import { FormSection } from './FormPrimitives'

export function SkillsForm() {
  const { data, updateData } = useResume()
  const [input, setInput] = useState('')

  const addSkill = (skill: string) => {
    const trimmed = skill.trim()
    if (!trimmed || data.skills.includes(trimmed)) return
    updateData((prev) => ({ ...prev, skills: [...prev.skills, trimmed] }))
    setInput('')
  }

  const removeSkill = (skill: string) => {
    updateData((prev) => ({ ...prev, skills: prev.skills.filter((s) => s !== skill) }))
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addSkill(input)
    }
  }

  return (
    <FormSection title="Skills">
      <div className="flex flex-wrap gap-2">
        {data.skills.map((skill) => (
          <span key={skill} className="inline-flex items-center gap-1 rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-800">
            {skill}
            <button type="button" onClick={() => removeSkill(skill)} className="text-indigo-500 hover:text-indigo-800" aria-label={`Remove ${skill}`}>×</button>
          </span>
        ))}
      </div>
      <input
        className="mt-3 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => input && addSkill(input)}
        placeholder="Type a skill and press Enter"
      />
    </FormSection>
  )
}
