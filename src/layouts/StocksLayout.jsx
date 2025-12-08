import { Outlet, useLocation } from 'react-router-dom';
import '../css/style.css';
import { useUserInfo } from '../context/UserProvider';

export default function StocksLayout() {
    const location = useLocation();
    const [user] = useUserInfo();
    console.log(location.state);
    return (
        <main className="stocks-page page">
            <div className="page__container">
            {location.state?.from.includes('login') && (
                <h1 className='h3 stocks-page__title'>Hello, {user?.name}! Enjoy our various stock collection!</h1>
            )}
            <Outlet/>
            </div>
        </main>
    )
}