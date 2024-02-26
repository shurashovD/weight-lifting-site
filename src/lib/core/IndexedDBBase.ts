import { IndexedDBItemAdd, IndexedDBItemBase, IndexedDBItemUpd } from './types'

export class IndexedDBBase<Item extends IndexedDBItemBase> {
  public storeName: string
  private _connect: IDBDatabase | null = null
  private _transaction: IDBTransaction | null = null
  private _indexedKeys: (keyof Item)[]

  constructor(storeName: string, primaryKeys?: (keyof Item)[]) {
    this.storeName = storeName
    this._indexedKeys = primaryKeys || ['id']
  }

  private _createConnect() {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const connect = indexedDB.open('WeightLifting')
      const storeName = this.storeName
      connect.onupgradeneeded = function () {
        if (!connect.result.objectStoreNames.contains(storeName)) {
          connect.result?.createObjectStore(storeName, { keyPath: 'id' })
        }
      }

      connect.onerror = function () {
        reject()
      }

      connect.onsuccess = function () {
        resolve(connect.result)
      }
    })
  }

  private async _getConnect() {
    if (!this._connect) {
      this._connect = await this._createConnect()
    }

    return this._connect
  }

  private async _getTransaction() {
    await this._getConnect()

    if (!this._transaction) {
      this._transaction = this._connect!.transaction(this.storeName, 'readwrite')
    }

    return this._transaction
  }

  protected async getStore() {
    const transaction = await this._getTransaction()
    const store = transaction.objectStore(this.storeName)
    for (const indexedKey in this._indexedKeys.filter(item => item !== 'id')) {
      const indexedFieldName = this._genIndexedFieldName(indexedKey)
      store.createIndex(indexedFieldName, indexedKey)
    }
    return store
  }

  protected async _insertOne(payload: IndexedDBItemAdd<Item>) {
    const createdIDB = Date.now()
    const updatedIDB = null
    const data = { ...payload, createdIDB, updatedIDB }

    await this._getConnect()
    const db = this._connect!.transaction(this.storeName, 'readwrite')
    const store = db.objectStore(this.storeName)
    const request = store.add(data)

    return await new Promise((resolve, reject) => {
      request.onsuccess = function () {
        resolve(request.result)
      }

      request.onerror = function (event) {
        if (request.error?.name == 'ConstraintError') {
          event.preventDefault()
          const error = new Error()
          error.message = 'Элемент уже существует'
          error.name = 'Already exists'
          reject(error)
        } else {
          reject(request.error)
        }
      }
    })
  }

  protected async _updateOne(payload: IndexedDBItemUpd<Item>) {
    const cursor = await this._getById(payload.id)
    if (!cursor) {
      const error = new Error()
      error.message = 'Элемент не найден'
      throw error
    }

    const updatedIDB = Date.now()
    const data: Item = { ...cursor, ...payload, updatedIDB }
    const request = (await this._getConnect())
      .transaction(this.storeName, 'readwrite')
      .objectStore(this.storeName)
      .put(data)

    return await new Promise((resolve, reject) => {
      request.onsuccess = function () {
        resolve(request.result)
      }

      request.onerror = function (event) {
        if (request.error?.name == 'ConstraintError') {
          event.preventDefault()
          const error = new Error()
          error.message = 'Элемент с таким именем уже существует'
          reject(error)
        } else {
          reject(request.error)
        }
      }
    })
  }

  protected async _getById(id: string | number) {
    const request = (await this._getConnect())
      .transaction(this.storeName, 'readonly')
      .objectStore(this.storeName)
      .get(id)

    return await new Promise<Item | null>((resolve, reject) => {
      request.onsuccess = function () {
        resolve(request.result)
      }

      request.onerror = function () {
        reject(request.error)
      }
    })
  }

  protected _genIndexedFieldName(indexedField: string | number) {
    return indexedField + '_indexed'
  }

  protected async _getMany() {
    const request = (await this._getConnect())
      .transaction(this.storeName, 'readonly')
      .objectStore(this.storeName)
      .getAll()

    return await new Promise<Item[]>((resolve, reject) => {
      request.onsuccess = function () {
        resolve(request.result)
      }

      request.onerror = function () {
        reject(request.error)
      }
    })
  }

  protected async _deleteOne(id: string | number) {
    const request = (await this._getConnect())
      .transaction(this.storeName, 'readwrite')
      .objectStore(this.storeName)
      .delete(id)

    return await new Promise((resolve, reject) => {
      request.onsuccess = function () {
        resolve(request.result)
      }

      request.onerror = function (event) {
        if (request.error?.name == 'ConstraintError') {
          event.preventDefault()
          const error = new Error()
          error.message = 'Ошибка удаления элемента'
          reject(error)
        } else {
          reject(request.error)
        }
      }
    })
  }
}
