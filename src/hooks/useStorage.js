import { useEffect, useState } from "react";

export default function useStorage(key,initValue,method='localStorage'){
    const storageMethod = eval(method);
    const [value,setValue] = useState((()=>{
        const value = storageMethod.getItem(key) ? JSON.parse(storageMethod.getItem(key)) : initValue
        return value
    })());

    useEffect(()=>{
        storageMethod.setItem(key,JSON.stringify(value))
    }, [value])

    return [value,setValue]
}