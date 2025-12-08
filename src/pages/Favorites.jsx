import '../css/style.css';
import { useFavorites } from '../context/FavoritesProvider';
import StockCard from '../components/StockCard';
import { Link, useLocation } from 'react-router-dom';

export default function Favorites() {
  const [favoriteStocks] = useFavorites();
  const location = useLocation();

  return (
    <main className="favorites page">
      <section className='favorites__container'>
        {favoriteStocks.length ? <h1 className='h3'>Favorite stocks</h1> : <h1 className='h3'>You haven't added any stocks to favorites. <Link to={{
          pathname: '/stocks',
          search: location.search
        }}>Check out our stock collection to find your pick</Link></h1>}
        <section className="stocks-grid">
          {favoriteStocks.map((stock)=><StockCard key={stock.name} stock={stock}/>)}
        </section>
      </section>
    </main>
  );
}
