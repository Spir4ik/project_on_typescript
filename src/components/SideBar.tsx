import React, {useState} from 'react'
import iconMenuBtn from '../assets/icon-menuBtn.svg'
import iconMenuBtnShow from '../assets/icon-menuBtsShow.svg'
import iconUsername from '../assets/icon-username.svg'
import iconCommonData from '../assets/icon-commonData.svg'


const SideBar: React.FC = () => {
    const [isShow, setIsShow] = useState<boolean>(false);


    return(
        <div className="sidebar-content">
            {isShow && <div className="sidebar-window">

            </div>}
            {!isShow && <a className='show-menu' onClick={() => setIsShow(!isShow)}>
                <span className='show-menu-bar'>Project on typescript</span>
            </a>}
            <div className='sidebar-icon-list'>
                <ul>
                    <li><img src={iconUsername} alt=""/> Username</li>
                    <li><img src={iconCommonData} alt=""/> Список процессов</li>
                </ul>
            </div>
        </div>
    )
};

export default SideBar