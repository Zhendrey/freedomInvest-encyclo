import { useSearchParams } from "react-router-dom";

export default function Filters ({filters, functions: [filterStocks]}) {
    const [searchParams,setSearchParams] = useSearchParams();

    function handleSelect(e){
        const key = e.target.name;
        const value = e.target.value;
        value !== 'all' && value !== 'any' ? searchParams.set(key,value) : searchParams.delete(key)
        filterStocks(searchParams)
        setSearchParams(searchParams)
    }

    const filtersElements = filters.map(({key, options})=>{
        const value = searchParams.get(key) || ''
        return (
            <article key={key} className="filter">
                <label className="p" htmlFor={key}>{key[0].toUpperCase() + key.slice(1,)}</label>
                <select value={value} onChange={(e)=>handleSelect(e)} className="filter__select" name={key} id={key}>
                    {options.map((option,index)=>{
                        return <option key={option} className={(value === option || !value && index==0) ? 'selected' : ''} value={option}>{option[0].toUpperCase() + option.slice(1,)}</option>
                    })}
                </select>
            </article>
        )
    })
    return (
        <section className="filters">
            {filtersElements}
            <button 
                onClick={()=>setSearchParams('')} 
                type="reset"
                className="filters__button"
            >Clear Filters</button>
        </section>
    );
};
