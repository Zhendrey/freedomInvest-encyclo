import { useLocation, NavLink } from "react-router-dom"

export default function NavBar({links}){
    const location = useLocation();
    return (
        <nav className="navigation">
            <ul className="navigation__menu">
                    {links.map((link,index)=>{
                        return (
                            index===0 ?
                            <li className="navigation__link" key={link.path}>
                                <NavLink
                                to={{
                                    pathname: link.path,
                                    search: location.search
                                }}
                                end
                                >{link.name[0].toUpperCase() + link.name.slice(1,)}</NavLink>
                            </li> :
                            <li className="navigation__link" key={link.path}>
                                <NavLink
                                to={{
                                    pathname: link.path,
                                    search: location.search
                                }}
                                >{link.name[0].toUpperCase() + link.name.slice(1,)}</NavLink>
                            </li>
                        )
                    })}
            </ul>
    </nav>
    )
}