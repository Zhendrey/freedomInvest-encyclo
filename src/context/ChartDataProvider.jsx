import { createContext, useContext, useEffect } from "react";
import useFetch from "../hooks/useFetch";

const ChartContext = createContext();
export default function ChartDataProvider({children}){
    const {fetched,isLoading,error} = useFetch('/src/data/stocks.json');
    const [stocks,setStocks] = fetched;

    useEffect(()=>{
        if(!isLoading && fetched){
        //CHART VARIABLES
        const pointsAmount = 10;
        
        //TIME
        const day = 1000 * 60 * 60 * 24;
        const currentTime = new Date();
    
        const chartsData = stocks.map((obj)=>{
            const pointsSet = [];
    
            for(let i = 0; i < pointsAmount; i++){
                const date = new Date(currentTime - ((pointsAmount - i-1) * day));
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                if(i < pointsAmount-1){
                            pointsSet.push(
                        {
                            date: `${year}/${month}/${date.getDate()}`, 
                            price: +((obj.price * (Math.random() * 0.1 + 0.9)).toFixed(2)), 
                            volume: +((obj.volume * (Math.random() * 0.2 + 0.8)).toFixed(0)),
                        }
                    )
                }else{
                    pointsSet.push(
                {
                    date: `${year}/${month}/${date.getDate()}`, 
                    price: obj.price,
                    volume: obj.volume,
                }
            )
                }
            }
            const priceChange = pointsSet[pointsSet.length - 1].price - pointsSet[pointsSet.length - 2].price
            return {[obj.symbol]: pointsSet, color: obj.color, dayChange: priceChange.toFixed(2), ...obj}
        })
        setStocks(chartsData)
        }
    },[])

    return (
        <ChartContext.Provider value={stocks}>
            {children}
        </ChartContext.Provider>
    )
}

export function useChartData(){
    return useContext(ChartContext)
}