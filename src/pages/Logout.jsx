import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../context/UserProvider"

export default function Logout(){
    const [user,setUser] = useUserInfo();
    const navigate = useNavigate();

    function handleLogOut(e){
        e.preventDefault()
        setUser(null)
        navigate('/', {replace: true})
    }
    return ( 
        <main className="main page">
            <div className="page__container">
                <section className="logout">
                    <div className="logout__heading">
                        <h1 className="h1">Are you sure you'd like to logout?</h1>
                        <h3 className="h3">You will be logged out of your account and redirected to the home page. You can log back in anytime.</h3>
                    </div>
                    <div className="logout__buttons buttons">
                        <button onClick={(e)=>{navigate(-1, {replace: true})}} className="button p logout__reject" type="reset">No</button>
                    <button onClick={(e)=>{handleLogOut(e)}} className="button p logout__accept" type="submit">Yes</button>
                    </div>
                </section>
            </div>
        </main>
    )
}