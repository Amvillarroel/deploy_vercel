import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import {Button, Input} from "@nextui-org/react";
import { inputStyles } from './inputStyles.js';

function Login() {
    const emailInput = useRef(null);
    const passwordInput = useRef(null);
    const navigate = useNavigate();
    const { login, logout } = useAuth();

    useEffect(() => {
        // Mantener sesión iniciada si hay un token en el local storage
        const localStorageToken = localStorage.getItem('token');
        if (!localStorageToken) return
        else {
            axios
                .post(`${import.meta.env.VITE_BACK}/islogged`, { localStorageToken })
                .then((res) => {
                    if (res.data.success) {
                        login();
                        navigate('/home');
                    }
                })
                .catch((err) => {
                    if (err.response.data.message === 'Token expirado') {
                        console.log('El token ha expirado');
                    } else {
                        console.log('Token no válido');
                    }
                    localStorage.clear();
                    logout();
                    navigate('/');
                });
        } //cierre del else
    }, []);

    // Enviar los datos al back para validar el usuario y la contraseña
    function handleSubmit(e) {
        e.preventDefault();
        const email = emailInput.current.value;
        const password = passwordInput.current.value;
        axios
            .get(`${import.meta.env.VITE_BACK}/login`, {
                params: {
                    email: email,
                    password: password,
                },
            })
            .then((res) => {
                if (res.data.token) {
                    const token = res.data.token;
                    const userAvatar = res.data.userAvatar;
                    localStorage.setItem('token', token);
                    localStorage.setItem('email', email);
                    localStorage.setItem('url_avatar', userAvatar);
                    login();
                    navigate('/home');
                }
            })
            .catch((err) => console.log('Error en usuario y/o contraseña desde el front'));
        emailInput.current.value = '';
        passwordInput.current.value = '';
    }

    return (
        <div style={{backgroundImage:'url("/Netflix-Background.jpg")'}} className='bgImage flex h-screen justify-center items-center'>
        <img src="/TatataFlix_logo.png" alt="logo" className='hidden sm:block absolute w-44 top-8 left-16'/>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-5 bg-black/80 rounded z-10'>
            <legend className='font-bold text-3xl'>Inicia sesión</legend>
            <Input type="email" autoComplete='user-name' label="Email" ref={emailInput} classNames={inputStyles}/>
            <Input type="password" autoComplete='current-password' label="Password" ref={passwordInput} classNames={inputStyles}/>
            <Button type='submit' color="danger">Iniciar sesión</Button>
            <p>¿Primera vez en nuestra app?
                <Link to='/register' className='text-blue-400 hover:text-sky-600'> Registrate ahora.</Link>
            </p>
        </form>
        </div>
    );
}

export default Login;
