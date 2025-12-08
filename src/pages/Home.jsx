import { Link } from 'react-router-dom';
import Illustration from '../assets/images/illustration.svg'
import contactImage from '../assets/images/contact-image.svg'
import ChartImage from '../assets/icons/chart.svg'
import '../css/home.css';
import FeatureCard from '../components/FeatureCard';
import { useFavorites } from '../context/FavoritesProvider';

export default function Home() {
    const [favoriteStocks, functions] = useFavorites();
    const cards = [
        {
            icon: {
                src: ChartImage,
                alt: 'chart icon',
            },
            title: 'Explore stocks',
            description: 'Browse our comprehensive stock library with real-time data, historical charts, and detailed company information all in one searchable platform.'
        },
        {
            icon: {
                src: ChartImage,
                alt: 'fundamentals icon',
            },
            title: 'Compare assets',
            description: 'Side-by-side comparison tools to evaluate multiple stocks, analyze performance metrics, and make informed investment decisions.'
        },
        {
            icon: {
                src: ChartImage,
                alt: 'news icon',
            },
            title: 'Learn fundamentals',
            description: 'Access educational resources, financial analysis, and market insights to deepen your understanding of stocks and investment strategies.'
        },
    ]
    return (
    <main className="home-page page">
        <div className="page__container">
        <section className="hero">
            <div className='hero__container'>
                <div className="hero__body">
                    <h1 className="hero__title">FreedomInvest Encyclopedia</h1>
                    <h2 className="hero__subtitle">Your encyclopedia for the modern market</h2>
                    <Link to="/stocks" className="hero__button button">Explore Stocks</Link>
                </div>
                    <div className="hero__image">
                        <img src={Illustration} alt="hero image" />
                    </div>
            </div>
        </section>
        <section className="features">
            {cards.map((card) => {
                return <FeatureCard key={card.title} card={card}/>
            })}
        </section>
        <section className="reason">
            <article className='reason__body'>
                <h1 className="reason__title h1">Why FreedomInvest Encyclopedia?</h1>
                <div className="reason__text">
                    <p>FreedomInvest Encyclopedia combines searchable stock data, historical charts, fundamentals and curated market news in a single, easy-to-use place — helping modern investors quickly research companies, compare options, and make better-informed decisions.</p>
                </div>
            </article>
            <div className="reason__image">
                <img src={contactImage} alt="contact image" />
            </div>
        </section>
        </div>
    </main>
    );
}
