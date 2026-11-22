export const STATUSES = ["To do", "In progress", "Completed"];
export const PRIORITIES = ["Low", "Medium", "High"];
export const CATEGORIES = ["Design", "Development", "Testing", "Research"];

export function createId() {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
        return `task-${crypto.randomUUID()}`;
    }
    return `task-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function todayISO() {
    const d = new Date();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${d.getFullYear()}-${month}-${day}`;
}

export function formatDate(iso) {
    if (!iso) return "";
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

export function getStats(tasks) {
    const total = tasks.length;
    const inProgress = tasks.filter((t) => t.status === "In progress").length;
    const completed = tasks.filter((t) => t.status === "Completed").length;
    const completion = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { total, inProgress, completed, completion };
}

export function getStatusCounts(tasks) {
    return {
        All: tasks.length,
        "To do": tasks.filter((t) => t.status === "To do").length,
        "In progress": tasks.filter((t) => t.status === "In progress").length,
        Completed: tasks.filter((t) => t.status === "Completed").length,
    };
}

export function filterTasks(tasks, { query, status, priority }) {
    const q = query.trim().toLowerCase();
    return tasks.filter((t) => {
        const matchesQuery = q === "" || t.title.toLowerCase().includes(q);
        const matchesStatus = status === "All" || t.status === status;
        const matchesPriority = priority === "All" || t.priority === priority;
        return matchesQuery && matchesStatus && matchesPriority;
    });
}