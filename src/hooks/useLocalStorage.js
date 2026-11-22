import { useEffect, useState } from "react";

/**
 * useState that is synced with localStorage.
 * - Reads once on first render; falls back to `initialValue` only when
 *   nothing valid is stored (so sample data never overwrites saved data).
 * - All storage access is wrapped in try/catch (private mode, quota, bad JSON).
 */
export default function useLocalStorage(key, initialValue, isValid = () => true) {
    const [value, setValue] = useState(() => {
        try {
            const raw = window.localStorage.getItem(key);
            if (raw !== null) {
                const parsed = JSON.parse(raw);
                if (isValid(parsed)) return parsed;
            }
        } catch {
            // ignore corrupted or unavailable storage
        }
        return initialValue;
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch {
            // storage may be full or blocked; the app keeps working in memory
        }
    }, [key, value]);

    return [value, setValue];
}