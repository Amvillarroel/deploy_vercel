import React, { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import {Button, Link as linkNextUI, Input} from "@nextui-org/react";

function Login() {
    const emailInput = useRef(null);
    const passwordInput = useRef(null);
    const navigate = useNavigate();
    const { login, logout } = useAuth();

    useEffect(() => {
        // Mantener sesión iniciada si hay un token en el local storage
        const localStorageToken = localStorage.getItem('token');
        if (!localStorageToken) {
            console.log('No hay token en el local storage');
        } else {
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
                    localStorage.setItem('token', token);
                    login();
                    navigate('/home');
                }
            })
            .catch((err) => console.log('Error en usuario y/o contraseña desde el front'));

        emailInput.current.value = '';
        passwordInput.current.value = '';
    }

    return (
        <div style={{backgroundImage:'url("/Netflix-Background.jpg")'}} className='d-flex vh-100 justify-content-center align-items-center bg-dark'>
            <div style={{borderRadius:'16px'}} className='p-3 bg-dark w-30s'>
                <form >
                    <div className='mb-3'>
                        <Input type="email" variant="bordered" label="Email" ref={emailInput} />
                    </div>
                    <div className='mb-3'>
                        <Input type="password" variant="bordered" label="Password" ref={passwordInput} />
                    </div>
                    <div style={{display:'flex', gap:'8px'}}>
                        <Button onClick={handleSubmit} color="success">Login</Button>
                        <Link to='/register'>
                            <Button color="default">Go to Register</Button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
