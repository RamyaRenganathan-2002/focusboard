import { useEffect, useState } from "react";
import {
    LayoutDashboard,
    CheckSquare,
    Calendar,
    Users,
    Settings,
    Target,
    X,
} from "lucide-react";

// Rename these to match the Figma sidebar. Only "Dashboard" is functional;
// the rest are visual placeholders (documented in the README).
const NAV_ITEMS = [
    { label: "Dashboard", icon: LayoutDashboard },
    { label: "My Tasks", icon: CheckSquare },
    { label: "Calendar", icon: Calendar },
    { label: "Team", icon: Users },
    { label: "Settings", icon: Settings },
];

export default function Sidebar({ open, onClose }) {
    const [active, setActive] = useState("Dashboard");

    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === "Escape" && onClose();
        document.addEventListener("keydown", onKey);
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = originalOverflow;
        };
    }, [open, onClose]);

    return (
        <>
            {open && <div className="scrim" onClick={onClose} aria-hidden="true" />}
            <aside className={`sidebar ${open ? "is-open" : ""}`} aria-label="Sidebar">
                <div className="sidebar__brand">
                    <span className="sidebar__logo" aria-hidden="true">
                        <Target size={20} />
                    </span>
                    <span className="sidebar__name">FocusBoard</span>
                    <button
                        type="button"
                        className="icon-btn sidebar__close"
                        onClick={onClose}
                        aria-label="Close navigation menu"
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav aria-label="Main navigation">
                    <ul className="nav-list">
                        {NAV_ITEMS.map(({ label, icon: Icon }) => (
                            <li key={label}>
                                <button
                                    type="button"
                                    className={`nav-item ${active === label ? "is-active" : ""}`}
                                    aria-current={active === label ? "page" : undefined}
                                    onClick={() => {
                                        setActive(label);
                                        onClose();
                                    }}
                                >
                                    <Icon size={18} aria-hidden="true" />
                                    <span>{label}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
        </>
    );
}