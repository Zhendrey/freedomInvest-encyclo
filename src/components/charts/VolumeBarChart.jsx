import { Bar, BarChart, CartesianAxis, Legend, Tooltip, XAxis, YAxis } from "recharts";

export default function VolumeBarChart({children, data, symbol}){
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
    const historicalData = stock[symbol].map(({date,volume})=>{
        const amountOfZeroes = Math.floor(Math.log10(volume));
        const prefix = [
            {
                letter: 'k.',
                zeroes: 3 <= amountOfZeroes && amountOfZeroes <= 5,
                roundedLog: 3,
            },
            {
                letter: 'm.',
                zeroes: 6 <= amountOfZeroes && amountOfZeroes <= 8,
                roundedLog: 6,
            },
            {
                letter: 'b.',
                zeroes: 9 <= amountOfZeroes && amountOfZeroes <= 11,
                roundedLog: 9,
            },
            {
                letter: 'tr.',
                zeroes: 12 <= amountOfZeroes && amountOfZeroes <= 14,
                roundedLog: 12,
            },
        ].filter(({zeroes})=>zeroes)[0] || ''
        return {
            date,
            calcVolume: volume,
            volume: (volume/(Math.pow(10,6))).toFixed(2)
        }
    })
    const color = stock.color;
    console.log(historicalData);

    return (
    <div className="chart chart--volume">
        {children}
        <BarChart
            style={{ width: '100%', aspectRatio: 1.618, maxWidth: 750, minWidth: 300 }} 
            data={historicalData}
            responsive
        >
                <CartesianAxis stroke="#aaa" strokeDasharray="5 5"/>
                <Bar style={{opacity: 0.8}} fill={color} dataKey="volume" type="monotone" name="Volume" strokeWidth={2} />
                <XAxis dataKey="date"  />
                <YAxis dataKey="volume" label={{value: '$', position: 'insideLeft', angle: 0}}/>
                <Legend />
                <Tooltip />
        </BarChart>
    </div>
    )
}