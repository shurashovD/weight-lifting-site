export type AttStatus = 'CANCELED' | 'PENDING' | 'SUCCEDED' | 'WRONGED'

export type NoteBase = {
  name: string
  number: number
  isWoomen: boolean
  weight: number | null
  birth: number | null
  teams: string[]
}

export type NoteFormFields = {
  name: string
  isWoomen: boolean
  weight: string
  birth: string
  teams: string[]
  jerk: string
  snatch: string
}

export type AddNotePayload = {
  id?: string | number
  jerk: AddAttPayload[]
  snatch: AddAttPayload[]
} & NoteBase

export type AddAttPayload = {
  bets: (string | number | undefined | null)[]
  status: AttStatus
}

export type ItemAtt = {
  readonly value: string
  readonly isSucceded?: true
  readonly isWronged?: true
}

export type IndexedDBItemBase = {
  id: number | string
  createdIDB: number
  updatedIDB: number | null
}

export type IndexedDBItemAdd<Item extends IndexedDBItemBase> = Omit<
  Item,
  'createdIDB' | 'updatedIDB'
>

export type IndexedDBItemUpd<Item extends IndexedDBItemBase> = IndexedDBItemAdd<Item>

export type NoteIDBItem = Omit<NoteBase, 'teams'> & {
  snatch: string
  jerk: string
  teams: string
} & IndexedDBItemBase
