import React from 'react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { AppDropdown } from './app_dropdown/app_dropdown.jsx';
import { Input, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react';
import { SearchIcon } from './search_icon/search_icon.jsx';
import { AppInput } from './app_input/app_input.jsx';

const AppNavbar = ({children}) => {
    //función con lógica para cierre de sesión 
    const { logout } = useAuth();
    const navigate = useNavigate();
    function logOut() {
    localStorage.clear();
    logout();
    navigate('/login');
    }

    return (
        <>
            <Navbar isBordered className='bg-dark py-8 border-none' classNames={{
                wrapper: [
                    "px-8",
                    "max-w-full"
                ]
            }}>
                <NavbarContent justify="start" className='max-w-md'>
                    <NavbarBrand>
                        <img src="/Netflix_2015_logo.svg.png" alt="logo" />
                    </NavbarBrand>
                    <NavbarContent className="hidden sm:flex gap-3">
                        <NavbarItem>
                            <Link href="#" aria-current="page" color="danger">Inicio</Link>
                        </NavbarItem>
                        <NavbarItem isActive>
                            <Link href="#" className='text-white font-bold'>Series</Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Link href="#" className='text-white font-bold'>Peliculas</Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Link href="#" className='text-white font-bold'>Favoritos</Link>
                        </NavbarItem>
                    </NavbarContent>
                </NavbarContent>
                <NavbarContent as="div" className="items-center" justify="end">
                    <AppInput />
                    <AppDropdown logOut={logOut}/>
                </NavbarContent>
            </Navbar>
            {children}
        </>
    )
}

export { AppNavbar };