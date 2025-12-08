import { useEffect, useState } from "react";

export default function useFetch(url){
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        fetch(url)
        .then(res=>res.json())
        .then(res=>setData(res))
        .catch(err=>setError(err))
        .finally(res=>setIsLoading(false))
    },[])

    return {fetched: [data,setData], isLoading, error}
}