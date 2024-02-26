import { TableHead, TableRow } from '@mui/material'

import { StyledTableCell } from '../../../components'

export const Header = () => {
  return (
    <TableHead>
      <TableRow>
        <StyledTableCell rowSpan={2} sx={{ width: '4%' }}>
          Номер
        </StyledTableCell>
        <StyledTableCell rowSpan={2}>Имя</StyledTableCell>
        <StyledTableCell colSpan={3} align="center">
          Рывок
        </StyledTableCell>
        <StyledTableCell colSpan={3} align="center">
          Толчок
        </StyledTableCell>
        <StyledTableCell rowSpan={2} align="center" sx={{ width: '5%' }}>
          Сумма
        </StyledTableCell>
      </TableRow>
      <TableRow>
        <StyledTableCell align="center" sx={{ width: '5%', maxWidth: '5%' }}>
          l
        </StyledTableCell>
        <StyledTableCell align="center" sx={{ width: '5%', maxWidth: '5%' }}>
          ll
        </StyledTableCell>
        <StyledTableCell align="center" sx={{ width: '5%', maxWidth: '5%' }}>
          lll
        </StyledTableCell>
        <StyledTableCell align="center" sx={{ width: '5%', maxWidth: '5%' }}>
          l
        </StyledTableCell>
        <StyledTableCell align="center" sx={{ width: '5%', maxWidth: '5%' }}>
          ll
        </StyledTableCell>
        <StyledTableCell align="center" sx={{ width: '5%', maxWidth: '5%' }}>
          lll
        </StyledTableCell>
      </TableRow>
    </TableHead>
  )
}
