import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/hind-siliguri/bengali-400.css'
import '@fontsource/hind-siliguri/latin-400.css'
import '@fontsource/hind-siliguri/bengali-500.css'
import '@fontsource/hind-siliguri/latin-500.css'
import '@fontsource/hind-siliguri/bengali-600.css'
import '@fontsource/hind-siliguri/latin-600.css'
import '@fontsource/hind-siliguri/bengali-700.css'
import '@fontsource/hind-siliguri/latin-700.css'
import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-600.css'
import '@fontsource/inter/latin-700.css'
import './base.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
