import React from 'react';
import { navBarData } from './navBarData';
import '../App.css'

const SideNav = (props) => {
    return (
        <div className="sideNav" >
            <ul className='sideNavList'>
                {navBarData.map((val, key)=> {
                return (
                    <li key={key}
                    className='row'
                    onClick={()=> {window.location.pathname = val.link}}>
                        <div id='icon'>{val.icon}</div>
                        <div id='title'>{val.title}</div>
                    </li>
                )
                })}
            </ul>
        </div>
    );
};

export default SideNav;