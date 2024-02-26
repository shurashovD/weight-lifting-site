import { FC } from 'react'

import { StyledTableCell } from '../../../components'

type Props = {
  selected?: boolean
  value: string
}

export const NumberCell: FC<Props> = ({ selected, value }) => {
  return (
    <StyledTableCell
      align="center"
      className="right-border"
      sx={({ palette }) => ({
        paddingTop: 1,
        paddingBottom: 1,
        bgcolor: selected ? palette.primary.dark : 'transparent',
        color: selected ? palette.background.paper : palette.text.primary,
        cursor: 'pointer',
      })}
      onDoubleClick={() => {}}
    >
      {value}
    </StyledTableCell>
  )
}
