import { useResume } from '../../context/ResumeContext'
import { FormField, FormSection, inputClass } from './FormPrimitives'

export function PersonalInfoForm() {
  const { data, updateData } = useResume()
  const { personalInfo } = data

  const update = (field: keyof typeof personalInfo, value: string | null) => {
    updateData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }))
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => update('photo', reader.result as string)
    reader.readAsDataURL(file)
  }

  return (
    <FormSection title="Personal Info">
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Full name">
          <input className={inputClass} value={personalInfo.name} onChange={(e) => update('name', e.target.value)} placeholder="Jane Doe" />
        </FormField>
        <FormField label="Job title">
          <input className={inputClass} value={personalInfo.jobTitle} onChange={(e) => update('jobTitle', e.target.value)} placeholder="Software Engineer" />
        </FormField>
        <FormField label="Email">
          <input className={inputClass} type="email" value={personalInfo.email} onChange={(e) => update('email', e.target.value)} placeholder="jane@email.com" />
        </FormField>
        <FormField label="Phone">
          <input className={inputClass} value={personalInfo.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+1 555 000 0000" />
        </FormField>
        <FormField label="Location">
          <input className={inputClass} value={personalInfo.location} onChange={(e) => update('location', e.target.value)} placeholder="San Francisco, CA" />
        </FormField>
        <FormField label="LinkedIn">
          <input className={inputClass} value={personalInfo.linkedin} onChange={(e) => update('linkedin', e.target.value)} placeholder="linkedin.com/in/janedoe" />
        </FormField>
        <FormField label="Profile photo" className="sm:col-span-2">
          <div className="flex items-center gap-4">
            {personalInfo.photo && (
              <img src={personalInfo.photo} alt="Profile" className="h-16 w-16 rounded-full object-cover" />
            )}
            <input type="file" accept="image/*" onChange={handlePhotoUpload} className="text-sm text-slate-600" />
            {personalInfo.photo && (
              <button type="button" onClick={() => update('photo', null)} className="text-sm text-red-500">Remove photo</button>
            )}
          </div>
        </FormField>
      </div>
    </FormSection>
  )
}
