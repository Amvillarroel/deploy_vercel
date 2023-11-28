import React from 'react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import Dropdown from 'react-bootstrap/Dropdown';
import './header.css';

const Header = () => {
    //función con lógica para cierre de sesión 
    const { logout } = useAuth();
    function logOut() {
    localStorage.clear();
    logout();
    navigate('/login');
    }

    return (
        <header className='header' >
            <nav className='navbar' >
                <div className='nav'>
                    <picture>
                        <a href="#">
                            <img className='logo' src="/Netflix_2015_logo.svg.png" alt="logo" />
                        </a>
                    </picture>
                    <ul className='menu' >
                        <li className='menu__item'>
                            <button className='btn menu__btn' onClick={() => console.log('Home')}>Home</button>
                        </li>
                        <li className='menu__item'>
                            <button className='btn menu__btn' onClick={() => console.log('Movies')}>Movies</button>
                        </li>
                        <li className='menu__item'>
                            <button className='btn menu__btn' onClick={() => console.log('Series')}>Series</button>
                        </li>
                        <li className='menu__item'>
                            <button className='btn menu__btn' onClick={() => console.log('Favoritos')}>Favoritos</button>
                        </li>
                    </ul>
                </div>

                <form className='form' action="">
                    <input className='form__search' type="text" placeholder='Titulos, generos'/>
                    
                    <Dropdown >
                        <Dropdown.Toggle className='user' id="dropdown-basic">
                            <img className='user__icon' src="/login.png" alt="" />
                        </Dropdown.Toggle>

                        <Dropdown.Menu className='user__menu'>
                            <Dropdown.ItemText className='user__item'>Nombre de usuario</Dropdown.ItemText>
                            <Dropdown.Divider style={{backgroundColor:'white'}}/>
                            <Dropdown.ItemText className='user__item'>
                                <button className='btn btn__logout' onClick={logOut}>Cerrar sesión</button>
                            </Dropdown.ItemText>
                        </Dropdown.Menu>
                    </Dropdown>
                </form>
            </nav>
        </header>
    )
}

export { Header };