import { useReactToPrint } from 'react-to-print'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { RESUME_PRINT_PAGE_STYLE } from './printStyles'

const A4_WIDTH_MM = 210
const A4_HEIGHT_MM = 297
const PAGE_MARGIN_MM = 10

function sliceCanvasToPdf(canvas: HTMLCanvasElement, pdf: jsPDF) {
  const contentWidth = A4_WIDTH_MM - PAGE_MARGIN_MM * 2
  const contentHeight = A4_HEIGHT_MM - PAGE_MARGIN_MM * 2
  const pageHeightPx = Math.floor((canvas.width * contentHeight) / contentWidth)
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

    const sliceHeightMm = (sliceHeight * contentWidth) / canvas.width
    if (pageIndex > 0) pdf.addPage()
    pdf.addImage(
      pageCanvas.toDataURL('image/png'),
      'PNG',
      PAGE_MARGIN_MM,
      PAGE_MARGIN_MM,
      contentWidth,
      sliceHeightMm,
    )

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

  const captureResumeCanvas = async () => {
    const element = resumeRef.current
    if (!element) return null

    const resumePage = element.querySelector('.resume-page') as HTMLElement | null
    const target = resumePage ?? element

    target.classList.add('resume-capture-compact')
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))

    try {
      return await html2canvas(target, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        width: target.scrollWidth,
        height: target.scrollHeight,
        windowWidth: target.scrollWidth,
        windowHeight: target.scrollHeight,
      })
    } finally {
      target.classList.remove('resume-capture-compact')
    }
  }

  const downloadPdf = async () => {
    const canvas = await captureResumeCanvas()
    if (!canvas) return

    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
    sliceCanvasToPdf(canvas, pdf)
    pdf.save('resume.pdf')
  }

  const downloadPdfPrint = () => {
    handlePrint()
  }

  const downloadPng = async () => {
    const canvas = await captureResumeCanvas()
    if (!canvas) return

    const link = document.createElement('a')
    link.download = 'resume.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return { downloadPdf, downloadPdfPrint, downloadPng }
}
