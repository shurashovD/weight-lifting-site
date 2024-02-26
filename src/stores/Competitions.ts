// eslint-disable-next-line import/named
import { createForm, FormApi } from 'final-form'
import { makeAutoObservable } from 'mobx'
import { enqueueSnackbar } from 'notistack'

type Competition = {
  id: string | number
  title: string
}

export type CompetitionFormValues = Omit<Competition, 'id'>

export class CompetitionsStore {
  private _items: Competition[] = []
  private _showSideBar: boolean = false
  private _form: FormApi<CompetitionFormValues>
  private _edited: Competition | null = null

  private readonly _initialValues: CompetitionFormValues = { title: '' }

  constructor() {
    this._form = createForm({
      initialValues: this._initialValues,
      onSubmit: this.onSubmit,
    })

    makeAutoObservable(this)
  }

  public get form() {
    return this._form
  }

  public get open() {
    return this._showSideBar
  }

  public onSubmit = (payload: CompetitionFormValues) => {
    if (this._edited) {
      this._update(this._edited, payload)
    } else {
      this._create(payload)
    }
  }

  private _create(payload: CompetitionFormValues) {
    const existsByName = this._items.some(({ title }) => title === payload.title)

    if (existsByName) {
      enqueueSnackbar('Ошибка', { variant: 'error' })
      return
    }

    const id = Date.now()
    this._items.push({ ...payload, id })
    this.closeDrawer()
  }

  public items() {
    return this._items
  }

  private _update(item: Competition, payload: CompetitionFormValues) {
    const existsByName = this._items.some(({ title }) => title === item.title)

    if (existsByName) {
      enqueueSnackbar('Ошибка', { variant: 'error' })
      return
    }

    item = { ...item, ...payload }
    this._edited = null
    this.closeDrawer()
  }

  public delete(id?: string | number) {
    const deletedId = id || this._edited?.id

    if (deletedId) {
      const index = this._items.findIndex(({ id }) => id === deletedId)
      if (index !== -1) {
        this._items.splice(index, 1)
      }
    }
  }

  public selectItem(itemId: string | number) {
    const item = this._items.find(({ id }) => id === itemId)
    if (item) {
      this._edited = item
    }
  }

  public closeDrawer() {
    this._showSideBar = false
    this._form.reset()
  }

  public openDrawer() {
    this._showSideBar = true
  }
}
