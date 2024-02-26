import { useMemo } from 'react'

import { MainPageContext } from './context'
import { View } from './View'
import { CompetitionsStore } from '../../stores'

export const MainPage = () => {
  const store = useMemo(() => new CompetitionsStore(), [])

  return (
    <MainPageContext.Provider value={{ store }}>
      <View store={store} />
    </MainPageContext.Provider>
  )
}
