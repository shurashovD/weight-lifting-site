import { useEffect } from 'react'

import { PartsStore } from '../stores'

export const useKeyDown = (store: PartsStore) => {
  useEffect(() => {
    function handler(event: KeyboardEvent) {
      if (event.ctrlKey) {
        if (event.key === 'Enter') {
          store.run()
        }

        if (event.key === 'q' || event.key === 'й') {
          store.stop()
        }
      } else {
        if (event.key === '+') {
          store.goodLift()
        }

        if (event.key === '-') {
          store.noLift()
        }
      }
    }

    document.addEventListener('keydown', handler)

    return () => {
      document.removeEventListener('keydown', handler)
    }
  }, [store])
}
