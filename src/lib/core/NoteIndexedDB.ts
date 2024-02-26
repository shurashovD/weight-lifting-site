import { Note } from '.'
import { IndexedDBBase } from './IndexedDBBase'
import { NoteIDBItem } from './types'

export class NoteIndexedDBService extends IndexedDBBase<NoteIDBItem> {
  constructor() {
    super('Notes')
  }

  public create(payload: Note) {
    const { birth, id, isWoomen, name, number, weight } = payload
    const jerk = JSON.stringify(payload.jerk.map(({ bets, status }) => ({ bets, status })))
    const snatch = JSON.stringify(payload.snatch.map(({ bets, status }) => ({ bets, status })))
    const teams = JSON.stringify(payload.teams)

    this._insertOne({ birth, id, isWoomen, name, number, teams, weight, jerk, snatch })
  }

  public async getByStream() {
    return await this._getMany()
  }

  public async update(payload: Note) {
    const { birth, id, isWoomen, name, number, weight } = payload
    const jerk = JSON.stringify(payload.jerk.map(({ bets, status }) => ({ bets, status })))
    const snatch = JSON.stringify(payload.snatch.map(({ bets, status }) => ({ bets, status })))
    const teams = JSON.stringify(payload.teams)

    this._updateOne({ birth, id, isWoomen, name, number, teams, weight, jerk, snatch })
  }

  public async delete(id: string | number) {
    this._deleteOne(id)
  }
}
