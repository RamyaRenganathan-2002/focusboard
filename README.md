# FocusBoard

A responsive, single-user task management dashboard built with **React + Vite**. Users can create, edit, delete and filter tasks, track progress through live statistics, and browse a three-slide Focus Notes carousel. All data is saved in the browser with `localStorage`.

- **Live app:** [https://YOUR-APP.vercel.app](https://focusboard-lac.vercel.app/)
- **Author:** Ramya


## Tech stack

| Technology | Purpose |
| --- | --- |
| React 18 | Component-based UI |
| Vite | Project setup, dev server, build |
| JavaScript (ES6+) | Application logic |
| CSS3 (variables + media queries) | Styling and responsiveness |
| React Hooks | State and derived data |
| localStorage | Browser persistence |
| Lucide React | Icons |
| Vercel | Hosting |

## Features

- **Create, edit and delete tasks.** Create and edit share one reusable `TaskForm` component. Delete asks for confirmation first.
- **Task fields:** title, description, category, status, priority and due date.
- **Validation:** the title is required, whitespace-only titles are rejected, titles are trimmed, and the due date is required. Errors are shown next to the field.
- **Status updates:** change a task between *To do*, *In progress* and *Completed* directly from its card.
- **Search:** case-insensitive, partial-match search on task titles.
- **Filters:** status tabs and a priority dropdown that work together with search, plus a reset button.
- **Live statistics:** total, in progress, completed and completion percentage, all calculated from the task data (nothing hardcoded, and safe when there are zero tasks).
- **Focus Notes carousel:** 3 slides, previous/next buttons with circular navigation, clickable indicators and an active-slide highlight.
- **Persistence:** tasks survive refreshes. Sample data is only loaded when no valid saved data exists.
- **Responsive:** tested at 390px, 768px and 1440px. The sidebar becomes a slide-in drawer on tablet and mobile.
- **Accessible:** semantic landmarks, labelled form fields, visible focus rings, keyboard-operable dialogs (Esc closes them), and statuses shown with an icon and text, not colour alone.

## Project structure

```
focusboard/
├── public/
├── screenshots/
│   ├── desktop.png
│   └── mobile.png
├── src/
│   ├── components/
│   │   ├── ConfirmDialog.jsx
│   │   ├── FilterTabs.jsx
│   │   ├── FocusNotes.jsx
│   │   ├── Header.jsx
│   │   ├── SearchBar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── StatCard.jsx
│   │   ├── TaskCard.jsx
│   │   ├── TaskForm.jsx
│   │   └── TaskList.jsx
│   ├── data/
│   │   ├── focusNotes.js
│   │   └── sampleTasks.js
│   ├── hooks/
│   │   └── useLocalStorage.js
│   ├── utils/
│   │   └── taskUtils.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── AI_USAGE.md
├── README.md
├── index.html
└── package.json
```

## Getting started

**Requirements:** Node.js 18 or newer and npm.

```bash
# 1. Clone the repository
git clone https://github.com/YOUR-USERNAME/focusboard.git
cd focusboard

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open the URL shown in the terminal (usually http://localhost:5173).

Other commands:

```bash
npm run build     # production build into /dist
npm run preview   # preview the production build locally
```

## State management

**Choice:** React hooks only (`useState`, `useMemo` and a custom `useLocalStorage` hook). The app has one shared dataset and a shallow component tree, so Redux, Zustand or Context would add complexity without any benefit.

- **Single source of truth:** the `tasks` array lives in `App.jsx` and is passed down by props. Cards, statistics, tab counts, filters and the form all read from it.
- **Predictable mutations:** add, edit, delete and status changes use `setTasks(prev => ...)` with `map`, `filter` and object spread. State is never mutated directly. Editing keeps the original task `id`, so no duplicates are created.
- **Derived values:** statistics, tab counts and the visible task list are calculated with `useMemo` from `tasks` plus the search and filter state. They are never stored separately, so they cannot go out of sync.
- **UI state:** the search text, selected status tab, priority filter, open form, task pending deletion and mobile menu state are kept in `App.jsx`.
- **Carousel state:** `FocusNotes` keeps its own `index` state. The visible slide, the "1 OF 3" label and the indicator dots all read from that one value.

## localStorage

- Storage key: `focusboard_tasks`.
- `useLocalStorage` reads the key once on first render and parses the JSON. If nothing valid is stored (missing, corrupted or not an array), it falls back to the sample tasks. Saved data is therefore never overwritten by sample data.
- Every change to `tasks` is written back with `JSON.stringify` inside a `useEffect`.
- All storage access is wrapped in `try/catch`, so the app still works in memory if storage is blocked or full.
- The **complete** task list is saved. Search and filters are derived from it and are not persisted.

## Testing checklist

- [x] 6 sample tasks load on first visit
- [x] Create a task, which appears immediately and updates the statistics
- [x] Edit a task, which updates the same record (no duplicate)
- [x] Delete shows a confirmation, and Cancel keeps the task
- [x] Status changes update the badge, statistics and completion %
- [x] Search works regardless of letter case
- [x] Status tab, priority filter and search work together
- [x] Empty states for no tasks and no matches
- [x] Data persists after refresh and a deleted task stays deleted
- [x] Layout checked at 390px, 768px and 1440px with no horizontal scroll
- [x] Keyboard-only use of forms, dialogs and carousel
- [x] Hosted version tested in an incognito window
