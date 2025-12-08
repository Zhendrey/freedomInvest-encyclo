import { useOutletContext } from "react-router-dom"

export default function StockOverview(){
    const selectedStock = useOutletContext();
    const isChangePositive = selectedStock.priceChange >= 0 ? 'positive' : 'negative';
    const riskClass = selectedStock.riskType.toLowerCase();

    return (
        <section className="fundamentals">
            <h2 className='fundamentals__title h2'>Core information</h2>
            <ul className='fundamentals__list'>
                <li className="fundamentals__link">Risk type: <i className={riskClass.includes(' ') ? riskClass.replace(' ', '-') : riskClass}>{selectedStock.riskType}</i></li>
                <li className="fundamentals__link">Price: <i>${selectedStock.price}</i></li>
                <li className="fundamentals__link">Change in price: <i className={`stock-card__price-change card__price-change ${isChangePositive}`}>
                    {
                    selectedStock.priceChange >= 0 ? 
                    '+' + selectedStock.priceChange + '%'
                    : String(selectedStock.priceChange).slice(0,1) + String(selectedStock.priceChange).slice(1,) + '%'
                }</i></li>
                <li className="fundamentals__link">Market Cap: <i>${selectedStock.marketCap.toLocaleString()}</i></li>
                <li className="fundamentals__link">P/E Ratio: <i>{selectedStock.peRatio}</i></li>
                <li className="fundamentals__link">Sector: <i>{selectedStock.sector}</i></li>
                <li className="fundamentals__link">Country: <i>{selectedStock.country}</i></li>
            </ul>
        </section>
    )
}