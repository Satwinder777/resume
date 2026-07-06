import { useReactToPrint } from 'react-to-print'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { RESUME_PRINT_PAGE_STYLE } from './printStyles'

const A4_WIDTH_MM = 210
const A4_HEIGHT_MM = 297

function sliceCanvasToPdf(canvas: HTMLCanvasElement, pdf: jsPDF) {
  const pageWidth = A4_WIDTH_MM
  const pageHeight = A4_HEIGHT_MM
  const pageHeightPx = Math.floor((canvas.width * pageHeight) / pageWidth)
  let renderedHeight = 0
  let pageIndex = 0

  while (renderedHeight < canvas.height) {
    const sliceHeight = Math.min(pageHeightPx, canvas.height - renderedHeight)
    const pageCanvas = document.createElement('canvas')
    pageCanvas.width = canvas.width
    pageCanvas.height = sliceHeight

    const ctx = pageCanvas.getContext('2d')
    if (!ctx) break

    ctx.drawImage(
      canvas,
      0,
      renderedHeight,
      canvas.width,
      sliceHeight,
      0,
      0,
      canvas.width,
      sliceHeight,
    )

    const sliceHeightMm = (sliceHeight * pageWidth) / canvas.width
    if (pageIndex > 0) pdf.addPage()
    pdf.addImage(pageCanvas.toDataURL('image/png'), 'PNG', 0, 0, pageWidth, sliceHeightMm)

    renderedHeight += sliceHeight
    pageIndex += 1
  }
}

export function useResumeExport(resumeRef: React.RefObject<HTMLDivElement | null>) {
  const handlePrint = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: 'Resume',
    pageStyle: RESUME_PRINT_PAGE_STYLE,
  })

  const downloadPdf = () => {
    handlePrint()
  }

  const captureResumeCanvas = async () => {
    const element = resumeRef.current
    if (!element) return null

    const resumePage = element.querySelector('.resume-page') as HTMLElement | null
    const target = resumePage ?? element

    return html2canvas(target, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      width: target.scrollWidth,
      height: target.scrollHeight,
      windowWidth: target.scrollWidth,
      windowHeight: target.scrollHeight,
    })
  }

  const downloadPng = async () => {
    const canvas = await captureResumeCanvas()
    if (!canvas) return

    const link = document.createElement('a')
    link.download = 'resume.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  const downloadPdfRaster = async () => {
    const canvas = await captureResumeCanvas()
    if (!canvas) return

    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
    sliceCanvasToPdf(canvas, pdf)
    pdf.save('resume.pdf')
  }

  return { downloadPdf, downloadPng, downloadPdfRaster }
}
