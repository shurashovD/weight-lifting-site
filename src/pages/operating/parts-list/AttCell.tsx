import {
  ChangeEvent,
  FC,
  KeyboardEventHandler,
  useState,
  MouseEvent,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from 'react'

import { Divider, List, ListItemButton, Popover } from '@mui/material'
import { observer } from 'mobx-react-lite'

import { StyledTableCell } from '../../../components'
import { Attempt } from '../../../lib/core'

type Props = {
  attempt: Attempt
}

export const AttCell: FC<Props> = observer(({ attempt }) => {
  const [state, setState] = useState(attempt.value)
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<HTMLInputElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const backgroundColor = useMemo(() => {
    if (attempt.isSucceded) {
      return '#30C030'
    }

    if (attempt.isWronged) {
      return '#C03030'
    }

    return 'transparent'
  }, [attempt.isSucceded, attempt.isWronged])

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (+event.target.value !== 0 && !isNaN(+event.target.value)) {
      setState(event.target.value.replace(' ', ''))
    }

    if (event.target.value === '') {
      setState('')
    }
  }

  const contextMenuHnadler = (event: MouseEvent<HTMLInputElement>) => {
    event.preventDefault()
    setAnchorEl(event.currentTarget)
    setOpen(true)
  }

  const contextHandler = useCallback(
    (action: () => void) => {
      action()
      setOpen(false)
      anchorEl?.blur()
    },
    [anchorEl],
  )

  const blurHandler = useCallback(() => {
    attempt.setBet(state)
  }, [attempt, state])

  const keyHandler: KeyboardEventHandler = useCallback(event => {
    if (event.key === 'Enter') {
      inputRef.current?.blur()
    }
  }, [])

  useEffect(() => {
    setState(attempt.value)
  }, [attempt.value])

  return (
    <StyledTableCell
      sx={{
        p: 0,
        width: '5%',
        maxWidth: '5%',
        paddingBottom: 0,
        paddingTop: 0,
        backgroundColor,
      }}
      className="right-border"
    >
      <input
        disabled={attempt.isSucceded || attempt.isWronged}
        onBlur={blurHandler}
        onChange={changeHandler}
        onContextMenu={contextMenuHnadler}
        onKeyDown={keyHandler}
        ref={inputRef}
        style={{
          backgroundColor: 'transparent',
          border: 0,
          color: 'white',
          height: '100%',
          fontSize: '18px',
          width: '100%',
          minWidth: 0,
          outline: 0,
          textAlign: 'center',
        }}
        value={state}
      />
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setOpen(false)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <List>
          <ListItemButton onClick={() => contextHandler(attempt.onSuccess)}>Защитан</ListItemButton>
          <ListItemButton onClick={() => contextHandler(attempt.onWrong)}>Неудачный</ListItemButton>
          <ListItemButton onClick={() => contextHandler(attempt.onCancell)}>Отказ</ListItemButton>
          <Divider />
          <ListItemButton onClick={() => contextHandler(attempt.onPending)}>
            Нет оценки
          </ListItemButton>
        </List>
      </Popover>
    </StyledTableCell>
  )
})
