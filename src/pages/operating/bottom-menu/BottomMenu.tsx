import { useContext } from 'react'

import { Add } from '@mui/icons-material'
import { Box, Button, IconButton, Stack, Tooltip } from '@mui/material'
import { observer } from 'mobx-react-lite'

import { StartStopBtn } from './StartStopBtn'
import { Context } from '../context'

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
        <Tooltip title="+">
          <span>
            <Button
              disabled={!store.currentItem}
              onClick={store.goodLift}
              color="primary"
              variant="outlined"
              sx={{ minWidth: '120px' }}
            >
              Защитан
            </Button>
          </span>
        </Tooltip>
        <Tooltip title="-">
          <span>
            <Button
              disabled={!store.currentItem}
              onClick={store.noLift}
              color="primary"
              variant="outlined"
              sx={{ minWidth: '120px' }}
            >
              Неудачный
            </Button>
          </span>
        </Tooltip>
      </Stack>
      <IconButton onClick={store.showDrawer} color="primary" sx={{ ml: 'auto' }}>
        <Add />
      </IconButton>
    </Box>
  )
})
