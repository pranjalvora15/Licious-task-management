import { Moon, Sun, LayoutList, LayoutGrid, CheckSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useUIStore } from '@/shared/store/uiStore'

export function Header() {
  const { theme, viewMode, toggleTheme, setViewMode } = useUIStore()

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <CheckSquare className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold tracking-tight">Task Manager</h1>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex rounded-md border">
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="icon"
              className="rounded-r-none border-0"
              onClick={() => setViewMode('list')}
              title="List view"
            >
              <LayoutList className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'card' ? 'secondary' : 'ghost'}
              size="icon"
              className="rounded-l-none border-0 border-l"
              onClick={() => setViewMode('card')}
              title="Card view"
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>

          <Button variant="outline" size="icon" onClick={toggleTheme} title="Toggle theme">
            {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </header>
  )
}
