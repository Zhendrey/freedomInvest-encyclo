import { Link, useLocation } from "react-router-dom";

export default function AddPage(){
    const location = useLocation();
    return (
        <>
            <h1 className="h2">No stock chosen</h1>
            <p className="h3">Choose another stock to compare with.</p>
            <Link 
            to={{
                pathname: '/stocks',
                search: location.search
            }}
            className="button"
            state={{from: location.pathname}}
            >Choose stock</Link>
        </>
    )
}