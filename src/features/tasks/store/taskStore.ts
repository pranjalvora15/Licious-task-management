import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Task, Priority, Status } from '../types'

interface TaskStore {
  tasks: Task[]
  addTask: (task: Omit<Task, 'id' | 'order' | 'createdAt' | 'status'>) => void
  editTask: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => void
  deleteTask: (id: string) => void
  toggleStatus: (id: string) => void
  reorderTasks: (fromIndex: number, toIndex: number) => void
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],

      addTask: (task) => {
        const tasks = get().tasks
        const newTask: Task = {
          ...task,
          id: crypto.randomUUID(),
          status: 'pending',
          order: tasks.length,
          createdAt: new Date().toISOString(),
        }
        set({ tasks: [...tasks, newTask] })
      },

      editTask: (id, updates) => {
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
        }))
      },

      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks
            .filter((t) => t.id !== id)
            .map((t, i) => ({ ...t, order: i })),
        }))
      },

      toggleStatus: (id) => {
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id
              ? { ...t, status: t.status === 'pending' ? 'completed' : 'pending' as Status }
              : t
          ),
        }))
      },

      reorderTasks: (fromIndex, toIndex) => {
        const tasks = [...get().tasks].sort((a, b) => a.order - b.order)
        const [moved] = tasks.splice(fromIndex, 1)
        tasks.splice(toIndex, 0, moved)
        set({ tasks: tasks.map((t, i) => ({ ...t, order: i })) })
      },
    }),
    { name: 'task-store' }
  )
)

export const useTaskById = (id: string) =>
  useTaskStore((state) => state.tasks.find((t) => t.id === id))

export const useTaskCounts = () => {
  const total = useTaskStore((state) => state.tasks.length)
  const completed = useTaskStore((state) => state.tasks.filter((t) => t.status === 'completed').length)
  return { total, completed, pending: total - completed }
}

// Unused variable suppression helper — exposes only what's needed
export type { Priority, Status }
