import { FC, useContext } from 'react'

import { Add } from '@mui/icons-material'
import { Box, Button, IconButton, Stack } from '@mui/material'
import { observer } from 'mobx-react-lite'

import { Context } from './context'

type Props = {
  disabled: boolean
  isRunning: boolean
  onStart(): void
  onStop(): void
}

const StartStopBtn: FC<Props> = ({ disabled, isRunning, onStart, onStop }) => {
  const title = isRunning ? 'Пауза' : 'Начать'
  const action = isRunning ? onStop : onStart

  return (
    <Button
      disabled={disabled}
      onClick={action}
      color="primary"
      variant="outlined"
      sx={{ minWidth: '120px' }}
    >
      {title}
    </Button>
  )
}

export const BottomMenu = observer(() => {
  const { store } = useContext(Context)!

  return (
    <Box position="fixed" bottom={0} left={0} right={0} display="flex" p={1}>
      <Stack direction={'row'} spacing={3}>
        <StartStopBtn
          disabled={!store.items.length}
          isRunning={store.mode === 'RUN'}
          onStart={store.run}
          onStop={store.stop}
        />
        <Button
          disabled={!store.currentItem}
          onClick={store.goodLift}
          color="primary"
          variant="outlined"
          sx={{ minWidth: '120px' }}
        >
          Защитан
        </Button>
        <Button
          disabled={!store.currentItem}
          onClick={store.noLift}
          color="primary"
          variant="outlined"
          sx={{ minWidth: '120px' }}
        >
          Неудачный
        </Button>
      </Stack>
      <IconButton onClick={store.showDrawer} color="primary" sx={{ ml: 'auto' }}>
        <Add />
      </IconButton>
    </Box>
  )
})
