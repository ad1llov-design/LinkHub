import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'next-themes'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        value={{ light: 'light-theme', dark: 'dark' }}
      >
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
