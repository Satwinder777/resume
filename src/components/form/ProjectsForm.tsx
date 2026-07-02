import { useResume } from '../../context/ResumeContext'
import { createId } from '../../utils/defaults'
import { AddButton, FormField, FormSection, inputClass, RemoveItemButton, textareaClass } from './FormPrimitives'

export function ProjectsForm() {
  const { data, updateData } = useResume()

  const addProject = () => {
    updateData((prev) => ({
      ...prev,
      projects: [...prev.projects, { id: createId(), name: '', description: '', url: '' }],
    }))
  }

  const removeProject = (id: string) => {
    updateData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }))
  }

  const updateProject = (id: string, field: string, value: string) => {
    updateData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    }))
  }

  return (
    <FormSection title="Projects" optional>
      <div className="space-y-4">
        {data.projects.map((project) => (
          <div key={project.id} className="rounded-lg border border-slate-100 bg-slate-50 p-4">
            <div className="mb-3 flex justify-end">
              <RemoveItemButton onClick={() => removeProject(project.id)} />
            </div>
            <div className="grid gap-3">
              <FormField label="Project name">
                <input className={inputClass} value={project.name} onChange={(e) => updateProject(project.id, 'name', e.target.value)} />
              </FormField>
              <FormField label="Description">
                <textarea className={textareaClass} value={project.description} onChange={(e) => updateProject(project.id, 'description', e.target.value)} rows={3} />
              </FormField>
              <FormField label="URL (optional)">
                <input className={inputClass} value={project.url} onChange={(e) => updateProject(project.id, 'url', e.target.value)} placeholder="https://..." />
              </FormField>
            </div>
          </div>
        ))}
      </div>
      <AddButton onClick={addProject} label="Add project" />
    </FormSection>
  )
}
