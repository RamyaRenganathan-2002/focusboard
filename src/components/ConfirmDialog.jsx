import { useEffect, useRef } from "react";
import { AlertTriangle } from "lucide-react";

export default function ConfirmDialog({ title, message, confirmLabel = "Delete", onConfirm, onCancel }) {
    const cancelRef = useRef(null);

    useEffect(() => {
        cancelRef.current?.focus();
        const onKey = (e) => e.key === "Escape" && onCancel();
        document.addEventListener("keydown", onKey);
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = originalOverflow;
        };
    }, [onCancel]);

    return (
        <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onCancel()}>
            <div
                className="modal modal--small"
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="confirm-title"
                aria-describedby="confirm-message"
            >
                <span className="modal__warn" aria-hidden="true">
                    <AlertTriangle size={22} />
                </span>
                <h2 id="confirm-title" className="modal__title">{title}</h2>
                <p id="confirm-message" className="modal__text">{message}</p>
                <div className="modal__footer">
                    <button ref={cancelRef} type="button" className="btn btn--ghost" onClick={onCancel}>
                        Cancel
                    </button>
                    <button type="button" className="btn btn--danger" onClick={onConfirm}>
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}