import { useResume } from '../../context/ResumeContext'
import { FormField, FormSection, textareaClass } from './FormPrimitives'

export function SummaryForm() {
  const { data, updateData } = useResume()

  return (
    <FormSection title="Professional Summary">
      <FormField label="Summary">
        <textarea
          className={textareaClass}
          value={data.summary}
          onChange={(e) => updateData((prev) => ({ ...prev, summary: e.target.value }))}
          placeholder="A brief overview of your professional background and key strengths..."
          rows={5}
        />
      </FormField>
    </FormSection>
  )
}
