// Data access layer — swap this file to replace localStorage with an API
// Currently a thin wrapper; the actual persistence is handled by Zustand's persist middleware

export const STORAGE_KEY = 'task-store'

export function clearAllTasks() {
  localStorage.removeItem(STORAGE_KEY)
}
