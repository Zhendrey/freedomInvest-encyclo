import { Navigate } from "react-router-dom";
import { useUserInfo } from "../context/UserProvider";

export default function ProtectedRoute({children}){
    const [user] = useUserInfo();
    console.log(user);

    if(!user) return <Navigate to="/login"/>
    return children
}