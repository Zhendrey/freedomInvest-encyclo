import '../css/style.css';
import { useLocation, useOutletContext, useParams, useSearchParams } from 'react-router-dom';
import ChartsComponent from '../components/ChartsComponent';
import { useChartData } from '../context/ChartDataProvider';
import { useStocks } from '../context/StocksProvider';

export default function Charts() {
    const chartData = useStocks();
    const { symbol } = useParams();
    const location = useLocation();
    const selectedStock = useOutletContext();
    const [searchParams] = useSearchParams();
    const ticker = symbol || selectedStock.symbol;
    const compareStocks = searchParams.getAll('compare').join('').split(',');

    const stockCharts = [
    {
        parent: 'LinePriceChart',
        data: chartData,
        symbol: ticker,
        content: 'historical data'
    },
    {
        parent: 'VolumeBarChart',
        data: chartData,
        symbol: ticker,
        content: 'volume change (in millions)'
    },
]

    return (
        <section className="charts">
            <ChartsComponent chartsObj={stockCharts}/>
        </section>
    );
}

export async function getChartData(){
    const res = await fetch('/src/data/sampleCharts.json');
    return await res.json();
}