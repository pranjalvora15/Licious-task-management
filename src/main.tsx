import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'


try {
  const stored = localStorage.getItem('ui-store')
  if (stored) {
    const { state } = JSON.parse(stored)
    if (state?.theme === 'dark') {
      document.documentElement.classList.add('dark')
    }
  }
} catch {
  console.error('failed to access ui-store')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
