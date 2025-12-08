import { createContext, useContext, useEffect } from "react"
import useStorage from "../hooks/useStorage";
import { useLoaderData, useNavigation } from "react-router-dom";
import StockSkeleton from "../components/StockSkeleton";

const StocksContext = createContext();

export default function StocksProvider({children}){
    const loaderData = useLoaderData();
    const [stocks, setStocks] = useStorage('data', loaderData, 'sessionStorage');
    const navigation = useNavigation();
    console.log(loaderData);
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
            const priceChange = ((pointsSet[pointsSet.length - 1].price / pointsSet[pointsSet.length - 2].price) * 100) - 100
            return {[obj.symbol]: pointsSet, color: obj.color, priceChange: priceChange.toFixed(2), isShown: true, ...obj}
        })

        useEffect(()=>{
            setStocks(chartsData)
        }, [])

    if(navigation.state === 'loading' && !sessionStorage.getItem('data')) return (
        <main className="stock-page page">
            <div className="page__container">
                <StockSkeleton/>
            </div>
        </main>
    )
    return (
        <StocksContext.Provider value={[stocks, setStocks]}>
            {children}
        </StocksContext.Provider>
    )
}

export async function getStocks(){
    const res = await fetch('/src/data/stocks.json')
    const data = await res.json();
    return data;
}


export const useStocks = () => useContext(StocksContext)