import React, { useEffect, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx'

function Login () {
    const emailInput = useRef(null);
    const passwordInput = useRef(null);
    const navigate = useNavigate();
    const { login, logout } = useAuth();

    useEffect (()=>{
    //mantener sesión iniciada si hay un token en el local storage
    const localStorageToken = localStorage.getItem('token');
    if (!localStorageToken) {console.log('No hay token en el local storage')}
    
    else {
    axios.post('https://deploy-vercel-jvr07cbz1-amnels-projects.vercel.app/islogged', {localStorageToken})
    .then(res => {
        if (res.data.success) {
            login();
            navigate('/home');
        }     
    })
        .catch(err => {
            if (err.response.data.message === 'Token expirado'){
                console.log('El token ha expirado')
            }
            else {
                console.log('Token no válido');
            }
            
            localStorage.clear();
            logout();
            navigate('/login')
    });
        } //cierre del else
    }, []);
        
   //Enviar los datos al back para validar el usuario y la contraseña
   function handleSubmit(e) {
    e.preventDefault();
    const email = emailInput.current.value;
    const password = passwordInput.current.value;

    axios.get('https://deploy-vercel-jvr07cbz1-amnels-projects.vercel.app/login', {
        params: {
            email: email,
            password: password
        }
    })
    .then(res => {
        if (res.data.token) {
            const token = res.data.token;
            localStorage.setItem('token', token);
            login();
            navigate('/home');
        }
    })
    .catch(err => console.log('Error en usuario y/o contraseña desde el front'));

    emailInput.current.value = '';
    passwordInput.current.value = '';
}

    return (
        <div className='d-flex vh-100 justify-content-center align-items-center bg-primary'>
            <div className='p-3 bg-white w-30'>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' defaultValue='amvillarroel@gmail.com' placeholder='Ingrese su email' className='form-control' ref={emailInput}></input>
                    </div>     
                    <div className='mb-3'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' defaultValue='123456' placeholder='Ingrese su contraseña' className='form-control' ref={passwordInput}></input>
                    </div>
                    <button className='btn btn-success'>Login</button>
                </form>           
            </div>
        </div>
    )
}

export default Login