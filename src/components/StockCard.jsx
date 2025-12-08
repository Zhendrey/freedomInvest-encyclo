import { Link, useLocation } from "react-router-dom";
import openHeartIcon from '../assets/icons/heart-regular-full.svg'
import fullHeartIcon from '../assets/icons/heart-solid-full.svg'
import { useFavorites } from "../context/FavoritesProvider";

export default function StockCard ({stock}) {
    const [favoriteStocks, functions] = useFavorites();
    const [addFavorite, removeFavorite] = functions;
    const location = useLocation();
    const isFavorite = favoriteStocks.find((favStock)=>favStock.symbol===stock.symbol);
    const isEqual = isFavorite?.symbol == stock.symbol;
    const isChangePositive = stock.priceChange >= 0 ? 'positive' : 'negative';

    return (
        <article className="stock-card card">
            <h4 className="stock-card__title card__title h4">{stock.symbol}</h4>
            <p className="stock-card__subtitle card__subtitle">{stock.name}</p>
            <span className="stock-card__price card__price">${stock.price}</span>
            <div className="stock-card__description card__description">
                <p className="stock-card__price-change card__price-change">Price change: <i className={`stock-card__price-change card__price-change ${isChangePositive}`}>
                        {
                        stock.priceChange >= 0 ? 
                        '+' + stock.priceChange + '%'
                        : String(stock.priceChange).slice(0,1) + '%' + String(stock.priceChange).slice(1,)
                    }</i></p>
                <p className="stock-card__market-cap card__market-cap">
                    Market cap: <span>${stock.marketCap.toLocaleString()}</span>
                </p>
            </div>
            <Link 
            to={{
                pathname: `/stocks/${stock.symbol}`,
                search: location.search
            }}
            className="stock-card__button card__button button"
            state={{from: location.pathname}}
            >View Details</Link>
            <a href="#" onClick={(e)=>{
                e.preventDefault()
                isEqual ? removeFavorite(stock) : addFavorite(stock)
            }} className="stock-card__heart card__heart">
                <img src={isFavorite ? fullHeartIcon : openHeartIcon} alt="full heart" />
            </a>
        </article>
    );
};
