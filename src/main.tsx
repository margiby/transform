import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import 'bulma/css/bulma.min.css'
import './styles/index.css'
import './styles/loadingSpinner.css'
import './styles/skeleton.css'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)