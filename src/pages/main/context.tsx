import { createContext } from 'react'

import { CompetitionsStore } from '../../stores'

export const MainPageContext = createContext<{ store: CompetitionsStore | null }>({
  store: null,
})
