import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { CATEGORIES, PRIORITIES, STATUSES, todayISO } from "../utils/taskUtils";

/**
 * One form for both Create and Edit.
 * `task` = null  -> create mode
 * `task` = {...} -> edit mode (fields are pre-filled)
 * The parent renders it with key={task?.id ?? "new"} so state resets per task.
 */
export default function TaskForm({ task, onSave, onCancel }) {
    const isEdit = Boolean(task);
    const titleRef = useRef(null);

    const [values, setValues] = useState({
        title: task?.title ?? "",
        description: task?.description ?? "",
        category: task?.category ?? CATEGORIES[0],
        status: task?.status ?? "To do",
        priority: task?.priority ?? "Medium",
        dueDate: task?.dueDate ?? todayISO(),
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        titleRef.current?.focus();
        const onKey = (e) => e.key === "Escape" && onCancel();
        document.addEventListener("keydown", onKey);
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = originalOverflow;
        };
    }, [onCancel]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((v) => ({ ...v, [name]: value }));
        if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
    };

    const validate = () => {
        const next = {};
        const title = values.title.trim();
        if (!title) next.title = "Title is required.";
        else if (title.length > 80) next.title = "Title must be 80 characters or fewer.";
        if (!values.dueDate) next.dueDate = "Please choose a due date.";
        if (!STATUSES.includes(values.status)) next.status = "Choose a valid status.";
        if (!PRIORITIES.includes(values.priority)) next.priority = "Choose a valid priority.";
        return next;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const found = validate();
        setErrors(found);
        if (Object.keys(found).length > 0) {
            if (found.title) titleRef.current?.focus();
            return;
        }
        onSave({
            ...(task ?? {}), // keeps the original id when editing
            ...values,
            title: values.title.trim(),
            description: values.description.trim(),
        });
    };

    return (
        <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onCancel()}>
            <div className="modal" role="dialog" aria-modal="true" aria-labelledby="form-title">
                <div className="modal__header">
                    <h2 id="form-title" className="modal__title">
                        {isEdit ? "Edit task" : "Create new task"}
                    </h2>
                    <button type="button" className="icon-btn" onClick={onCancel} aria-label="Close form">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} noValidate className="form">
                    <div className="field">
                        <label htmlFor="title">
                            Title <span aria-hidden="true">*</span>
                        </label>
                        <input
                            ref={titleRef}
                            id="title"
                            name="title"
                            type="text"
                            value={values.title}
                            onChange={handleChange}
                            placeholder="e.g. Prepare weekly report"
                            aria-required="true"
                            aria-invalid={Boolean(errors.title)}
                            aria-describedby={errors.title ? "title-error" : undefined}
                        />
                        {errors.title && (
                            <p id="title-error" className="field__error" role="alert">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    <div className="field">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            rows={3}
                            value={values.description}
                            onChange={handleChange}
                            placeholder="Add some details (optional)"
                        />
                    </div>

                    <div className="form__row">
                        <div className="field">
                            <label htmlFor="status">Status</label>
                            <select id="status" name="status" value={values.status} onChange={handleChange}>
                                {STATUSES.map((s) => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="priority">Priority</label>
                            <select id="priority" name="priority" value={values.priority} onChange={handleChange}>
                                {PRIORITIES.map((p) => (
                                    <option key={p} value={p}>{p}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form__row">
                        <div className="field">
                            <label htmlFor="category">Category</label>
                            <select id="category" name="category" value={values.category} onChange={handleChange}>
                                {CATEGORIES.map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="dueDate">
                                Due date <span aria-hidden="true">*</span>
                            </label>
                            <input
                                id="dueDate"
                                name="dueDate"
                                type="date"
                                value={values.dueDate}
                                onChange={handleChange}
                                aria-required="true"
                                aria-invalid={Boolean(errors.dueDate)}
                                aria-describedby={errors.dueDate ? "due-error" : undefined}
                            />
                            {errors.dueDate && (
                                <p id="due-error" className="field__error" role="alert">
                                    {errors.dueDate}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="modal__footer">
                        <button type="button" className="btn btn--ghost" onClick={onCancel}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn--primary">
                            {isEdit ? "Save changes" : "Create task"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}