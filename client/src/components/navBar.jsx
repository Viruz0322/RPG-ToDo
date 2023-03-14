import '../main.css';
import { navBarData } from "./navBarData";
import { Outlet, Link } from "react-router-dom";


export default function SideBar() {
    return (
        <>
            <div className="sideNav" >
                <ul className='sideNavList'>
                    {navBarData.map((val, key)=> {
                    return (
                        <Link to={val.link} 
                        key={key}
                        className='row'
                        id={val.title}
                        >
                            <div id='icon'>{val.icon}</div>
                            <div id='title'>{val.title}</div> 
                        </Link>
                    )
                    })}
                </ul>
            </div>
            <div id="Character-page">
                    <Outlet />
            </div>
        </>
    );
}


