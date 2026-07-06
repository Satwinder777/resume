/** Shared print CSS for browser PDF export (react-to-print iframe). */
export const RESUME_PRINT_PAGE_STYLE = `
  @page {
    size: A4 portrait;
    margin: 7mm 8mm;
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
    width: 100% !important;
    max-width: 100% !important;
    min-height: auto !important;
    margin: 0 !important;
    padding: 0 !important;
    overflow: visible !important;
    font-size: 9.5pt !important;
    line-height: 1.28 !important;
    page-break-after: auto !important;
    break-after: auto !important;
  }

  .resume-page header {
    margin-bottom: 0.35rem !important;
    padding-bottom: 0.2rem !important;
  }

  .resume-page h1,
  .resume-page .text-3xl {
    font-size: 15pt !important;
    line-height: 1.15 !important;
    margin-bottom: 0.1rem !important;
  }

  .resume-page .text-base {
    font-size: 10pt !important;
  }

  .resume-page .text-sm {
    font-size: 9.5pt !important;
    line-height: 1.28 !important;
  }

  .resume-page .text-xs {
    font-size: 8.5pt !important;
    line-height: 1.25 !important;
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
    margin-bottom: 0.3rem !important;
    break-inside: auto !important;
    page-break-inside: auto !important;
  }

  .resume-section-heading {
    break-after: avoid !important;
    page-break-after: avoid !important;
    margin-bottom: 0.12rem !important;
  }

  .resume-job-header {
    break-inside: avoid !important;
    page-break-inside: avoid !important;
    break-after: avoid !important;
    page-break-after: avoid !important;
  }

  .resume-entry {
    margin-bottom: 0.28rem !important;
    break-inside: auto !important;
    page-break-inside: auto !important;
  }

  .resume-entry:last-child {
    margin-bottom: 0 !important;
  }

  .resume-project {
    break-inside: avoid !important;
    page-break-inside: avoid !important;
    margin-bottom: 0.25rem !important;
  }

  ul, ol {
    margin-top: 0.08rem !important;
    margin-bottom: 0 !important;
    padding-left: 0.9rem !important;
  }

  li {
    margin-bottom: 0.05rem !important;
    line-height: 1.26 !important;
  }

  p {
    orphans: 2;
    widows: 2;
    margin-bottom: 0.08rem !important;
  }
`
