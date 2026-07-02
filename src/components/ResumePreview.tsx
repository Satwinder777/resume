import { useResume } from '../context/ResumeContext'
import { DEFAULT_TEMPLATE_ID } from '../utils/templates'
import { ResumeTemplateRenderer } from './templates/ResumeTemplateRenderer'

interface ResumePreviewProps {
  scale?: number
  className?: string
}

export function ResumePreview({ scale = 0.55, className = '' }: ResumePreviewProps) {
  const { data, selectedTemplateId } = useResume()
  const templateId = selectedTemplateId ?? DEFAULT_TEMPLATE_ID

  return (
    <div className={`overflow-auto ${className}`}>
      <div
        className="origin-top-left"
        style={{ transform: `scale(${scale})`, width: `${100 / scale}%` }}
      >
        <ResumeTemplateRenderer templateId={templateId} data={data} />
      </div>
    </div>
  )
}
