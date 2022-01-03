import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { menuLinks, socialIcons } from './constants/constants';
import logo from './assets/logo.png'
import './styles/sidebar.css';
import { FaRegWindowClose } from 'react-icons/fa';
import { AppContext } from './context';

const Sidebar = () => {
    const { isSidebarOpen, closeSidebar } = useContext(AppContext);

    return (
        //if isSidebarOpen is true, show the Sidebar Component
        <main className='sidebar-main' style={{ transform: `${isSidebarOpen? 'translate(0)': 'translate(-100%)'}` }}>
            <img className='logo' src={logo} alt='logo'></img>
            <div className='links-div'>
                <ul className='links-ul'>
                    {
                    menuLinks.map(link => {
                        return (
                            <li key={link.id}>
                                <Link to={link.url}>{link.text}</Link>
                            </li>
                        )
                    })
                    }
                </ul>
            </div>
            <div className='sidebar-social'>
                    <ul>
                        {
                        socialIcons.map(icon => {
                            return (
                                <a key={icon.id} href={icon.url}><li>{icon.icon}</li></a>
                            )
                        })
                        }
                    </ul>
            </div>
            <button className='close-btn' onClick={closeSidebar}>
                    <FaRegWindowClose />
            </button>
        </main>
    )
}

export default Sidebar;