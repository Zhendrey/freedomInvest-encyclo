// ...existing code...
import '../css/style.css';
import ChartImage from '../assets/icons/chart.svg'

export default function About() {
  return (
    <main className="home-page page">
      <div className="page__container">
        <section className="hero">
          <div className="hero__container">
            <div className="hero__body">
              <h1 className="hero__title">About FreedomInvest Encyclopedia</h1>
              <h2 className="hero__subtitle">Your comprehensive guide to stock market investing</h2>
              <p className="hero__text">We aim to provide investors with comprehensive stock market data and analysis.</p>
            </div>
          </div>
        </section>

        <section className="features">
          <div className="features-card card">
            <div className="card__image white">
              <img src={ChartImage} alt="chart" />
            </div>
            <h3 className="card__title">Detailed stock information</h3>
            <p className="card__subtitle">Searchable company fundamentals, charts and history.</p>
          </div>

          <div className="features-card card">
            <div className="card__image white">
              <img src={ChartImage} alt="chart" />
            </div>
            <h3 className="card__title">Interactive charts</h3>
            <p className="card__subtitle">Visualize price action and compare multiple tickers.</p>
          </div>

          <div className="features-card card">
            <div className="card__image white">
              <img src={ChartImage} alt="chart" />
            </div>
            <h3 className="card__title">Learning resources</h3>
            <p className="card__subtitle">Guides, fundamentals and market insights for investors.</p>
          </div>
        </section>

        <section className="reason">
          <article className="reason__body">
            <h1 className="reason__title h1">Our Mission</h1>
            <div className="reason__text">
              <p>We provide reliable market data, clear visualizations and educational materials to help investors make informed decisions.</p>
            </div>

            <h2 className="h2" style={{ marginTop: '1.5rem' }}>Data Sources</h2>
            <p>Our data is collected from reputable market providers and refreshed regularly.</p>

            <h2 className="h2" style={{ marginTop: '1.5rem' }}>Contact</h2>
            <p>Have questions? Reach out to our support team.</p>
          </article>

          <div className="reason__image" aria-hidden="true" />
        </section>
      </div>
    </main>
  );
}
// ...existing code...