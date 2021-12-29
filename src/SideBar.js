import React from 'react';
import { Link } from 'react-router-dom';
import { menuLinks, socialIcons } from './constants/constants';
import logo from './assets/logo.png'
import './styles/sidebar.css';
import { FaRegWindowClose } from 'react-icons/fa';

const Sidebar = () => {
    return (
        <main className='sidebar-main'>
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
            <button className='close-btn'>
                    <FaRegWindowClose />
            </button>
        </main>
    )
}

export default Sidebar;