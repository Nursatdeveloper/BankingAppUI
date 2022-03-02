import React, { useState } from 'react'
import "./Login.css"
import axios from 'axios'

const Login = () => {
    const [telephone, setTelephone] = useState('');
    const [password, setPassword]  = useState('');

    const submitForm = () => {
        const loginUserCommand = {
            telephone: telephone,
            password:password
        }
        axios.post('https://localhost:44324/api/User/login', loginUserCommand)
        .then(response => console.log(response.data));

        setTelephone('');
        setPassword('');
    }

  return (
    <div className='login__form'>
        <div className='login__header'>
            Login
        </div>
        <div className='login__row'>
            <label>Telephone:</label>
            <input className='login__input' type='text' onChange={(e) => setTelephone(e.target.value)}/>
        </div>
        <div className='login__row'>
            <label>Password:</label>
            <input className='login__input' type='password' onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className='login__row'>
            <button className='login__btn' onClick={submitForm}>Login</button>
        </div>
    </div>
  )
}

export default Login