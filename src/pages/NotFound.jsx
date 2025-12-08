import { Link } from 'react-router-dom';
import '../css/style.css';

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <div className="error-code">404</div>
        <h1>Page Not Found</h1>
        <p>Sorry, the page you're looking for doesn't exist.</p>

        <div className="suggestions">
          <p>Here are some helpful links instead:</p>
          <nav className="nav-links">
            <Link to="/" className="btn btn-primary">Go to Home</Link>
            <Link to="/stocks" className="btn btn-secondary">Browse Stocks</Link>
            <Link to="/about" className="btn btn-secondary">About Us</Link>
          </nav>
        </div>

        <div className="error-details">
          <p className="error-message">
            The page may have been removed or the URL might be incorrect.
          </p>
        </div>
      </div>
    </div>
  );
}
