import { makeAutoObservable } from 'mobx'

import { Note } from '.'
import { AddAttPayload, AttStatus } from './types'

export class Attempt {
  private readonly _parentNote: Note
  bets: number[] = []
  status: AttStatus = 'PENDING'

  constructor(payload: AddAttPayload, parentNote: Note) {
    this.bets = payload.bets
      .filter(item => ['string', 'number'].includes(typeof item) && !isNaN(+item!))
      .map(Number)
    this.status = payload.status
    if (payload.bets[payload.bets.length - 1] === '-') {
      this.status = 'WRONGED'
    }
    this._parentNote = parentNote

    makeAutoObservable(this)
  }

  get isSucceded() {
    return this.status === 'SUCCEDED' ? true : undefined
  }

  get isWronged() {
    return ['CANCELED', 'WRONGED'].includes(this.status) ? true : undefined
  }

  get value() {
    if (this.status === 'CANCELED') {
      return '-'
    }

    const result = this.bets[this.bets.length - 1]?.toFixed(0) || ''

    if (result === '0') {
      return ''
    }

    return result
  }

  onCancell = () => {
    this.status = 'CANCELED'
    this._parentNote.onChange()
  }

  onPending = () => {
    this.status = 'PENDING'
    this._parentNote.onChange()
  }

  onSuccess = () => {
    this.status = 'SUCCEDED'
    this._parentNote.onChange()
  }

  onWrong = () => {
    this.status = 'WRONGED'
    this._parentNote.onChange()
  }

  setBet = (value: string) => {
    if (value !== '' && !isNaN(+value)) {
      this.bets.push(+value)
    }
    if (value === '') {
      this.bets.push(0)
    }
    this._parentNote.onChange()
  }
}
