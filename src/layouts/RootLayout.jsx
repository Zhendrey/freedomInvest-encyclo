import { Outlet } from 'react-router-dom';
import '../css/style.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useUserInfo } from '../context/UserProvider';

export default function RootLayout() {
    const [user] = useUserInfo();
    console.log(user);
    const paths = [
        {path: '/', name: 'Home'},
        {path: 'stocks', name: 'Stocks'},
        {path: 'favorites', name: 'Favorites', isAuthRequired: true, isLogIn: Boolean(user)},
        {path: 'compare', name: 'Compare', isAuthRequired: true, isLogIn: Boolean(user)},
        {path: 'about', name: 'About'},
        {path: 'login', name: 'Login', isAuthRequired: true, isLogIn: !Boolean(user)},
        {path: 'logout', name: 'Logout', isAuthRequired: true, isLogIn: Boolean(user)},
    ]
    return (
        <div className="wrapper">
            <Header paths={paths}/>
            <Outlet />
            <Footer/>
        </div>
    );
}