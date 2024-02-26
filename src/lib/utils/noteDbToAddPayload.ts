import { AddAttPayload, AddNotePayload, NoteIDBItem } from '../core/types'

export function noteDbToAddPayload(data: NoteIDBItem): AddNotePayload {
  const birth = null
  const { id, isWoomen, name, number } = data

  const jerk = JSON.parse(data.jerk) as AddAttPayload[]
  const snatch = JSON.parse(data.snatch) as AddAttPayload[]

  let teams = []

  try {
    teams = JSON.parse(data.teams)
  } catch (e) {
    /* empty */
  }

  const weight = null

  return {
    birth,
    id,
    isWoomen,
    jerk,
    name,
    number,
    snatch,
    teams,
    weight,
  }
}
