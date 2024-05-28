import { useContext } from 'react'

import { Box, Button, Grid, Tooltip } from '@mui/material'
import { observer } from 'mobx-react-lite'

import { StartStopBtn } from './StartStopBtn'
import { Context } from '../context'

export const BottomMenu = observer(() => {
  const { store } = useContext(Context)!

  return (
    <Box position="fixed" bottom={0} left={0} width="100%" display="flex" p={1}>
      <Grid container spacing={1}>
        <Grid item xs="auto">
          <StartStopBtn
            disabled={!store.items.length}
            isRunning={store.mode === 'RUN'}
            onStart={store.run}
            onStop={store.stop}
          />
        </Grid>
        <Grid item xs="auto">
          <Tooltip title="+">
            <span>
              <Button
                disabled={!store.currentItem}
                onClick={store.goodLift}
                color="primary"
                variant="outlined"
                sx={{ minWidth: '110px' }}
              >
                Защитан
              </Button>
            </span>
          </Tooltip>
        </Grid>
        <Grid item xs="auto">
          <Tooltip title="-">
            <span>
              <Button
                disabled={!store.currentItem}
                onClick={store.noLift}
                color="primary"
                variant="outlined"
                sx={{ minWidth: '110px' }}
              >
                Неудачный
              </Button>
            </span>
          </Tooltip>
        </Grid>
        <Grid item xs="auto" ml="auto">
          <Button onClick={store.showDrawer} color="primary" variant="outlined">
            Добавить участника
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
})
