import { Link, NavLink, useParams, useSearchParams, useNavigate } from 'react-router-dom';
import '../css/style.css';
import { useStocks } from '../context/StocksProvider';
import StockInformation from '../components/StockInformation';
import NavBar from '../components/NavBar';

export default function StockDetails() {
  const [stocks] = useStocks();
  const [searchParams, setSearchParams] = useSearchParams();
  const compareArr = searchParams.getAll('compare');
  const currentCompareSymbol = compareArr[compareArr.length-1];
  const { symbol: stockSymbol } = useParams();
  const navigate = useNavigate();
  const selectedStock = stocks.find(({symbol})=>symbol===stockSymbol)

  const addToCompare = (e, stockToAdd) => {
    e.preventDefault()
    const compareStocks = compareArr ? compareArr : [];
    compareStocks.push(stockToAdd);
    console.log(compareStocks);
    searchParams.set('compare', compareStocks);
    setSearchParams(searchParams)
    const queryString = [...searchParams].reduce((acc,[key,value],currentIndex,arr)=>{
      let str = acc + `${key}=${value.replaceAll(' ', '+')}&`;
      if(currentIndex === arr.length-1) str = acc + `${key}=${value}`
      return str
    }, '?')
    navigate({pathname: '/compare', search: queryString})
  };

    const navBarLinks = [
    {path: '', name: 'overview'},
    {path: 'charts', name: 'charts'},
    {path: 'dividends', name: 'dividends'},
  ]

  //REACT DOM ELEMENTS
  const compareLink = <Link to="#" onClick={(e)=>addToCompare(e, stockSymbol)} className='heading__button button p'>Add to compare</Link>;
  
  
  return (
    <>
      <StockInformation
        selectedStock={selectedStock}
        symbol={stockSymbol}
        compareLink={compareLink}>
          <NavBar links={navBarLinks}/>
        </StockInformation>
    </>
  );
}