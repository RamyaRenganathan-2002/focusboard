import { useMemo, useState } from "react";
import { CheckCircle2, Clock, ListChecks, Percent, Plus } from "lucide-react";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatCard from "./components/StatCard";
import FocusNotes from "./components/FocusNotes";
import SearchBar from "./components/SearchBar";
import FilterTabs from "./components/FilterTabs";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import ConfirmDialog from "./components/ConfirmDialog";

import useLocalStorage from "./hooks/useLocalStorage";
import { sampleTasks } from "./data/sampleTasks";
import { createId, filterTasks, getStatusCounts, getStats } from "./utils/taskUtils";

const STORAGE_KEY = "focusboard_tasks";

export default function App() {
  // Single source of truth for all task data
  const [tasks, setTasks] = useLocalStorage(STORAGE_KEY, sampleTasks, Array.isArray);

  // UI state
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");
  const [form, setForm] = useState({ open: false, task: null });
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [navOpen, setNavOpen] = useState(false);

  // Derived values (never stored)
  const stats = useMemo(() => getStats(tasks), [tasks]);
  const counts = useMemo(() => getStatusCounts(tasks), [tasks]);
  const visibleTasks = useMemo(
    () => filterTasks(tasks, { query, status, priority }),
    [tasks, query, status, priority]
  );
  const isFiltered = query !== "" || status !== "All" || priority !== "All";

  // Mutations (always create new arrays/objects)
  const handleSave = (data) => {
    if (data.id) {
      setTasks((prev) => prev.map((t) => (t.id === data.id ? { ...t, ...data } : t)));
    } else {
      setTasks((prev) => [{ ...data, id: createId() }, ...prev]);
    }
    setForm({ open: false, task: null });
  };

  const handleStatusChange = (id, newStatus) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t)));
  };

  const handleConfirmDelete = () => {
    setTasks((prev) => prev.filter((t) => t.id !== taskToDelete.id));
    setTaskToDelete(null);
  };

  const resetFilters = () => {
    setQuery("");
    setStatus("All");
    setPriority("All");
  };

  return (
    <div className="app">
      <Sidebar open={navOpen} onClose={() => setNavOpen(false)} />

      <div className="app__content">
        <Header onMenuClick={() => setNavOpen(true)} />

        <main className="main">
          <section aria-labelledby="overview-heading">
            <h2 id="overview-heading" className="sr-only">Overview</h2>
            <div className="stats">
              <StatCard title="Total tasks" value={stats.total} icon={ListChecks} tone="indigo" />
              <StatCard title="In progress" value={stats.inProgress} icon={Clock} tone="amber" />
              <StatCard title="Completed" value={stats.completed} icon={CheckCircle2} tone="green" />
              <StatCard title="Completion" value={`${stats.completion}%`} icon={Percent} tone="violet">
                <div
                  className="progress"
                  role="progressbar"
                  aria-label="Completion percentage"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={stats.completion}
                >
                  <div className="progress__bar" style={{ width: `${stats.completion}%` }} />
                </div>
              </StatCard>
            </div>
          </section>

          <FocusNotes />

          <section className="tasks" aria-labelledby="tasks-heading">
            <div className="tasks__header">
              <h2 id="tasks-heading" className="tasks__title">
                Tasks <span className="tasks__count">({visibleTasks.length})</span>
              </h2>
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => setForm({ open: true, task: null })}
              >
                <Plus size={18} aria-hidden="true" /> Add Task
              </button>
            </div>

            <div className="toolbar">
              <SearchBar value={query} onChange={setQuery} />
              <FilterTabs
                status={status}
                onStatusChange={setStatus}
                priority={priority}
                onPriorityChange={setPriority}
                counts={counts}
                onReset={resetFilters}
                isFiltered={isFiltered}
              />
            </div>

            <TaskList
              tasks={visibleTasks}
              hasAnyTasks={tasks.length > 0}
              onEdit={(task) => setForm({ open: true, task })}
              onDelete={setTaskToDelete}
              onStatusChange={handleStatusChange}
            />
          </section>
        </main>
      </div>

      {form.open && (
        <TaskForm
          key={form.task?.id ?? "new"}
          task={form.task}
          onSave={handleSave}
          onCancel={() => setForm({ open: false, task: null })}
        />
      )}

      {taskToDelete && (
        <ConfirmDialog
          title="Delete this task?"
          message={`“${taskToDelete.title}” will be permanently removed. This cannot be undone.`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setTaskToDelete(null)}
        />
      )}
    </div>
  );
}