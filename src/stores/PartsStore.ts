// eslint-disable-next-line import/named
import { createForm, FormApi } from 'final-form'
import { action, makeAutoObservable, runInAction } from 'mobx'

import { NoteIndexedDBService } from '../lib/core'
import { Note } from '../lib/core/Note'
import { NoteFormFields } from '../lib/core/types'
import { noteDbToAddPayload, noteFormToPayload } from '../lib/utils'

export class PartsStore {
  private readonly _indexedDBService: NoteIndexedDBService

  private _items: Note[] = []
  private _isOpen = false
  private _form?: FormApi<NoteFormFields>
  private _editedNote: Note | null = null
  private _manualItem: Note | null = null
  private _mode: 'MANUAL' | 'IDLE' | 'RUN' = 'IDLE'

  private readonly _initialValues: NoteFormFields = {
    name: '',
    jerk: '',
    snatch: '',
    isWoomen: false,
    birth: '',
    teams: [],
    weight: '',
  }

  constructor(indexedDBService: NoteIndexedDBService) {
    this._form = createForm<NoteFormFields, Partial<NoteFormFields>>({
      initialValues: this._initialValues,
      onSubmit: this.submit,
    })

    this._indexedDBService = indexedDBService

    makeAutoObservable(this)

    this._fetchFromIndexedDB()
  }

  public get currentItem(): Note | null {
    if (this._mode === 'MANUAL') {
      return this._manualItem
    }

    return this._orderedItems[0]
  }

  public get form() {
    return this._form
  }

  public get isEditing() {
    return !!this._editedNote
  }

  public get isOpen() {
    return this._isOpen
  }

  public get items() {
    return [...this._items].sort((a, b) => a.number - b.number)
  }

  public get mode() {
    return this._mode
  }

  public get readyItem(): Note | null {
    if (this.mode === 'MANUAL') {
      return null
    }

    return this._orderedItems[1]
  }

  private get _orderedItems() {
    function getFilteredItems(items: Note[]) {
      const isSnatch = items.some(({ snatchIsFinished }) => !snatchIsFinished)
      if (isSnatch) {
        return [...items]
          .filter(({ currAttBet }) => currAttBet && !isNaN(+currAttBet))
          .filter(({ snatchIsFinished }) => !snatchIsFinished)
      }

      const isJerk = !isSnatch && items.some(({ jerkIsFinished }) => !jerkIsFinished)
      if (isJerk) {
        return [...items]
          .filter(({ currAttBet }) => currAttBet && !isNaN(+currAttBet))
          .filter(({ jerkIsFinished }) => !jerkIsFinished)
      }

      return []
    }

    if (this.mode === 'IDLE') {
      return []
    }

    const filteredItems = getFilteredItems(this.items)

    return filteredItems
      .sort((a, b) => a.number - b.number)
      .sort((a, b) => b.diffPrev21 - a.diffPrev21)
      .sort((a, b) => b.diffPrev32 - a.diffPrev32)
      .sort((a, b) => a.currAttIndex - b.currAttIndex)
      .sort((a, b) => +a.currAttBet! - +b.currAttBet!)
  }

  private _autorestart() {
    const mode = this.mode
    new Promise(resolve => setTimeout(resolve, 1500)).then(() => {
      runInAction(() => {
        if (mode === 'IDLE') {
          this.run()
        }
      })
    })
  }

  public add = (payload: NoteFormFields) => {
    const number = Math.max(...this._items.map(({ number }) => +number), 0) + 1
    const data = noteFormToPayload(payload)
    const note = new Note({ ...data, number }, this)
    this._items.push(note)
    this._form?.reset()

    this._indexedDBService.create(note)
  }

  @action
  private async _fetchFromIndexedDB() {
    const data = await this._indexedDBService.getByStream()

    runInAction(() => {
      for (const noteDb of data) {
        const payload = noteDbToAddPayload(noteDb)
        const note = new Note(payload, this)
        this._items.push(note)
      }
    })
  }

  public closeDrawer = (): void => {
    this._editedNote = null
    this._isOpen = false
    this._form?.reset()
  }

  public goodLift = () => {
    const nextAction = this._mode === 'RUN' ? this._autorestart : () => {}

    if (this.mode === 'IDLE') {
      return
    }

    this.currentItem?.goodLift()
    this.stop()
    nextAction.call(this)
  }

  public editNote = (partId: string | number) => {
    const participant = this.items.find(({ id }) => id === partId)

    if (!participant) {
      return
    }

    const initialValues: typeof this._initialValues = {
      ...this._initialValues,
      name: participant.name,
    }

    this.form?.initialize(initialValues)
    this._editedNote = participant
    this.showDrawer()
  }

  public manualRun(part: Note) {
    this.stop()
    this._mode = 'MANUAL'

    this._manualItem = part
  }

  public noLift(): void {
    this.currentItem?.noLift()
    this.stop()
    this._autorestart()
  }

  public removeEditingNote = action(async () => {
    if (!this._editedNote) {
      return
    }

    const index = this._items.findIndex(({ id }) => id === this._editedNote!.id)
    if (index !== -1) {
      await this._indexedDBService.delete(this._editedNote.id)
      runInAction(() => this._items.splice(index, 1))
    }

    this.closeDrawer()
  })

  public showDrawer = (): void => {
    this._isOpen = true
  }

  public submit = async (payload: NoteFormFields) => {
    if (this._editedNote) {
      const { name } = payload
      this._editedNote.name = name
      await this._indexedDBService.update(this._editedNote)
      this.closeDrawer()
    } else {
      this.add(payload)
    }
  }

  public run = () => {
    this._mode = 'RUN'
  }

  public stop = () => {
    this._mode = 'IDLE'
    this._manualItem = null
  }
}
