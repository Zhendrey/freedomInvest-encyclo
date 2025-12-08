import { useEffect, useState } from "react";
import Logo from '../assets/icons/logo.svg'
import { NavLink, Link, useLocation } from "react-router-dom";
import { nanoid } from "nanoid";

export default function Header({paths}){
    //HOOKS AND STATES
    const [isActive, setIsActive] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

        //SIDE-EFFECTS
    useEffect(()=>{
        const handleScroll = () => {
            (window.innerWidth > 1024 && window.scrollY > 0) ? setIsScrolled(true) : setIsScrolled(false)
        }
        window.addEventListener('scroll', handleScroll)
        return ()=>{window.addEventListener('scroll', handleScroll)}
    }, [])
    useEffect(()=>{
        function handleResize(){
            if(window.innerWidth >= 1024){
                setIsActive(false)
            }
        }
        window.addEventListener('resize', handleResize)
        return ()=>{window.addEventListener('resize', handleResize)}
    }, [])

    return (
        <header className={`header${isScrolled ? ' scrolled' : ''}`}>
            <div className='header__container'>
                <Link to="/" className="header__logo">
                    <img src={Logo} alt="freedomInvest enciclopedia" />
            </Link>
                <nav className='header__navigation'>
                    <a onClick={()=>setIsActive(prev=>!prev)} className={`header__burger ${isActive ? 'active' : ''}`}>
                        <span></span>
                    </a>
                    <ul className="header__menu">
                        {paths.map((path,index,arr)=>{
                            const link = <li key={nanoid(4)} className={`header__link ${index == arr.length-1 ? 'button' : ''}`}><NavLink to={{
                            pathname: path.path,
                            search: location.search
                        }}>{path.name}</NavLink></li>;
                            return path.isAuthRequired ? path.isLogIn ? link : '' : link;
                        })}
                        {/* <li className='header__link'><NavLink to="/" end>Home</NavLink></li>
                        <li className='header__link'><NavLink to={{
                            pathname: "/stocks",
                            search: location.search
                        }}>Stocks</NavLink></li>
                        <li className='header__link'><NavLink to={{
                            pathname: "/favorites",
                            search: location.search
                        }} state={{from: location}}>Favorites</NavLink></li>
                        <li className='header__link'><NavLink to="/compare">Compare</NavLink></li>
                        <li className='header__link'><NavLink to="/about">About</NavLink></li>
                        <li className='header__link'><NavLink className="button" to="/login">Login</NavLink></li> */}
                    </ul>
                </nav>
            </div>
        </header>
    )
}