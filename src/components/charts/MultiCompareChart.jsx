import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import LoadingSkeleton from "../LoadingSkeleton";

export default function MultiCompareChart({data,children,symbols}){
    if(!data.length) return <LoadingSkeleton/>  
    const historicalData = data.map((obj,index)=>{
        const series = Object.values(obj)[0].map((obj,nIndex,arr)=>{
            const performance = ((arr[nIndex++].price - arr[0].price)/arr[0].price) * 100 + 100;
                                return {
                                    date: obj.date,
                                    [symbols[index]]: performance.toFixed(2)
                                }
                            })
        return series;
        }).flat().map((obj,index,arr)=>{
            arr.filter(({date})=>date===obj.date)
                                .map(mobj=>{
                                    return Object.assign(obj,mobj)
                                })
            return Object.assign(obj)
        }).slice(0,10)
    if(!historicalData.length) return <LoadingSkeleton/>
    return (
    <div className="chart chart--multi-comparison">
        {children}
        <LineChart
            style={{ width: '100%', aspectRatio: 1.618, maxWidth: 750, minWidth: 300 }} 
            data={historicalData}
            responsive
        >
                <CartesianGrid stroke="#aaa" strokeDasharray="5 5"/>
                {symbols.map((symbol,index)=>{
                    return <Line key={symbol} style={{opacity: 0.8}} stroke={data[index].color} dataKey={symbol} type="monotone" name={symbol} strokeWidth={2} />
                })}
                <XAxis dataKey="date" tick={'2025'}  />
                <YAxis label={{value: '%', position: 'insideLeft', angle: 0}}/>
                <Legend />
                <Tooltip />
        </LineChart>
    </div>
    )
}