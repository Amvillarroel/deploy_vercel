import React, { useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

function Login () {
    const emailInput = useRef(null);
    const passwordInput = useRef(null);

   //Enviar los datos al back para validar el usuario y la contraseña
    function handleSubmit (e) {
        e.preventDefault();
        const email = emailInput.current.value;
        const password = passwordInput.current.value;

        axios.post('http://localhost:3000/login', {email, password})
        .then(res => console.log(res))
        .catch(err => console.log(res));

        emailInput.current.value = '';
        passwordInput.current.value = '';
    }

    return (
        <div className='d-flex vh-100 justify-content-center align-items-center bg-primary'>
            <div className='p-3 bg-white w-25'>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' placeholder='Ingrese su email' className='form-control' ref={emailInput}></input>
                    </div>     
                    <div className='mb-3'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' placeholder='Ingrese su contraseña' className='form-control' ref={passwordInput}></input>
                    </div>
                    <button className='btn btn-success'>Login</button>
                </form>           
            </div>
        </div>
    )
}

export default Login