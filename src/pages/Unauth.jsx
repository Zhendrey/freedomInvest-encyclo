import { useRouteError } from "react-router-dom"

export default function Unauth(){
    const error = useRouteError();
    return <pre>Error occured. {error.message}</pre>
}