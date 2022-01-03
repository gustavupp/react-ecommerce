import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaBars } from "react-icons/fa";
import logo from './assets/logo.png';
import { menuLinks } from './constants/constants'
import { socialIcons } from './constants/constants';
import { AppContext } from './context'
import './styles/navbar.css';

const Navbar = () => {
    const { isSidebarOpen, openSidebar } = useContext(AppContext);
    //console.log(isSidebarOpen)

    return (
        <main className='main-navbar'>
            <div className='main-header'>
                <Link to='/'>
                    <img src={logo} alt='logo' />
                </Link>
                <button className='toggle-btn' onClick={openSidebar}>
                    <FaBars />
                </button>
                {/* Nav links container */}
                <div className='nav-links-container'>
                    <ul className='nav-links'>
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
                {/* social icons container */}
                <div className='social-links-container'>
                    <ul className='social-links'>
                        {
                            socialIcons.map((icon) => {
                                return (
                                    <a key={icon.id} href={icon.url}><li >{icon.icon}</li></a>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </main>
        )
}

export default Navbar;