import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppGate } from './components/AppGate'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppGate>
      <App />
    </AppGate>
  </StrictMode>,
)
