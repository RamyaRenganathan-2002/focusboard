import { Bell, Menu } from "lucide-react";

export default function Header({ onMenuClick }) {
    const today = new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
    });

    return (
        <header className="header">
            <button
                type="button"
                className="icon-btn header__menu"
                onClick={onMenuClick}
                aria-label="Open navigation menu"
            >
                <Menu size={22} />
            </button>

            <div className="header__titles">
                <p className="header__date">{today}</p>
                <h1 className="header__title">My Tasks Overview</h1>
            </div>

            <div className="header__actions">
                <button type="button" className="icon-btn" aria-label="Notifications">
                    <Bell size={20} />
                </button>
                <span className="avatar" role="img" aria-label="Profile">
                    R
                </span>
            </div>
        </header>
    );
}