import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App.tsx'

import('react-scan').then(({ scan }) => {
  scan({
    enabled: true,
    log: true,
    showToolbar: true,
  })
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
