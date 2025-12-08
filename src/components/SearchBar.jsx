import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function SearchBar({functions: [filterStocks]}){
    const [searchParams, setSearchParams] = useSearchParams();
    const [isFocused, setIsFocused] = useState(false);
    const query = searchParams.get("query") || '';
    const inputRef = useRef(null);
    const input = inputRef.current;

    useEffect(()=>{
        (()=>{if(input == document.activeElement) setIsFocused(true)})()
    }, [document.activeElement])
    useEffect(()=>{if(input) input.focus()}, [input])

    function handleInput(e){
        e.target.value ?
        searchParams.set("query", e.target.value)
        : searchParams.delete("query")
        setSearchParams(searchParams)
        filterStocks(searchParams)
    }
    return  (
        <div className="search-bar">
            {!isFocused && <label className="search-bar__label" htmlFor="stock-list__search">Click on the field below <br/> to start searching</label>}
            <input
                type="search" 
                name="search" 
                ref={inputRef}
                className="search-bar__input"
                onChange={(e)=>handleInput(e)}
                value={query}
                id="stocks-list__search" 
                placeholder='AAPL, MSFT, etc.'
            />
        </div>
    )
}