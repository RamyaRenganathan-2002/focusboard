import { CalendarDays, CheckCircle2, Circle, Clock, Pencil, Trash2 } from "lucide-react";
import { STATUSES, formatDate, todayISO } from "../utils/taskUtils";

const STATUS_ICON = {
    "To do": Circle,
    "In progress": Clock,
    Completed: CheckCircle2,
};

const STATUS_CLASS = {
    "To do": "todo",
    "In progress": "progress",
    Completed: "done",
};

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
    const StatusIcon = STATUS_ICON[task.status];
    const overdue = task.status !== "Completed" && task.dueDate < todayISO();

    return (
        <li className="task">
            <div className="task__main">
                <div className="task__badges">
                    <span className={`badge badge--status-${STATUS_CLASS[task.status]}`}>
                        <StatusIcon size={13} aria-hidden="true" />
                        {task.status}
                    </span>
                    <span className={`badge badge--priority-${task.priority.toLowerCase()}`}>
                        {task.priority}
                    </span>
                    <span className="badge badge--category">{task.category}</span>
                </div>

                <h3 className={`task__title ${task.status === "Completed" ? "is-done" : ""}`}>
                    {task.title}
                </h3>
                {task.description && <p className="task__desc">{task.description}</p>}

                <p className={`task__due ${overdue ? "is-overdue" : ""}`}>
                    <CalendarDays size={14} aria-hidden="true" />
                    Due {formatDate(task.dueDate)}
                    {overdue && <strong> (Overdue)</strong>}
                </p>
            </div>

            <div className="task__actions">
                <label htmlFor={`status-${task.id}`} className="sr-only">
                    Change status of {task.title}
                </label>
                <select
                    id={`status-${task.id}`}
                    className="select select--sm"
                    value={task.status}
                    onChange={(e) => onStatusChange(task.id, e.target.value)}
                >
                    {STATUSES.map((s) => (
                        <option key={s} value={s}>
                            {s}
                        </option>
                    ))}
                </select>

                <button
                    type="button"
                    className="icon-btn"
                    onClick={() => onEdit(task)}
                    aria-label={`Edit ${task.title}`}
                >
                    <Pencil size={17} />
                </button>
                <button
                    type="button"
                    className="icon-btn icon-btn--danger"
                    onClick={() => onDelete(task)}
                    aria-label={`Delete ${task.title}`}
                >
                    <Trash2 size={17} />
                </button>
            </div>
        </li>
    );
}