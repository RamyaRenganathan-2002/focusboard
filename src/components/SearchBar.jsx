import { Search, X } from "lucide-react";

export default function SearchBar({ value, onChange }) {
    return (
        <div className="search">
            <label htmlFor="task-search" className="sr-only">
                Search tasks by title
            </label>
            <Search size={18} className="search__icon" aria-hidden="true" />
            <input
                id="task-search"
                type="search"
                className="search__input"
                placeholder="Search tasks by title..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            {value && (
                <button
                    type="button"
                    className="icon-btn search__clear"
                    onClick={() => onChange("")}
                    aria-label="Clear search"
                >
                    <X size={16} />
                </button>
            )}
        </div>
    );
}