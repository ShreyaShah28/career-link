import seedData from '../../db.json'

type CollectionItem = {
  id: string | number
  [key: string]: unknown
}

type Database = {
  jobs: CollectionItem[]
  users: CollectionItem[]
  applications: CollectionItem[]
  contactRequests: CollectionItem[]
  [key: string]: CollectionItem[] | unknown
}

type ApiResponse<T> = Promise<{ data: T }>

const STORAGE_KEY = 'career-link-db'

function cloneData<T>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}

function getSeedData(): Database {
  return cloneData(seedData as Database)
}

function loadDatabase(): Database {
  if (typeof window === 'undefined') {
    return getSeedData()
  }

  const storedValue = window.localStorage.getItem(STORAGE_KEY)

  if (!storedValue) {
    const initialData = getSeedData()
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData))
    return initialData
  }

  try {
    return JSON.parse(storedValue) as Database
  } catch (error) {
    console.error('Failed to parse local database, resetting seed data.', error)
    const initialData = getSeedData()
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData))
    return initialData
  }
}

function saveDatabase(database: Database) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(database))
}

function getCollectionName(path: string): string {
  return path.replace(/^\/+/, '').split('/')[0]
}

function getItemId(path: string): string | null {
  const segments = path.replace(/^\/+/, '').split('/')
  return segments[1] || null
}

function getCollection(database: Database, path: string): CollectionItem[] {
  const collectionName = getCollectionName(path)
  const collection = database[collectionName]

  if (!Array.isArray(collection)) {
    database[collectionName] = []
    return database[collectionName] as CollectionItem[]
  }

  return collection as CollectionItem[]
}

function resolveItem(
  collection: CollectionItem[],
  itemId: string | null
): CollectionItem | undefined {
  if (!itemId) {
    return undefined
  }

  return collection.find((item) => String(item.id) === String(itemId))
}

export const api = {
  get<T>(path: string): ApiResponse<T> {
    const database = loadDatabase()
    const collection = getCollection(database, path)
    const itemId = getItemId(path)
    const data = itemId ? resolveItem(collection, itemId) : collection

    return Promise.resolve({
      data: cloneData(data as T)
    })
  },

  post<T>(path: string, payload: T): ApiResponse<T> {
    const database = loadDatabase()
    const collection = getCollection(database, path)

    collection.push(cloneData(payload) as CollectionItem)
    saveDatabase(database)

    return Promise.resolve({
      data: cloneData(payload)
    })
  },

  patch<T extends Record<string, unknown>>(
    path: string,
    payload: T
  ): ApiResponse<CollectionItem> {
    const database = loadDatabase()
    const collection = getCollection(database, path)
    const itemId = getItemId(path)
    const existingItem = resolveItem(collection, itemId)

    if (!existingItem) {
      return Promise.reject(new Error(`Item not found for path: ${path}`))
    }

    Object.assign(existingItem, payload)
    saveDatabase(database)

    return Promise.resolve({
      data: cloneData(existingItem)
    })
  },

  delete(path: string): ApiResponse<CollectionItem | null> {
    const database = loadDatabase()
    const collection = getCollection(database, path)
    const itemId = getItemId(path)
    const itemIndex = collection.findIndex((item) => String(item.id) === String(itemId))

    if (itemIndex === -1) {
      return Promise.reject(new Error(`Item not found for path: ${path}`))
    }

    const [deletedItem] = collection.splice(itemIndex, 1)
    saveDatabase(database)

    return Promise.resolve({
      data: cloneData(deletedItem)
    })
  }
}
