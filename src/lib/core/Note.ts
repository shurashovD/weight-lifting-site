import { action, makeAutoObservable } from 'mobx'
import { v4 as uuidv4 } from 'uuid'

import { NoteIndexedDBService } from '.'
import { scope } from './../scope'
import { Attempt } from './Attempt'
import { AddNotePayload } from './types'

export class Note {
  public id: string | number
  public name: string
  public number: number
  public jerk: [Attempt, Attempt, Attempt]
  public isCurrent = false
  public isReady = false
  public snatch: [Attempt, Attempt, Attempt]
  public isWoomen: boolean
  public weight: number | null
  public birth: number | null
  public teams: string[]

  private readonly _idbService: NoteIndexedDBService = scope.getService('noteIDbService')

  constructor(data: AddNotePayload) {
    const { id, name, number } = data
    this.id = id || uuidv4()
    this.name = name
    this.number = number
    const emptyAtt = { bets: [], status: 'PENDING' }
    const jerk = Array(3)
      .fill(true)
      .map((_, index) => new Attempt(data.jerk[index] || emptyAtt, this)) as Note['jerk']

    const snatch = Array(3)
      .fill(true)
      .map((_, index) => new Attempt(data.snatch[index] || emptyAtt, this)) as Note['snatch']

    this.jerk = jerk
    this.snatch = snatch
    this.isWoomen = data.isWoomen
    this.weight = data.weight
    this.birth = data.birth
    this.teams = data.teams

    makeAutoObservable(this)
  }

  get amount() {
    function getExerValue(atts: Attempt[]): number | null {
      const bets = atts
        .filter(({ isSucceded }) => isSucceded)
        .map(({ value }) => +value)
        .filter(item => !isNaN(item))

      if (bets.length) {
        return Math.max(...bets)
      }

      return null
    }

    const snatchRes = getExerValue(this.snatch)
    const jerkRes = getExerValue(this.jerk)
    return snatchRes && jerkRes ? snatchRes + jerkRes : null
  }

  get snatchIsFinished() {
    return this.snatch.every(({ isSucceded, isWronged }) => isSucceded || isWronged)
  }

  get jerkIsFinished() {
    return this.jerk.every(({ isSucceded, isWronged }) => isSucceded || isWronged)
  }

  get isFinished() {
    return this.snatchIsFinished && this.jerkIsFinished
  }

  get diffPrev21() {
    if (!this.snatchIsFinished) {
      return Note.getDiff(this.snatch, 0)
    }

    if (!this.jerkIsFinished) {
      return Note.getDiff(this.jerk, 0)
    }

    return 0
  }

  get diffPrev32() {
    if (!this.snatchIsFinished) {
      return Note.getDiff(this.snatch, 1)
    }

    if (!this.jerkIsFinished) {
      return Note.getDiff(this.jerk, 1)
    }

    return 0
  }

  get currAttIndex() {
    if (!this.snatchIsFinished) {
      const index = this.snatch.findIndex(({ isSucceded, isWronged }) => !isSucceded && !isWronged)
      return index
    }

    if (!this.jerkIsFinished) {
      const index = this.jerk.findIndex(({ isSucceded, isWronged }) => !isSucceded && !isWronged)
      return index
    }

    return 4
  }

  get currAttBet() {
    if (!this.snatchIsFinished) {
      return this.snatch[this.currAttIndex].value
    }

    if (!this.jerkIsFinished) {
      return this.jerk[this.currAttIndex].value
    }

    return null
  }

  public onChange = () => {
    this._idbService.update(this)
  }

  private static getDiff(exercise: [Attempt, Attempt, Attempt], targetAttIndex: 0 | 1) {
    const firstAttIsFinished =
      exercise[targetAttIndex].isSucceded || exercise[targetAttIndex].isWronged
    if (!firstAttIsFinished) {
      return 0
    }

    const diff = +(exercise[targetAttIndex + 1].value || 0) - +(exercise[targetAttIndex].value || 0)
    return Math.max(diff, 0)
  }

  public goodLift() {
    function action(exercise: [Attempt, Attempt, Attempt]) {
      const index = exercise.findIndex(({ isSucceded, isWronged }) => !isSucceded && !isWronged)
      if (index !== -1) {
        exercise[index].onSuccess()
        if (index < 2) {
          const bet = +exercise[index].value + 1
          exercise[index + 1].setBet(bet.toFixed(0))
        }
      }
    }

    const exercise = this.snatchIsFinished ? this.jerk : this.snatch
    action(exercise)
  }

  public noLift() {
    function action(exercise: [Attempt, Attempt, Attempt]) {
      const index = exercise.findIndex(({ isSucceded, isWronged }) => !isSucceded && !isWronged)
      if (index !== -1) {
        exercise[index].onWrong()
        if (index < 2) {
          const bet = exercise[index].value
          exercise[index + 1].setBet(bet)
        }
      }
    }

    const exercise = this.snatchIsFinished ? this.jerk : this.snatch
    action(exercise)
  }

  public setCurrent = action(() => {
    this.isCurrent = true
  })

  public setReady = action(() => {
    this.isReady = true
  })

  public resetReadyCurrentState = action(() => {
    this.isCurrent = false
    this.isReady = false
  })
}
