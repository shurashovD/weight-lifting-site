import { TableCell, styled, tableCellClasses } from '@mui/material'

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    border: `2px solid ${theme.palette.grey[800]}`,
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
  },
  ['&.right-border']: {
    borderRight: `2px solid ${theme.palette.grey[800]}`,
  },
}))
