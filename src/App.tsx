import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Header } from '@/shared/components/Header'
import { TaskStats } from '@/shared/components/TaskStats'
import { SearchFilter } from '@/shared/components/SearchFilter'
import { TaskList } from '@/features/tasks/components/TaskList'
import { TaskFormModal } from '@/features/tasks/components/TaskFormModal'
import { TaskDetailModal } from '@/features/tasks/components/TaskDetailModal'
import { DeleteConfirmDialog } from '@/features/tasks/components/DeleteConfirmDialog'
import { useFilteredTasks } from '@/features/tasks/hooks/useFilteredTasks'
import { useTaskStore } from '@/features/tasks/store/taskStore'
import { useUIStore } from '@/shared/store/uiStore'
import type { FilterState, Task } from '@/features/tasks/types'

const DIALOG_FADE = 200
const ITEM_FADE = 300

const defaultFilters: FilterState = { search: '', status: 'all', priority: 'all' }

interface ModalState {
  open: boolean
  mode: 'create' | 'edit'
  task?: Task
}

export default function App() {
  const viewMode = useUIStore((state) => state.viewMode)
  const deleteTask = useTaskStore((state) => state.deleteTask)

  const [filters, setFilters] = useState<FilterState>(defaultFilters)
  const [modal, setModal] = useState<ModalState>({ open: false, mode: 'create' })
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [detailTask, setDetailTask] = useState<Task | null>(null)

  const filteredTasks = useFilteredTasks(filters)

  const openCreate = () => setModal({ open: true, mode: 'create' })
  const openEdit = (task: Task) => setModal({ open: true, mode: 'edit', task })
  const closeModal = () => setModal((m) => ({ ...m, open: false }))

  const openDetail = (task: Task) => setDetailTask(task)
  const closeDetail = () => setDetailTask(null)

  const handleDeleteConfirm = (taskId: string) => {
    setDeleteId(null)
    setTimeout(() => setDeletingId(taskId), DIALOG_FADE)
    setTimeout(() => {
      deleteTask(taskId)
      setDeletingId(null)
    }, DIALOG_FADE + ITEM_FADE)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <div className="flex flex-col gap-6">
          <TaskStats />

          <div className="flex flex-col gap-4 rounded-lg border bg-card p-4 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold">Tasks</h2>
              <Button onClick={openCreate} size="sm" className="shrink-0">
                <Plus className="mr-1.5 h-4 w-4" />
                Add Task
              </Button>
            </div>

            <SearchFilter filters={filters} onChange={setFilters} />

            <TaskList
              tasks={filteredTasks}
              viewMode={viewMode}
              deletingId={deletingId}
              onEdit={openEdit}
              onDelete={setDeleteId}
              onView={openDetail}
            />
          </div>
        </div>
      </main>

      <TaskFormModal
        open={modal.open}
        onClose={closeModal}
        mode={modal.mode}
        task={modal.task}
      />

      <TaskDetailModal
        task={detailTask}
        onClose={closeDetail}
        onEdit={(task) => { closeDetail(); openEdit(task) }}
      />

      <DeleteConfirmDialog
        taskId={deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  )
}
