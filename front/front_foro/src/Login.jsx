import react, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

function Login () {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    function handleSubmit (e) {
        e.preventDefault();
        axios.post('http://localhost:3000/login', {email, password})
        .then(res => console.log(res))
        .catch(err => console.log(res));
    }

    return (
        <div className='d-flex vh-100 justify-content-center align-items-center bg-primary'>
            <div className='p-3 bg-white w-25'>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' placeholder='Ingrese su email' className='form-control' onChange={e =>setEmail(e.target.value)}></input>
                    </div>     
                    <div className='mb-3'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' placeholder='Ingrese su contraseña' className='form-control' onChange={e =>setPassword(e.target.value)}></input>
                    </div>

                    <button className='btn btn-success'>Login</button>
                </form>
            
            </div>
        </div>
    )
}

export default Login