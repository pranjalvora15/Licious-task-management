# Task Management Dashboard

A responsive task management app built as part of the Licious frontend interview assignment.

## Setup

**Requirements:** Node 20+

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Other commands

| Command | Description |
|---|---|
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

---

## Features

- Create, edit, and delete tasks with title, description, priority, and due date
- Mark tasks complete / pending via checkbox
- Filter by status and priority; full-text search
- Drag-and-drop reordering in list view (mouse and touch)
- Card and list view modes
- Task detail modal (click any task to read full description)
- Animated delete with confirmation dialog
- Dark / light theme toggle
- Fully responsive: mobile (320px+), tablet (768px+), desktop (1024px+)

---

## Stack

| Layer | Choice |
|---|---|
| Framework | React 18 + TypeScript |
| Build | Vite 5 |
| Styling | Tailwind CSS v3 + shadcn/ui (Radix primitives) |
| State | Zustand 5 |
| Drag and drop | @dnd-kit/core + @dnd-kit/sortable |
| Icons | Lucide React |

---

## Design Decisions

### State management — Zustand over Context/Redux
Zustand was chosen for its minimal boilerplate and stable selector model. Each component subscribes to a primitive slice of state (a number, boolean, or string) rather than a derived object, avoiding unnecessary re-renders. Context would have caused all consumers to re-render on any task change; Redux would have added significant setup overhead for this scope.

### Drag and drop — @dnd-kit over HTML5 DnD API
The native HTML5 drag-and-drop API does not fire events on touch screens. @dnd-kit's `PointerSensor` handles mouse, touch, and stylus via the Pointer Events API. An `activationConstraint: { distance: 8 }` prevents accidental drags when the user intends to tap.

### Responsive layout — two breakpoints, different list layouts
- Below `lg` (1024px): list items use a 2-row layout — title and priority badge on row 1, date and action buttons (always visible) on row 2. This gives the title sufficient horizontal space and makes edit/delete reachable on touch devices where hover is unavailable.
- At `lg`+: single-row layout with a grip handle, inline date, and hover-revealed actions.

Card view uses the same layout at all breakpoints — cards already have enough vertical space to accommodate all elements.

### Delete flow — coordinated animation sequence
Clicking delete opens a confirmation dialog. On confirm: the dialog fades out (200ms), then the list item fades and scales down (300ms), then the item is removed from the store. This prevents the jarring layout shift that occurs when an item disappears instantly while a dialog is still closing.

### Component structure — feature-first folders
Code is organised by feature (`features/tasks/`) rather than by type (`components/`, `hooks/`). Shared UI primitives live in `components/ui/` (shadcn-generated) and shared layout components in `shared/components/`. This keeps each feature self-contained and easy to locate.

### Persistence — Zustand `persist` middleware with localStorage
Tasks are persisted to `localStorage` via Zustand's built-in `persist` middleware. Data survives page refreshes and browser restarts with no additional setup. localStorage was chosen over IndexedDB for simplicity — the task payload is small and serialises to JSON trivially.
