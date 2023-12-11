import React, { useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Input } from '@nextui-org/react';
import { inputStyles } from './inputStyles.js';
import { AppRadioGruop } from './app_radio_group/app_radio_gruop.jsx';
import { useState } from 'react';

function Register() {
    const emailInput = useRef(null);
    const passwordInput = useRef(null);
    const navigate = useNavigate();
    const [userAvatar, setUserAvatar] = useState('_bird');

    // Enviar los datos al back para registrar el nuevo usuario en la BD
    function handleRegister(e) {
        e.preventDefault();
        const email = emailInput.current.value;
        const password = passwordInput.current.value;

        axios
            .get(`${import.meta.env.VITE_BACK}/register`, {
                params: {
                    email: email,
                    password: password,
                    avatar: userAvatar
                },
            })
            .then((res) => {
                if (!res.data.error) {
                    console.log('mensaje desde el front: el usuario fue creado con éxito');
                    navigate('/login');
                }
            })
            .catch((err) => console.log('Error al crear usuario desde el front'));

        emailInput.current.value = '';
        passwordInput.current.value = '';
    }

    return (
        <div style={{backgroundImage:'url("/Netflix-Background.jpg")'}} className='bgImage flex h-screen justify-center items-center'>
            <img src="/Netflix_2015_logo.svg.png" alt="logo" className='hidden sm:block absolute w-44 top-8 left-16'/>
            <form onSubmit={handleRegister} className='flex flex-col gap-4 p-5 bg-black/80 rounded z-10'>
                <legend className='font-bold text-3xl'>Registrarse</legend>
                <Input type="email" autoComplete='user-name' label="Email" ref={emailInput} classNames={inputStyles}/>
                <Input type="password" autoComplete='current-password' label="Password" ref={passwordInput} classNames={inputStyles}/>
                <AppRadioGruop onAvatarSeleccionado={(data) => setUserAvatar(data)}/>
                <Button type='submit' color="danger">Register</Button>
                <p>¿Ya estas registrado?
                    <Link to='/login' className='text-blue-400 hover:text-sky-600'> Ingresa acá.</Link>
                </p>
            </form>
        </div>
    );
}

export default Register;
