import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // Đảm bảo dòng này có
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
