import { useResume } from '../../context/ResumeContext'
import { createId } from '../../utils/defaults'
import { AddButton, FormField, FormSection, inputClass, RemoveItemButton } from './FormPrimitives'

export function CertificationsForm() {
  const { data, updateData } = useResume()

  const addCert = () => {
    updateData((prev) => ({
      ...prev,
      certifications: [...prev.certifications, { id: createId(), name: '', issuer: '', date: '' }],
    }))
  }

  const removeCert = (id: string) => {
    updateData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((c) => c.id !== id),
    }))
  }

  const updateCert = (id: string, field: string, value: string) => {
    updateData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((c) => (c.id === id ? { ...c, [field]: value } : c)),
    }))
  }

  return (
    <FormSection title="Certifications" optional>
      <div className="space-y-4">
        {data.certifications.map((cert) => (
          <div key={cert.id} className="grid gap-3 sm:grid-cols-3">
            <FormField label="Name">
              <input className={inputClass} value={cert.name} onChange={(e) => updateCert(cert.id, 'name', e.target.value)} />
            </FormField>
            <FormField label="Issuer">
              <input className={inputClass} value={cert.issuer} onChange={(e) => updateCert(cert.id, 'issuer', e.target.value)} />
            </FormField>
            <div className="flex items-end gap-2">
              <FormField label="Date" className="flex-1">
                <input className={inputClass} value={cert.date} onChange={(e) => updateCert(cert.id, 'date', e.target.value)} />
              </FormField>
              <RemoveItemButton onClick={() => removeCert(cert.id)} />
            </div>
          </div>
        ))}
      </div>
      <AddButton onClick={addCert} label="Add certification" />
    </FormSection>
  )
}
