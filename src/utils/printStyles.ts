/** Shared print CSS for browser PDF export (react-to-print iframe). */
export const RESUME_PRINT_PAGE_STYLE = `
  @page {
    size: A4 portrait;
    margin: 0;
  }

  html, body {
    margin: 0 !important;
    padding: 0 !important;
    background: white !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  .resume-page {
    box-shadow: none !important;
    width: 210mm !important;
    max-width: 210mm !important;
    min-height: auto !important;
    margin: 0 !important;
    padding: 9mm 11mm !important;
    overflow: visible !important;
    page-break-after: auto !important;
    break-after: auto !important;
    page-break-inside: auto;
    break-inside: auto;
  }

  .resume-page.flex {
    display: flex !important;
    align-items: stretch !important;
  }

  .resume-page.flex > aside {
    min-height: auto !important;
    align-self: stretch !important;
  }

  .resume-section {
    margin-bottom: 0.65rem !important;
    break-inside: avoid;
    page-break-inside: avoid;
  }

  .resume-entry {
    margin-bottom: 0.5rem !important;
    break-inside: avoid;
    page-break-inside: avoid;
  }

  .resume-entry:last-child {
    margin-bottom: 0 !important;
  }

  ul, ol {
    margin-top: 0.15rem !important;
    margin-bottom: 0 !important;
    padding-left: 1rem !important;
  }

  li {
    margin-bottom: 0.1rem !important;
    line-height: 1.35 !important;
  }

  p {
    orphans: 3;
    widows: 3;
  }
`
