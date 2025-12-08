import useStorage from "../hooks/useStorage";
import { createContext, useContext } from "react";

const UserContext = createContext();

export default function UserProvider({children}){
    const [user, setUser] = useStorage('user', null)
    return (
        <UserContext.Provider value={[user,setUser]}>
            {children}
        </UserContext.Provider>
    );
}

export function useUserInfo(){
    return useContext(UserContext)
}