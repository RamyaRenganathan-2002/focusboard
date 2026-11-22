import { ClipboardList } from "lucide-react";
import TaskCard from "./TaskCard";

export default function TaskList({ tasks, hasAnyTasks, onEdit, onDelete, onStatusChange }) {
    if (tasks.length === 0) {
        return (
            <div className="empty" role="status">
                <ClipboardList size={36} aria-hidden="true" />
                <h3>{hasAnyTasks ? "No tasks match your search" : "No tasks yet"}</h3>
                <p>
                    {hasAnyTasks
                        ? "Try a different keyword or reset the filters."
                        : "Click “Add Task” to create your first task."}
                </p>
            </div>
        );
    }

    return (
        <ul className="task-list" aria-label="Tasks">
            {tasks.map((task) => (
                <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onStatusChange={onStatusChange}
                />
            ))}
        </ul>
    );
}