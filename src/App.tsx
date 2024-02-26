import { CssBaseline, ThemeProvider } from '@mui/material'
import { SnackbarProvider } from 'notistack'
import { BrowserRouter } from 'react-router-dom'

import { Router } from './lib/Router'
import { lightTheme } from './lib/thems'

import './App.css'

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <h1>123</h1>
      <CssBaseline />
      <section>
        <BrowserRouter>
          <SnackbarProvider>
            <Router />
          </SnackbarProvider>
        </BrowserRouter>
      </section>
    </ThemeProvider>
  )
}

export default App
