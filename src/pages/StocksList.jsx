import { useSearchParams } from 'react-router-dom';
import StockCard from '../components/StockCard';
import '../css/style.css';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import { NotFoundMessage } from '../components/NotFoundMessage';
import { useEffect } from 'react';
import { useStocks } from '../context/StocksProvider';

export default function StocksList() {
  //HOOKS
  const [stocks, setStocks] = useStocks();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  console.log(query);


  //INDEPENDENT VARIABLES
  const filters = [
    {
      key: 'sector',
      filterable: true,
      options:[
        'all',
        'technology',
        'healthcare',
        'financial',
        'consumer staples',
        'consumer cyclical',
        'industrial',
        'energy',
        'utilities',
        'communication'
      ]
    },
    {
      key: 'sort',
      filterable: false,
      options:[
        'A-Z',
        'Z-A',
      ]
    },
  ]

  //FUNCTIONS
  function filterStocks(searchParams){
      const statements = stocks.map((stock)=>{
        const statement = [];
        for (const [key,value] of [...searchParams]) {
          if(key === 'sort' || key.includes('compare')) continue;
          else if(key === 'query') {
            statement.push(
              stock['symbol'].toLowerCase().includes(value.toLowerCase())
            ||
              stock['name'].toLowerCase().includes(value.toLowerCase())
            )
          }else{
            statement.push(stock[key].toLowerCase()==value.toLowerCase())
          }
        }
        return {element: stock, statementArr: statement}
      }).filter(({statementArr})=>statementArr.every(statement=>statement))
      const filteredStocks = stocks.map((stock)=>{
        if(statements.find(({element})=>element===stock)) return {...stock, isShown: true}
        return {...stock, isShown: false}
      })
      setStocks(sortStocks(searchParams, filteredStocks))
  }
  function sortStocks(searchParams, filteredStocks){
    const sort = searchParams.get("sort");
    const getStocks = ()=>{
      const f = filteredStocks.map(({name})=>name).sort().map((name)=>{
        return filteredStocks.find(({name: stockName})=>stockName===name)
      })
      const fr = filteredStocks.map(({name})=>name).sort().reverse().map((name)=>{
        return filteredStocks.find(({name: stockName})=>stockName===name)
      })
      switch (sort) {
        case 'A-Z':
          return f
        case 'Z-A':
          return fr
        default:
          return f
      }
    }
    return getStocks()
  }

  //SIDE-EFFECTS
  useEffect(()=>{
    filterStocks(searchParams)
  }, [searchParams])

  //ELEMENTS
  const stocksList = stocks.map((stock)=>{
        return stock.isShown ? <StockCard key={stock.name} stock={stock}/> : ''
      })

    return (
      <section className="stocks-list">
        <div className="stocks-list__search">
          <Filters functions={[filterStocks]} filters={filters}/>
          <SearchBar functions={[filterStocks]}/>
        </div>
        <section className="stocks-grid">
          {stocksList.every(item=>!item)  ?
          <NotFoundMessage message={`We were not able to find the stock you werre looking for.`}/>
          :
          stocksList
          }
        </section>
      </section>
    );
}
