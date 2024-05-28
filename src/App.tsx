import { CssBaseline, ThemeProvider } from '@mui/material'
import { SnackbarProvider } from 'notistack'
import { BrowserRouter } from 'react-router-dom'
import { YMInitializer } from 'react-yandex-metrika'

import { Router } from './lib/Router'
import { lightTheme } from './lib/thems'

import './App.css'

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <YMInitializer accounts={[96580340]} options={{ webvisor: true }} />
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
