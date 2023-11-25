import React, { useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
    const emailInput = useRef(null);
    const passwordInput = useRef(null);
    const navigate = useNavigate();

    // Enviar los datos al back para registrar el nuevo usuario en la BD
    function handleRegister(e) {
        e.preventDefault();
        const email = emailInput.current.value;
        const password = passwordInput.current.value;

        axios
            .get('https://deploy-vercel-api.vercel.app/', {
                params: {
                    email: email,
                    password: password,
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
        <div className='d-flex vh-100 justify-content-center align-items-center bg-primary'>
            <div className='p-5 bg-white w-30'>
                <form onSubmit={handleRegister}>
                    <div className='mb-3'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' placeholder='Ingrese su email' className='form-control' ref={emailInput}></input>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' placeholder='Ingrese su contraseña' className='form-control' ref={passwordInput}></input>
                    </div>
                    <button type='submit' className='btn btn-success'>
                        Register
                    </button>
                    {/* Utilizar Link de React Router en lugar de <a> */}
                    <Link to='/login' className='btn btn-primary mx-2'>
                        Go to login
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Register;
