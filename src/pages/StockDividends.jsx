import { useLoaderData, useOutletContext, useParams } from 'react-router-dom';
import '../css/style.css';
import { nanoid } from 'nanoid';

export default function StockDividends() {
  const data = useLoaderData();
  const selectedStock = useOutletContext();
  const { symbol } = useParams();
  const dividends = data.find((item)=>item.symbol===symbol || item.symbol === selectedStock.symbol);
  const dividendsTable = (
    <table className="dividends__table table">
        <tbody>
          <tr>
            <th>Date</th>
            {dividends.dividends.map(({date})=><td key={nanoid(3)}>{date}</td>)}
          </tr>
          <tr>
            <th>Payment amount</th>
            {dividends.dividends.map(({value})=><td key={nanoid(3)}>${value}</td>)}
        </tr>
        </tbody>
    </table>
  );

  return (
    <section className="dividends">
      {dividends.dividends.length === 0 ?
      (
        <h3 className='h3'>No dividends paid</h3>
      ) : dividendsTable
      }
    </section>
  );
}

export async function getDividends({params}){
  const { symbol } = params;
  const res = await fetch('/src/data/dividends.json');
  const data = await res.json();
  return data;
}