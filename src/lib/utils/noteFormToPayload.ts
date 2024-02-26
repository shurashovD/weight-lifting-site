import { AddAttPayload, AddNotePayload, NoteFormFields } from '../core/types'

export function noteFormToPayload(data: NoteFormFields): Omit<AddNotePayload, 'number'> {
  const birth = null
  const { isWoomen, name, teams } = data

  const jerk: AddAttPayload[] = [
    { bets: [data.jerk], status: 'PENDING' },
    { bets: [], status: 'PENDING' },
    { bets: [], status: 'PENDING' },
  ]

  const snatch: AddAttPayload[] = [
    { bets: [data.snatch], status: 'PENDING' },
    { bets: [], status: 'PENDING' },
    { bets: [], status: 'PENDING' },
  ]

  const weight = null

  return {
    birth,
    isWoomen,
    jerk,
    name,
    snatch,
    teams,
    weight,
  }
}
