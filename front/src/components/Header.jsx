import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx'

const Header = () => {
    //función con lógica para cierre de sesión 
    const { logout } = useAuth();
    function logOut() {
    localStorage.clear();
    logout();
    navigate('/login');
    }

    return (
        <header style={{padding: '0 32px', backgroundColor:'#003d96'}}>
            <nav style={{height:'68px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <section style={{height:'68px', display:'flex', gap:'8px', justifyContent:'space-between', alignItems:'center'}}>
                    <picture>
                        <a style={{display:'inline-block'}} href="#">
                            <img style={{maxWidth:'150px'}} src="/Netflix_2015_logo.svg.png" alt="logo" />
                        </a>
                    </picture>
                    <ul style={{ margin:'0', listStyle:'none', display:'flex', gap:'8px', justifyContent:'space-between'}}>
                        <li style={{color:'white'}}>Home</li>
                        <li style={{color:'white'}}>Movies</li>
                        <li style={{color:'white'}}>Series</li>
                    </ul>
                </section>

                <form action="">
                    <input type="text" placeholder='Titulos, generos'/>
                    <button onClick={logOut}>Cerrar sesión</button>
                </form>
            </nav>
        </header>
    )
}

export { Header };