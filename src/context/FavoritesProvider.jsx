import { createContext, useContext } from "react";
import useStorage from "../hooks/useStorage";

const FavoritesContext = createContext();

export default function FavoritesProvider({children}){
    const [favoriteStocks, setFavoriteStocks] = useStorage('favoriteStocks', []);
    const functions = [addFavorite, removeFavorite];

    //functions
    function addFavorite(favStock){
        console.log('adding ' + favStock.symbol);
        setFavoriteStocks(prevStocks=>[...prevStocks, favStock])
    }
    function removeFavorite(favStock){
        setFavoriteStocks(prevStocks=>{
            const newStocks =  []
            for (const stock of prevStocks) {
                if(stock.symbol == favStock.symbol) continue;
                newStocks.push(stock)
            }
            return newStocks
        })
    }
    return (
        <FavoritesContext.Provider value={[favoriteStocks,functions]}>
            {children}
        </FavoritesContext.Provider>
    )
}

export function useFavorites(){
    return useContext(FavoritesContext)
}