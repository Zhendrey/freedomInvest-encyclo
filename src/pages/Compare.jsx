import { Link, useLocation, useSearchParams } from 'react-router-dom';
import '../css/style.css';
import { useStocks } from '../context/StocksProvider';
import StockInformation from '../components/StockInformation';
import AddPage from '../components/AddPage';
import NavBar from '../components/NavBar';
import MultiCompareChart from '../components/charts/MultiCompareChart';
import { useEffect, useState } from 'react';
import StockSkeleton from '../components/StockSkeleton';

export default function Compare() {
  //HOOKS AND STATES
  const location = useLocation();
  const [stocks] = useStocks();
  const [searchParams, setSearchParams] = useSearchParams();
  const compareStocks = searchParams.getAll('compare').join('').split(',')

  //IV
  const navBarLinks = [
    {path: '', name: 'overview'},
    {path: 'charts', name: 'charts'},
    {path: 'dividends', name: 'dividends'},
  ]
  const unrepeatedStocks = unrepeatStocks();

  //FUNCTIONS
  function removeStock(e,symbol){
    e.preventDefault()
    compareStocks.length > 1 ?
    searchParams.set('compare', compareStocks.filter((item)=>item!=symbol))
    : searchParams.delete('compare')
    
    setSearchParams(searchParams)
  }
  function unrepeatStocks(){
    const unrepeated = [];
    for (const stock of compareStocks) {
      console.log(stock);
      if(unrepeated.includes(stock.toUpperCase())) continue;
      unrepeated.push(stock)
    }
    return unrepeated.filter(value=>value!='')
  }
  console.log(unrepeatStocks());

  useEffect(()=>{
    searchParams.set("compare", unrepeatedStocks)
    setSearchParams(searchParams)
  }, [])

  if(!compareStocks[0]){
    return (
      <main className='page'>
      <section className="compare page__container">
        <div className='compare__body'>
          <h1 className='h1'>Compare Stocks</h1>
          <p className='h2'>Select stocks to compare from the stock details page.</p>
          <Link to={{
            pathname: '/stocks',
            search: location.search
          }} className="button">Search stocks</Link>
        </div>
      </section>
    </main>
    )
  }
  const compareElements = compareStocks?.map((compStock)=>
    <StockInformation
      key={compStock}
      selectedStock={stocks.find((s)=>s.symbol===compStock)}
      symbol={compStock}
      removeStock={removeStock}
    />
  ) || null;
  const stockListing = compareStocks.reduce((acc,str,index,arr)=>{
    const lastStr = arr[arr.length-1];
    return str === lastStr ? acc + str : acc + str + ' VS '
  }, '')
  return (
    <main className='page'>
      <section className="compare page__container">
        <section className='compare__body'>
              {compareStocks.length === 1 && (
                <h1 className='h1 compare__title'>Select one more stock to compare</h1>
              )}
              {compareStocks.length == 2 && <h1 className='h1 compare__title'>{stockListing}</h1>}
              {compareStocks.length > 2 && <h1 className='h1 compare__title'>Comparing Stocks</h1>}
              <NavBar links={navBarLinks}/>
            <Link to={{
            pathname: '/stocks',
            search: location.search
          }} className="button">Search stocks</Link>
        </section>
        <section className="compare__screen-split screen-split">
          {compareElements}
          {compareElements.length == 1 && 
            <section className="stock-details stock-details--add-page"><AddPage/></section>
          }
        </section>
        <section className="multi-chart">
                <MultiCompareChart data={compareStocks.map(stock=>{
                  return stocks.filter(item=>item.symbol===stock)[0]
                })} symbols={compareStocks}>
                  {compareStocks.length <= 2 
                  ? <h2 className='h2'>Performace of {stockListing}</h2>
                  :
                    <h2 className="h2">Stock Performance</h2>
                }
                </MultiCompareChart>
        </section>
      </section>
    </main>
  );
}