import { createElement } from "react"
import LinePriceChart from "./charts/LinePriceChart";
import VolumeBarChart from "./charts/VolumeBarChart";
import LoadingSkeleton from "./LoadingSkeleton";


ChartsComponent.Chart = function({parent, data, symbol, children}){
    const component = createElement(
        eval(parent),
        {data,symbol}, 
        <h3 className="h3">{symbol}'s {children}</h3>
    );
    return component
}
export default function ChartsComponent({chartsObj}){
    return chartsObj.map(({parent,data,symbol, content})=>{
        return <ChartsComponent.Chart
                key={parent}
                parent={parent}
                data={data}
                symbol={symbol}
                >{content}</ChartsComponent.Chart>
    })
}