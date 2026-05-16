import { Pencil, Trash2, GripVertical, CalendarDays } from 'lucide-react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { useTaskStore } from '../store/taskStore'
import type { Task } from '../types'

interface TaskListItemProps {
  task: Task
  isDeleting: boolean
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
  onView: (task: Task) => void
}

function isOverdue(dueDate: string, status: string) {
  return status === 'pending' && new Date(dueDate) < new Date(new Date().toDateString())
}

export function TaskListItem({ task, isDeleting, onEdit, onDelete, onView }: TaskListItemProps) {
  const toggleStatus = useTaskStore((state) => state.toggleStatus)

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const completed = task.status === 'completed'
  const overdue = isOverdue(task.dueDate, task.status)

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={() => onView(task)}
      className={cn(
        'group flex cursor-pointer items-start gap-2 rounded-lg border bg-card p-3 shadow-sm transition-all duration-300 hover:bg-accent/30',
        isDragging && 'opacity-50 shadow-lg ring-2 ring-primary',
        isDeleting && 'opacity-0 scale-95',
        completed && 'opacity-60'
      )}
    >
      {/* Grip — desktop only */}
      <button
        {...attributes}
        {...listeners}
        onClick={(e) => e.stopPropagation()}
        className="mt-0.5 hidden shrink-0 cursor-grab touch-none text-muted-foreground transition-opacity lg:flex lg:opacity-0 lg:group-hover:opacity-100 active:cursor-grabbing"
        aria-label="Drag to reorder"
      >
        <GripVertical className="h-4 w-4" />
      </button>

      {/* Checkbox */}
      <div className="mt-0.5 shrink-0" onClick={(e) => e.stopPropagation()}>
        <Checkbox checked={completed} onCheckedChange={() => toggleStatus(task.id)} />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">

        {/* Row 1: title + badge + (desktop) date + actions */}
        <div className="flex items-center gap-2">
          <p className={cn('flex-1 truncate font-medium', completed && 'line-through text-muted-foreground')}>
            {task.title}
          </p>
          <Badge variant={task.priority} className="shrink-0">{task.priority}</Badge>

          {/* Desktop: date + hover-reveal actions */}
          <div className="hidden lg:flex items-center gap-2">
            <div className={cn('flex items-center gap-1 text-xs', overdue ? 'text-destructive' : 'text-muted-foreground')}>
              <CalendarDays className="h-3 w-3" />
              {task.dueDate}
            </div>
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEdit(task)}>
                <Pencil className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive"
                onClick={() => onDelete(task.id)}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Description */}
        {task.description && (
          <p className="mt-0.5 truncate text-sm text-muted-foreground">{task.description}</p>
        )}

        {/* Row 2: mobile only — date + always-visible actions */}
        <div className="mt-1.5 flex items-center gap-2 lg:hidden">
          <div className={cn('flex items-center gap-1 text-xs', overdue ? 'text-destructive' : 'text-muted-foreground')}>
            <CalendarDays className="h-3 w-3" />
            {task.dueDate}
          </div>
          <div onClick={(e) => e.stopPropagation()} className="ml-auto flex gap-1">
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onEdit(task)}>
              <Pencil className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-destructive hover:text-destructive"
              onClick={() => onDelete(task.id)}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

      </div>
    </div>
  )
}
