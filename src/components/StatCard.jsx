export default function StatCard({ title, value, icon: Icon, tone = "indigo", children }) {
    return (
        <article className={`stat-card tone-${tone}`}>
            <div className="stat-card__top">
                <span className="stat-card__icon" aria-hidden="true">
                    <Icon size={20} />
                </span>
                <h3 className="stat-card__title">{title}</h3>
            </div>
            <p className="stat-card__value">{value}</p>
            {children}
        </article>
    );
}