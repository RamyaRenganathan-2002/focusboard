import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { focusNotes } from "../data/focusNotes";

export default function FocusNotes() {
    const [index, setIndex] = useState(0);
    const total = focusNotes.length;
    const slide = focusNotes[index];

    const prev = () => setIndex((i) => (i - 1 + total) % total);
    const next = () => setIndex((i) => (i + 1) % total);

    return (
        <section className="focus" aria-roledescription="carousel" aria-label="Focus Notes">
            <div className="focus__body" aria-live="polite">
                <p className="focus__eyebrow">
                    FOCUS NOTES · {index + 1} OF {total}
                </p>
                <h2 className="focus__title">{slide.title}</h2>
                <p className="focus__text">{slide.text}</p>
            </div>

            <div className="focus__controls">
                <div className="focus__dots" role="group" aria-label="Choose slide">
                    {focusNotes.map((s, i) => (
                        <button
                            key={s.id}
                            type="button"
                            className={`dot ${i === index ? "is-active" : ""}`}
                            aria-label={`Go to slide ${i + 1} of ${total}`}
                            aria-current={i === index ? "true" : undefined}
                            onClick={() => setIndex(i)}
                        />
                    ))}
                </div>
                <div className="focus__buttons">
                    <button type="button" className="btn btn--ghost" onClick={prev}>
                        <ChevronLeft size={16} aria-hidden="true" /> Previous
                    </button>
                    <button type="button" className="btn btn--ghost" onClick={next}>
                        Next <ChevronRight size={16} aria-hidden="true" />
                    </button>
                </div>
            </div>
        </section>
    );
}