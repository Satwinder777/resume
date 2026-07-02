import type { ResumeData } from '../../types/resume'
import type { TemplateId } from '../../types/resume'
import { getVariantById } from '../../data/templateVariants'
import { VariantTemplate } from './VariantTemplate'

interface ResumeTemplateRendererProps {
  templateId: TemplateId
  data: ResumeData
  className?: string
}

export function ResumeTemplateRenderer({
  templateId,
  data,
  className = '',
}: ResumeTemplateRendererProps) {
  const variant = getVariantById(templateId)
  return <VariantTemplate data={data} variant={variant} className={className} />
}
