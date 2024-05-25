import { FC } from 'react'

import { Button, Tooltip } from '@mui/material'

type Props = {
  disabled: boolean
  isRunning: boolean
  onStart(): void
  onStop(): void
}

export const StartStopBtn: FC<Props> = ({ disabled, isRunning, onStart, onStop }) => {
  const title = isRunning ? 'Пауза' : 'Начать'
  const tooltipTitle = isRunning ? 'Ctrl+q' : 'Ctrl+Enter'
  const action = isRunning ? onStop : onStart

  return (
    <Tooltip title={tooltipTitle}>
      <Button
        disabled={disabled}
        onClick={action}
        color="primary"
        variant="outlined"
        sx={{ minWidth: '120px' }}
      >
        {title}
      </Button>
    </Tooltip>
  )
}
