import { RotateCcw } from "lucide-react";
import { PRIORITIES } from "../utils/taskUtils";

const TABS = ["All", "To do", "In progress", "Completed"];

export default function FilterTabs({
    status,
    onStatusChange,
    priority,
    onPriorityChange,
    counts,
    onReset,
    isFiltered,
}) {
    return (
        <div className="filters">
            <div className="tabs" role="group" aria-label="Filter by status">
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        type="button"
                        className={`tab ${status === tab ? "is-active" : ""}`}
                        aria-pressed={status === tab}
                        onClick={() => onStatusChange(tab)}
                    >
                        {tab} <span className="tab__count">{counts[tab]}</span>
                    </button>
                ))}
            </div>

            <div className="filters__right">
                <label htmlFor="priority-filter" className="sr-only">
                    Filter by priority
                </label>
                <select
                    id="priority-filter"
                    className="select"
                    value={priority}
                    onChange={(e) => onPriorityChange(e.target.value)}
                >
                    <option value="All">All priorities</option>
                    {PRIORITIES.map((p) => (
                        <option key={p} value={p}>
                            {p} priority
                        </option>
                    ))}
                </select>

                <button
                    type="button"
                    className="btn btn--ghost"
                    onClick={onReset}
                    disabled={!isFiltered}
                >
                    <RotateCcw size={14} aria-hidden="true" /> Reset
                </button>
            </div>
        </div>
    );
}