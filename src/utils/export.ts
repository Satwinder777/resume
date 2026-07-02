import { useReactToPrint } from 'react-to-print'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

export function useResumeExport(resumeRef: React.RefObject<HTMLDivElement | null>) {
  const handlePrint = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: 'Resume',
    pageStyle: `
      @page { size: A4; margin: 0; }
      @media print {
        body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      }
    `,
  })

  const downloadPdf = () => {
    handlePrint()
  }

  const downloadPng = async () => {
    const element = resumeRef.current
    if (!element) return

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      width: element.scrollWidth,
      height: element.scrollHeight,
    })

    const link = document.createElement('a')
    link.download = 'resume.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  const downloadPdfRaster = async () => {
    const element = resumeRef.current
    if (!element) return

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      width: element.scrollWidth,
      height: element.scrollHeight,
    })

    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
    const pageWidth = 210
    const pageHeight = 297
    const imgWidth = pageWidth
    const imgHeight = (canvas.height * pageWidth) / canvas.width

    let heightLeft = imgHeight
    let position = 0

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight

    while (heightLeft > 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }

    pdf.save('resume.pdf')
  }

  return { downloadPdf, downloadPng, downloadPdfRaster }
}
