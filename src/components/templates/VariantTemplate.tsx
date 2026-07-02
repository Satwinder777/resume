import type { ResumeData } from '../../types/resume'
import type { TemplateVariant } from '../../data/templateVariants'
import { LAYOUT_MAP } from './layouts'

interface VariantTemplateProps {
  data: ResumeData
  variant: TemplateVariant
  className?: string
}

export function VariantTemplate({ data, variant, className = '' }: VariantTemplateProps) {
  const Layout = LAYOUT_MAP[variant.structureId]
  return <Layout data={data} variant={variant} className={className} />
}
