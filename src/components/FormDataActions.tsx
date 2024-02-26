import { FC } from 'react'

import { Close, Delete, Save } from '@mui/icons-material'
import { Button, Grid } from '@mui/material'

type Props = {
  hide(): void
  remove?(): void
  submit(payload: object): void
}

export const FormDataActions: FC<Props> = ({ hide, submit, remove }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg="auto" textAlign="end" alignSelf={'center'}>
        <Button startIcon={<Save />} variant="contained" onClick={submit}>
          Сохранить
        </Button>
      </Grid>
      <Grid item xs={12} lg="auto" textAlign="end" alignSelf={'center'} ml="auto">
        <Button startIcon={<Close />} onClick={hide} variant="outlined">
          Скрыть
        </Button>
      </Grid>
      {remove && (
        <Grid item xs={12} lg="auto" textAlign="end" alignSelf={'center'} ml="auto">
          <Button startIcon={<Delete />} onClick={remove} variant="outlined" color="secondary">
            Удалить
          </Button>
        </Grid>
      )}
    </Grid>
  )
}
