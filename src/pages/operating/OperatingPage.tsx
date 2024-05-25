import { useMemo } from 'react'

import { ThemeProvider } from '@mui/material'

import { BottomMenu } from './bottom-menu/BottomMenu'
import { Context } from './context'
import { ItemDrawer } from './ItemDrawer'
import { PartsList } from './parts-list/PartsList'
import { NoteIndexedDBService } from '../../lib/core'
import { darkTheme } from '../../lib/thems'
import { PartsStore } from '../../stores'

export const OperatingPage = () => {
  const service = useMemo(() => new NoteIndexedDBService(), [])
  const store = useMemo(() => new PartsStore(service), [service])

  return (
    <ThemeProvider theme={darkTheme}>
      <Context.Provider value={{ store }}>
        <ItemDrawer />
        <PartsList />
        <BottomMenu />
      </Context.Provider>
    </ThemeProvider>
  )
}
