# Task Management Dashboard

A responsive task management app built as part of the Licious frontend interview assignment.

Project live link: [ https://licious-task-management.vercel.app/](url)

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


## Screenshots

### List view
<img width="1426" height="856" alt="image" src="https://github.com/user-attachments/assets/145e8244-f584-4d20-9788-ac54467fe0d3" />

### Card view with task completed
<img width="1503" height="909" alt="image" src="https://github.com/user-attachments/assets/8d77f513-e9fe-4672-a961-65405ada7667" />

### Detailed Task View Modal
<img width="1414" height="855" alt="image" src="https://github.com/user-attachments/assets/fd1ae132-936b-450e-8fce-cf243290d519" />


### Add Task View
<img width="1290" height="897" alt="image" src="https://github.com/user-attachments/assets/c81bc38f-7997-4177-b257-086e5c65d7c1" />


### Edit Task View
<img width="1338" height="871" alt="image" src="https://github.com/user-attachments/assets/aca063d4-1c1d-4c5e-a152-e1019e68018b" />


### Searching Task
<img width="1346" height="875" alt="image" src="https://github.com/user-attachments/assets/61f67268-c769-4475-aa4f-75331fc345e3" />


### Filter (dark mode)
<img width="1343" height="887" alt="image" src="https://github.com/user-attachments/assets/303d8467-ee02-45e3-8864-832d9fea11e9" />

### Delete View
<img width="1355" height="887" alt="image" src="https://github.com/user-attachments/assets/92324684-7369-4489-ad6b-212d6e25ac6a" />


### Error Handling while Adding Task
<img width="1360" height="890" alt="image" src="https://github.com/user-attachments/assets/e73584e1-9fa9-4167-904d-c744e7c37ac0" />

### Sorting View
<img width="1398" height="903" alt="image" src="https://github.com/user-attachments/assets/a4460850-234f-427b-a66b-595a4490856b" />

### Mobile View
<img width="437" height="808" alt="image" src="https://github.com/user-attachments/assets/bd78c3a3-17b2-4688-8249-620d23a2f2df" />

<img width="439" height="806" alt="image" src="https://github.com/user-attachments/assets/8475f3ca-866a-44bb-b1a2-0e0abaf3c759" />

<img width="510" height="826" alt="image" src="https://github.com/user-attachments/assets/1d12e154-8401-47ca-b589-ce33a1c11ffe" />

<img width="437" height="815" alt="image" src="https://github.com/user-attachments/assets/15a8451a-eded-4a94-95ca-c421558cf888" />


### Tablet View
<img width="1000" height="814" alt="image" src="https://github.com/user-attachments/assets/fa115e73-c449-4270-995c-ed54892d32c8" />

<img width="1020" height="821" alt="image" src="https://github.com/user-attachments/assets/41eeef80-6daf-4e76-9a61-6664b066eb7e" />




