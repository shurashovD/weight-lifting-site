import { createContext } from 'react'

import { PartsStore } from '../../stores'

type ContextType = {
  store: PartsStore
}

export const Context = createContext<ContextType | null>(null)
