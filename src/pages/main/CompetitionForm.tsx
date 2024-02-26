import { FC } from 'react'

import { Grid, TextField } from '@mui/material'
// eslint-disable-next-line import/named
import { FormApi } from 'final-form'
import { Field, Form } from 'react-final-form'

import { CompetitionFormValues } from '../../stores/Competitions'

type Props = {
  form: FormApi<CompetitionFormValues>
  submit(payload: object): void
}

export const CompetitionForm: FC<Props> = ({ form, submit }) => {
  return (
    <Form
      form={form}
      onSubmit={submit}
      render={({ handleSubmit }) => (
        <Grid component="form" container spacing={3} onSubmit={handleSubmit}>
          <Grid item xs={12}>
            <Field name="title">
              {({ input }) => <TextField {...input} fullWidth label="Имя" size="small" />}
            </Field>
          </Grid>
        </Grid>
      )}
    />
  )
}
