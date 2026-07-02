import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ResumeProvider } from './context/ResumeContext'
import { ThemeProvider } from './context/ThemeContext'
import { EditPage } from './pages/EditPage'
import { LandingPage } from './pages/LandingPage'
import { PreviewPage } from './pages/PreviewPage'
import { TemplatesPage } from './pages/TemplatesPage'

export default function App() {
  return (
    <ThemeProvider>
      <ResumeProvider>
        <BrowserRouter basename="/resume">
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<LandingPage />} />
              <Route path="templates" element={<TemplatesPage />} />
              <Route path="templates/:category" element={<TemplatesPage />} />
              <Route path="edit" element={<EditPage />} />
              <Route path="preview" element={<PreviewPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ResumeProvider>
    </ThemeProvider>
  )
}
