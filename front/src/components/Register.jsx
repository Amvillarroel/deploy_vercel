import React, { useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Input } from '@nextui-org/react';

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
            .get(`${import.meta.env.VITE_BACK}/register`, {
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
        <div style={{backgroundImage:'url("/Netflix-Background.jpg")'}} className='d-flex vh-100 justify-content-center align-items-center bg-dark'>
            <div style={{borderRadius:'16px'}} className='p-5 bg-dark w-30'>
                <form onSubmit={handleRegister}>
                    <div className='mb-3'>
                        <Input type="email" variant="bordered" label="Email" ref={emailInput} />
                    </div>
                    <div className='mb-3'>
                        <Input type="password" variant="bordered" label="Password" ref={passwordInput} />
                    </div>
                    <div style={{display:'flex', gap:'8px'}}>
                        <Button type='submit' color="success">Register</Button>
                        <Link to='/login'>
                            <Button color="default">Go to login</Button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
