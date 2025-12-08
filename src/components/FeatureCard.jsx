export default function FeatureCard({card}){
    return (
        <article className="features-card card">
            <div className="card__image">
                <img src={card.icon.src} alt={card.icon.alt} />
            </div>
            <h3 className="card__title h2">{card.title}</h3>
            <div className="card__description">
                <p className="p">{card.description}</p>
            </div>
        </article>
    )
}