import { FC, useState, MouseEvent, useCallback } from 'react'

import { List, ListItemButton, Popover } from '@mui/material'

import { StyledTableCell } from '../../../components'

type Props = {
  handleEdit(): void
  handleRun(): void
  selected?: boolean
  value: string
}

export const NameCell: FC<Props> = ({ handleEdit, handleRun, selected, value }) => {
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<HTMLTableCellElement | null>(null)

  const contextMenuHnadler = (event: MouseEvent<HTMLTableCellElement>) => {
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

  return (
    <StyledTableCell
      className="right-border"
      sx={({ palette }) => ({
        paddingTop: 1,
        paddingBottom: 1,
        bgcolor: selected ? palette.primary.dark : 'transparent',
        color: selected ? palette.background.paper : palette.text.primary,
        cursor: 'pointer',
      })}
      onDoubleClick={handleEdit}
      onContextMenu={contextMenuHnadler}
    >
      {value}
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
          <ListItemButton onClick={() => contextHandler(handleRun)}>Ручной вызов</ListItemButton>
        </List>
      </Popover>
    </StyledTableCell>
  )
}
