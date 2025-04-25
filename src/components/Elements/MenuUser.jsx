import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'
import Image from './../../assets/Logo.png';
import axios from 'axios';

const MenuUser = () => {

    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(null); // <- Estado del usuario

    useEffect(() => {
        const token = localStorage.getItem('token');
    
        if (token) {
          axios
            .post(`${process.env.REACT_APP_API_URL}/checkUser`, { token })
            .then((res) => {
              setUser(res.data); // Guardamos los datos del usuario
            })
            .catch((err) => {
              console.error('Token inválido o expirado');
              localStorage.removeItem('token');
              setUser(null);
            });
        }
    }, []);

    const handleLinkClick = () => {
        setOpen(false);
    };

    const handleCloseAccountClick = () => {
        localStorage.removeItem('token');
        window.location.reload()
    };

    const location = useLocation();
    const locationPath = location.pathname;

    return(

        <nav className='navbar'>
            <div className='navbar-left'>
                <button onClick={() => setOpen(!open)} className="menu-button">☰</button>
                <div className={`menuNavigation ${open ? 'open' : ''}`}>
                    <h1 className="tittle-menu"> Menu </h1>
                    <div className='button-close-menu' onClick={handleLinkClick}> ✕ </div>
                    <ul>
                        <li className={`optionMenu ${locationPath === '/' ? 'active-link' : ''}`}> <Link to="/" onClick={handleLinkClick}> Inicio </Link> </li>
                        <li className={`optionMenu ${locationPath === '/Alergenos' ? 'active-link' : ''}`}> <Link to="/Alergenos" onClick={handleLinkClick}> Alergenos </Link> </li>
                        <li className={`optionMenu ${locationPath === '/Map' ? 'active-link' : ''}`}> <Link to="/Map" onClick={handleLinkClick}> Mapa </Link> </li>
                        <li className={`optionMenu ${locationPath === '/Cuenta' ? 'active-link' : ''}`}> <Link to="/" onClick={handleLinkClick}> Cuenta </Link> </li>
                    </ul>
                </div>
            </div>
            <div className='navbar-center'>
                    <Link to='/' className='tittle-navbar' onClick={handleLinkClick}>
                        <h2> Foodie Guard </h2>
                        <img src={Image} alt='logo' className='image-logo'/>
                    </Link>
            </div>
            <div className='navbar-right'>
                {user ? (
                    <div className='user-info-menu' onClick={handleCloseAccountClick}> {user.email} </div>
                ) : (
                    <Link to='/Login' className='login-button' onClick={handleLinkClick}>
                        Iniciar Sesión
                    </Link>
                )}
            </div>
        </nav>
    )

    

} 

export default MenuUser