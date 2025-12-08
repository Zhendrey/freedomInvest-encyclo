import { CartesianGrid, Legend, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import LoadingSkeleton from "../LoadingSkeleton";

export default function LinePriceChart({children, data, symbol}){
    const [stocks] = data;
    if(!stocks.length) return <LoadingSkeleton/>
    const isNotAvailable = stocks.every(item=>Object.keys(item)[0]!==symbol);
    if(isNotAvailable) return (
        <>
            {children}
            <h4 className="p">No chart data available.</h4>
        </>
    )
    const stock = stocks.find((obj)=>Object.keys(obj)[0]==symbol);
    const historicalData = stock[symbol];
    const color = stock.color;
    return (
    <div className="chart chart--price">
        {children}
        <LineChart 
            style={{ width: '100%', aspectRatio: 1.618, maxWidth: 750, minWidth: 300 }} 
            responsive 
            data={historicalData}
        >
            <CartesianGrid stroke="#aaa" strokeDasharray="5 5"/>
            <Line dataKey="price" type="monotone" name="Price" stroke={color} strokeWidth={2} />
            <XAxis dataKey="date" tick={'2025'}  />
            <YAxis label={{value: '$', position: 'insideLeft', angle: 0}}/>
            <Legend />
            <Tooltip />
        </LineChart>
    </div>
    )
}


/*
{
        "AAPL": [
            { "date": "2025-01-13", "price": 182.12 },
            { "date": "2025-01-10", "price": 182.85 },
            { "date": "2025-01-09", "price": 182.45 },
            { "date": "2025-01-08", "price": 180.92 },
            { "date": "2025-01-07", "price": 181.35 },
            { "date": "2025-01-06", "price": 179.58 },
            { "date": "2025-01-03", "price": 178.92 },
            { "date": "2025-01-02", "price": 177.45 },
            { "date": "2024-12-31", "price": 176.88 },
            { "date": "2024-12-30", "price": 175.25 }
        ]
    },
    {
        "MSFT": [
            { "date": "2025-01-13", "price": 424.58 },
            { "date": "2025-01-10", "price": 421.95 },
            { "date": "2025-01-09", "price": 423.42 },
            { "date": "2025-01-08", "price": 422.15 },
            { "date": "2025-01-07", "price": 420.88 },
            { "date": "2025-01-06", "price": 418.75 },
            { "date": "2025-01-03", "price": 415.32 },
            { "date": "2025-01-02", "price": 412.58 },
            { "date": "2024-12-31", "price": 410.92 },
            { "date": "2024-12-30", "price": 408.25 }
        ]
    },
    {
        "JNJ": [
            { "date": "2025-01-13", "price": 155.32 },
            { "date": "2025-01-10", "price": 154.88 },
            { "date": "2025-01-09", "price": 154.15 },
            { "date": "2025-01-08", "price": 153.45 },
            { "date": "2025-01-07", "price": 152.92 },
            { "date": "2025-01-06", "price": 152.25 },
            { "date": "2025-01-03", "price": 151.58 },
            { "date": "2025-01-02", "price": 150.92 },
            { "date": "2024-12-31", "price": 150.25 },
            { "date": "2024-12-30", "price": 149.75 }
        ]
    },
    {
        "PG": [
            { "date": "2025-01-13", "price": 168.45 },
            { "date": "2025-01-10", "price": 168.75 },
            { "date": "2025-01-09", "price": 169.05 },
            { "date": "2025-01-08", "price": 169.35 },
            { "date": "2025-01-07", "price": 169.58 },
            { "date": "2025-01-06", "price": 169.88 },
            { "date": "2025-01-03", "price": 170.15 },
            { "date": "2025-01-02", "price": 170.42 },
            { "date": "2024-12-31", "price": 170.65 },
            { "date": "2024-12-30", "price": 170.92 }
        ]
    },
    {
        "MRK": [
            { "date": "2025-01-13", "price": 98.75 },
            { "date": "2025-01-10", "price": 98.35 },
            { "date": "2025-01-09", "price": 97.92 },
            { "date": "2025-01-08", "price": 97.45 },
            { "date": "2025-01-07", "price": 97.08 },
            { "date": "2025-01-06", "price": 96.58 },
            { "date": "2025-01-03", "price": 96.15 },
            { "date": "2025-01-02", "price": 95.72 },
            { "date": "2024-12-31", "price": 95.35 },
            { "date": "2024-12-30", "price": 94.88 }
        ]
    },
    {
        "GOOGL": [
            { "date": "2025-01-13", "price": 195.82 },
            { "date": "2025-01-10", "price": 194.58 },
            { "date": "2025-01-09", "price": 193.92 },
            { "date": "2025-01-08", "price": 192.45 },
            { "date": "2025-01-07", "price": 191.88 },
            { "date": "2025-01-06", "price": 190.25 },
            { "date": "2025-01-03", "price": 188.75 },
            { "date": "2025-01-02", "price": 187.42 },
            { "date": "2024-12-31", "price": 186.15 },
            { "date": "2024-12-30", "price": 184.88 }
        ]
    },
    {
        "AMZN": [
            { "date": "2025-01-13", "price": 198.45 },
            { "date": "2025-01-10", "price": 196.15 },
            { "date": "2025-01-09", "price": 195.88 },
            { "date": "2025-01-08", "price": 194.25 },
            { "date": "2025-01-07", "price": 192.75 },
            { "date": "2025-01-06", "price": 190.42 },
            { "date": "2025-01-03", "price": 188.95 },
            { "date": "2025-01-02", "price": 187.58 },
            { "date": "2024-12-31", "price": 186.25 },
            { "date": "2024-12-30", "price": 184.88 }
        ]
    },
    {
        "TSM": [
            { "date": "2025-01-13", "price": 238.92 },
            { "date": "2025-01-10", "price": 242.15 },
            { "date": "2025-01-09", "price": 240.88 },
            { "date": "2025-01-08", "price": 239.45 },
            { "date": "2025-01-07", "price": 237.92 },
            { "date": "2025-01-06", "price": 235.58 },
            { "date": "2025-01-03", "price": 233.75 },
            { "date": "2025-01-02", "price": 231.42 },
            { "date": "2024-12-31", "price": 229.88 },
            { "date": "2024-12-30", "price": 227.95 }
        ]
    },
    {
        "NVDA": [
            { "date": "2025-01-13", "price": 145.62 },
            { "date": "2025-01-10", "price": 142.88 },
            { "date": "2025-01-09", "price": 141.25 },
            { "date": "2025-01-08", "price": 139.92 },
            { "date": "2025-01-07", "price": 138.15 },
            { "date": "2025-01-06", "price": 136.45 },
            { "date": "2025-01-03", "price": 134.88 },
            { "date": "2025-01-02", "price": 133.25 },
            { "date": "2024-12-31", "price": 131.75 },
            { "date": "2024-12-30", "price": 130.42 }
        ]
    },
    {
        "META": [
            { "date": "2025-01-13", "price": 598.32 },
            { "date": "2025-01-10", "price": 588.45 },
            { "date": "2025-01-09", "price": 585.92 },
            { "date": "2025-01-08", "price": 582.15 },
            { "date": "2025-01-07", "price": 578.88 },
            { "date": "2025-01-06", "price": 575.25 },
            { "date": "2025-01-03", "price": 572.45 },
            { "date": "2025-01-02", "price": 569.88 },
            { "date": "2024-12-31", "price": 567.25 },
            { "date": "2024-12-30", "price": 564.92 }
        ]
    },
    {
        "WMT": [
            { "date": "2025-01-13", "price": 99.28 },
            { "date": "2025-01-10", "price": 99.58 },
            { "date": "2025-01-09", "price": 99.92 },
            { "date": "2025-01-08", "price": 100.25 },
            { "date": "2025-01-07", "price": 100.45 },
            { "date": "2025-01-06", "price": 100.88 },
            { "date": "2025-01-03", "price": 101.15 },
            { "date": "2025-01-02", "price": 101.42 },
            { "date": "2024-12-31", "price": 101.75 },
            { "date": "2024-12-30", "price": 102.15 }
        ]
    },
    {
        "JPM": [
            { "date": "2025-01-13", "price": 232.85 },
            { "date": "2025-01-10", "price": 231.45 },
            { "date": "2025-01-09", "price": 230.92 },
            { "date": "2025-01-08", "price": 229.88 },
            { "date": "2025-01-07", "price": 229.15 },
            { "date": "2025-01-06", "price": 228.35 },
            { "date": "2025-01-03", "price": 227.58 },
            { "date": "2025-01-02", "price": 226.92 },
            { "date": "2024-12-31", "price": 226.15 },
            { "date": "2024-12-30", "price": 225.35 }
        ]
    },
    {
        "KO": [
            { "date": "2025-01-13", "price": 68.92 },
            { "date": "2025-01-10", "price": 69.08 },
            { "date": "2025-01-09", "price": 69.25 },
            { "date": "2025-01-08", "price": 69.42 },
            { "date": "2025-01-07", "price": 69.58 },
            { "date": "2025-01-06", "price": 69.75 },
            { "date": "2025-01-03", "price": 69.92 },
            { "date": "2025-01-02", "price": 70.08 },
            { "date": "2024-12-31", "price": 70.25 },
            { "date": "2024-12-30", "price": 70.42 }
        ]
    },
    {
        "DIS": [
            { "date": "2025-01-13", "price": 108.45 },
            { "date": "2025-01-10", "price": 106.88 },
            { "date": "2025-01-09", "price": 106.25 },
            { "date": "2025-01-08", "price": 105.15 },
            { "date": "2025-01-07", "price": 104.35 },
            { "date": "2025-01-06", "price": 103.45 },
            { "date": "2025-01-03", "price": 102.58 },
            { "date": "2025-01-02", "price": 101.92 },
            { "date": "2024-12-31", "price": 101.25 },
            { "date": "2024-12-30", "price": 100.42 }
        ]
    },
    {
        "CSCO": [
            { "date": "2025-01-13", "price": 58.32 },
            { "date": "2025-01-10", "price": 58.75 },
            { "date": "2025-01-09", "price": 59.08 },
            { "date": "2025-01-08", "price": 59.42 },
            { "date": "2025-01-07", "price": 59.75 },
            { "date": "2025-01-06", "price": 60.15 },
            { "date": "2025-01-03", "price": 60.45 },
            { "date": "2025-01-02", "price": 60.88 },
            { "date": "2024-12-31", "price": 61.25 },
            { "date": "2024-12-30", "price": 61.65 }
        ]
    },

*/