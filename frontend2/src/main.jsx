import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { MainApp } from './front.jsx'




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainApp/>

  </StrictMode>,
)
