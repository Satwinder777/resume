# Resume Builder

A free, fully static resume builder — similar to BetterCV — built with React, Vite, and Tailwind CSS. No backend, no signup. Your resume data is saved locally in your browser.

**Live site:** [https://satwinder777.github.io/resume](https://satwinder777.github.io/resume)

## Features

- **33 resume templates** — matching BetterCV categories: Simple, Modern, One Column, With Photo, Professional, ATS
- **3-step flow** — Choose template → Enter details → Download
- **Live preview** — See your resume update as you type
- **Autosave** — Progress saved to `localStorage` automatically
- **PDF & PNG export** — Print-to-PDF for selectable text; PNG via html2canvas
- **Drag-and-drop** — Reorder resume sections
- **GitHub Pages ready** — Deploys to `/resume/` subdirectory

## Tech Stack

- React 19 + Vite + TypeScript
- Tailwind CSS v4
- React Router (basename: `/resume`)
- react-to-print (PDF via browser print)
- html2canvas + jsPDF (PNG export)
- localStorage for persistence

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173/resume/)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deploy to GitHub Pages

### Option 1: npm script (gh-pages)

```bash
npm run deploy
```

This builds the app and publishes the `dist` folder to the `gh-pages` branch.

### Option 2: GitHub Actions

Push to `main` — the workflow in `.github/workflows/deploy.yml` builds and deploys automatically.

**Important:** In your GitHub repo settings → Pages, set the source to **GitHub Actions** (for the workflow) or **Deploy from branch: gh-pages / root** (for the npm script).

## Project Structure

```
src/
├── components/
│   ├── form/           # Form sections (personal info, experience, etc.)
│   ├── templates/      # Resume template components (6 layouts)
│   ├── Layout.tsx
│   ├── ResumePreview.tsx
│   └── StepIndicator.tsx
├── context/
│   └── ResumeContext.tsx   # Global state + localStorage autosave
├── pages/
│   ├── LandingPage.tsx
│   ├── TemplatesPage.tsx
│   ├── EditPage.tsx
│   └── PreviewPage.tsx
├── types/
│   └── resume.ts       # ResumeData interface
└── utils/
    ├── defaults.ts
    ├── export.ts
    ├── storage.ts
    └── templates.ts
```

## Architecture

All templates accept the same `ResumeData` object as props. Switching templates never loses entered data — the data model is completely separate from template rendering.

State is persisted under the key `resume-builder-state` in localStorage.

## License

MIT
