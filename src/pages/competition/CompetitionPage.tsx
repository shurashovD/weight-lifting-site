import { ThemeProvider } from '@mui/material'

import { darkTheme } from '../../lib/thems'

export const CompetitionPage = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <h1>Соревнования</h1>
    </ThemeProvider>
  )
}
