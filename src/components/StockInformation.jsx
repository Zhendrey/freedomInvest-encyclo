import { Link, Outlet, useLocation, useSearchParams } from "react-router-dom"

export default function StockInformation({children, selectedStock, symbol, compareLink, removeStock}){
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const compareStocks = searchParams.getAll("compare").join('').split(',')
    const isComparing = compareStocks.find(item=>item===symbol)
    console.log(isComparing);
    return (
        <section className="stock-details">
            <section className="heading">
                <h1 className="heading__title h1">{symbol}</h1>
                <h2 className="heading__subtitle h3">{selectedStock.name}</h2>
                <h3 className="heading__subtitle p">Last updated: {selectedStock.lastUpdated}</h3>
                {(!location.pathname.includes('compare') && !isComparing) && compareLink}
                <Link to={{
                pathname: "/stocks",
                search: location.search
                }} className='heading__button button p'>Back to stocks</Link>
                {location.state?.from == '/favorites' && <Link to={{
                pathname: location.state?.from,
                search: location.search
                }} className='button p'>Back to Favorites</Link>}
                {location.pathname.includes('compare') && <button type="button" onClick={(e)=>removeStock(e,symbol)} className="button p">Remove stock</button>}
            </section>
            {location.pathname.includes('stocks') && children}
            <Outlet context={selectedStock}/>
        </section>
    )
}