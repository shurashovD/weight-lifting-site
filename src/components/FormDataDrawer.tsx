import { FC, ReactNode } from 'react'

import { Box, Drawer } from '@mui/material'

import { FormDataActions } from './FormDataActions'

type Props = {
  children: ReactNode
  hide(): void
  open: boolean
  submit(): void
}

export const FormDataDrawer: FC<Props> = ({ children, hide, open, submit }) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      PaperProps={{
        sx: {
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          maxHeight: '100vh',
          maxWidth: '660px',
          paddingTop: '85px',
        },
      }}
    >
      <Box flexGrow={1} sx={{ overflowX: 'scroll' }} p={5} pt={0}>
        {children}
      </Box>
      <Box
        p={5}
        py={3}
        sx={({ palette }) => ({ boxShadow: `0px -3px 5px ${palette.grey['300']}` })}
      >
        <FormDataActions hide={hide} submit={submit} />
      </Box>
    </Drawer>
  )
}
