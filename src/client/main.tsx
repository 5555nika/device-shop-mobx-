import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { StoreProvider } from './context.tsx'




createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <StoreProvider>
  <BrowserRouter>
    <App /> 
  </BrowserRouter>
  </StoreProvider>
  </StrictMode>,
)
