const MM_TO_PX = 96 / 25.4

export function getPdfPageContentHeightPx(pageHeightMm: number, marginMm: number) {
  return (pageHeightMm - marginMm * 2) * MM_TO_PX
}

/** Push sections to the next PDF page when they would be awkwardly split. */
export function alignSectionsForPdfCapture(
  root: HTMLElement,
  pageContentHeightPx: number,
): () => void {
  const adjusted: HTMLElement[] = []
  const sections = Array.from(root.querySelectorAll<HTMLElement>('.resume-section'))

  const measure = () => {
    const rootRect = root.getBoundingClientRect()
    for (const section of sections) {
      if (adjusted.includes(section)) continue

      const rect = section.getBoundingClientRect()
      const top = rect.top - rootRect.top
      const height = rect.height
      const pageIndex = Math.floor(top / pageContentHeightPx)
      const offsetOnPage = top - pageIndex * pageContentHeightPx
      const spaceRemaining = pageContentHeightPx - offsetOnPage
      const tooTallForOnePage = height > pageContentHeightPx * 0.92
      const awkwardSplit =
        height > spaceRemaining &&
        spaceRemaining < pageContentHeightPx * 0.45 &&
        !tooTallForOnePage

      if (awkwardSplit) {
        section.style.marginTop = `${spaceRemaining + 6}px`
        adjusted.push(section)
      }
    }
  }

  measure()
  measure()

  return () => {
    for (const section of adjusted) {
      section.style.marginTop = ''
    }
  }
}
