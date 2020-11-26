import React from 'react'
import {Link} from "react-router-dom";
import iconUsername from '../assets/icon-username.svg'
import iconCommonData from '../assets/icon-commonData.svg'


const SideBar: React.FC = () => {
    return(
        <div className="sidebar-content">
            <a className='show-menu'>
                <span className='show-menu-bar'>Project on typescript</span>
            </a>
            <div className='sidebar-icon-list'>
                <ul>
                    <Link to='/edituser'>
                        <li><img src={iconUsername} alt=""/> Username</li>
                    </Link>
                    <Link to='/process'>
                        <li><img src={iconCommonData} alt=""/> Список процессов</li>
                    </Link>
                </ul>
            </div>
        </div>
    )
};

export default SideBar