import { useContext } from 'react'

import { Paper, Table, TableBody, TableContainer, styled, tableClasses } from '@mui/material'
import { observer } from 'mobx-react-lite'

import { Header } from './Header'
import { Row } from './Row'
import { useKeyDown } from '../../../hooks/keyDown.hook'
import { Note } from '../../../lib/core'
import { Context } from '../context'

const StyledTable = styled(Table)(({ theme }) => ({
  [`&.${tableClasses.root}`]: {
    border: `2px solid ${theme.palette.grey[800]}`,
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
  },
}))

export const PartsList = observer(() => {
  const { store } = useContext(Context)!

  useKeyDown(store)

  return (
    <TableContainer component={Paper} sx={{ minHeight: '100vh', p: 1 }}>
      <StyledTable>
        <Header />
        <TableBody>
          {store.items.map((item: Note) => (
            <Row key={item.id} participant={item} />
          ))}
        </TableBody>
      </StyledTable>
    </TableContainer>
  )
})
