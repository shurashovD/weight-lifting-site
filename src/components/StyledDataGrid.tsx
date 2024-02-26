import { alpha, styled } from '@mui/material/styles'
import { DataGrid, gridClasses } from '@mui/x-data-grid'

const ODD_OPACITY = 0.2

export const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 0,
  font: 'var(--font-caption-caption-reg)',
  '& .MuiDataGrid-columnHeader': {
    backgroundColor: 'var(--color-background-table-zebra)',
    lineHeight: '32px',
    height: '32px',
  },
  '& .MuiDataGrid-iconSeparator': {
    display: 'none',
  },
  '& .MuiDataGrid-cell:focus-within': {
    outline: 0,
  },
  '& .MuiDataGrid-columnHeader:focus': {
    outline: 0,
  },
  '& .MuiDataGrid-columnHeader:focus-within': {
    outline: 0,
  },
  '& .MuiPaginationItem-root': {
    borderRadius: 0,
  },
  [`& .${gridClasses.row}.odd`]: {
    '&:hover, &.Mui-hovered': {
      backgroundColor: 'var(--color-background-hover)',
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
  },
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: 'var(--color-background-table-zebra)',
    '&:hover, &.Mui-hovered': {
      backgroundColor: 'var(--color-background-hover)',
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity,
      ),
      '&:hover, &.Mui-hovered': {
        backgroundColor: 'var(--color-background-hover)',
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  },
}))
