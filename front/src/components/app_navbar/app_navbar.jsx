import React from 'react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { AppDropdown } from '../app_dropdown/app_dropdown.jsx';
import { Input, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react';
import { SearchIcon } from './search_icon.jsx';

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
            <Navbar isBordered className='bg-inherit py-8'>
                <NavbarContent justify="start">
                    <NavbarBrand className="mr-4">
                        <img className='logo' src="/Netflix_2015_logo.svg.png" alt="logo" />
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
                    <Input
                    classNames={{
                        base: "max-w-full sm:max-w-[10rem] h-10",
                        mainWrapper: "h-full",
                        input: "text-small",
                        inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                    }}
                    placeholder="Type to search..."
                    size="sm"
                    startContent={<SearchIcon size={18} />}
                    type="search"
                    />
                    <AppDropdown logOut={logOut}/>
                </NavbarContent>
            </Navbar>
            {children}
        </>
    )
}

export { AppNavbar };