import { FC, useCallback, useContext } from 'react'

import { TableRow } from '@mui/material'
import { observer } from 'mobx-react-lite'

import { AttCell } from './AttCell'
import { NameCell } from './NameCell'
import { NumberCell } from './NumberCell'
import { StyledTableCell } from '../../../components'
import { Note } from '../../../lib/core'
import { Context } from '../context'

type Props = {
  participant: Note
}

export const Row: FC<Props> = observer(({ participant }) => {
  const { store } = useContext(Context)!
  const { isCurrent, isReady, name, number } = participant

  const handleEdit = useCallback(() => {
    store.editNote(participant.id)
  }, [participant, store])

  return (
    <TableRow key={participant.id}>
      <NumberCell selected={isReady} value={number.toString()} />
      <NameCell
        handleEdit={handleEdit}
        handleRun={() => store.manualRun(participant)}
        selected={isCurrent}
        value={name}
      />
      <AttCell attempt={participant.snatch[0]} />
      <AttCell attempt={participant.snatch[1]} />
      <AttCell attempt={participant.snatch[2]} />
      <AttCell attempt={participant.jerk[0]} />
      <AttCell attempt={participant.jerk[1]} />
      <AttCell attempt={participant.jerk[2]} />
      <StyledTableCell
        align="center"
        className="right-border"
        sx={{ paddingTop: 1, paddingBottom: 1, fontSize: '18px' }}
      >
        {participant.amount}
      </StyledTableCell>
    </TableRow>
  )
})
