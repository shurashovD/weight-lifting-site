import { useContext } from 'react'

import { Delete } from '@mui/icons-material'
import { Button, Box, Drawer, Grid, TextField } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { Field, Form } from 'react-final-form'

import { Context } from './context'

export const ItemDrawer = observer(() => {
  const { store } = useContext(Context)!

  return (
    <Drawer anchor="bottom" open={store.isOpen}>
      <Box p={5}>
        <Form
          form={store.form}
          onSubmit={store.submit}
          render={({ handleSubmit }) => (
            <Grid component="form" container spacing={3} onSubmit={handleSubmit}>
              <Grid item xs={12} lg={3}>
                <Field name="name">
                  {({ input }) => <TextField {...input} fullWidth label="Имя" size="small" />}
                </Field>
              </Grid>
              <Grid item xs={12} lg={1}>
                <TextField fullWidth label="Вес" size="small" />
              </Grid>
              {!store.isEditing && (
                <Grid item xs={12} lg={1}>
                  <Field name="snatch">
                    {({ input }) => <TextField {...input} label="Рывок" size="small" />}
                  </Field>
                </Grid>
              )}
              {!store.isEditing && (
                <Grid item xs={12} lg={1}>
                  <Field name="jerk">
                    {({ input }) => <TextField {...input} label="Толчок" size="small" />}
                  </Field>
                </Grid>
              )}
              <Grid item xs={12} lg="auto" textAlign="end" alignSelf={'center'}>
                <Button variant="contained" type="submit">
                  Сохранить
                </Button>
              </Grid>
              {store.isEditing && (
                <Grid item xs={12} lg="auto" textAlign="end" alignSelf={'center'} ml="auto">
                  <Button
                    startIcon={<Delete />}
                    onClick={store.removeEditingNote}
                    variant="outlined"
                  >
                    Удалить
                  </Button>
                </Grid>
              )}
              <Grid item xs={12} lg="auto" textAlign="end" alignSelf={'center'} ml="auto">
                <Button onClick={store.closeDrawer} variant="outlined">
                  Скрыть
                </Button>
              </Grid>
            </Grid>
          )}
        ></Form>
      </Box>
    </Drawer>
  )
})
