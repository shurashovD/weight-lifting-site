import { NoteIndexedDBService } from './core'

type Services = {
  noteIDbService: NoteIndexedDBService
}

class Scope {
  private _services: Services

  constructor() {
    this._services = {
      noteIDbService: new NoteIndexedDBService(),
    }
  }

  public getService(serviceName: keyof Services) {
    return this._services[serviceName]
  }
}

export const scope = new Scope()
