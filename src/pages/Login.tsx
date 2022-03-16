import React, { FC, useState } from 'react'
import "./Login.css"
import axios from 'axios'
import API_URL from '../api_url';
import { useNavigate } from 'react-router-dom';
import User from '../models/User';
import Account from '../models/Account';
import Notification from '../models/Notification'

interface LoginProps{
    setLoggedIn:(logged:boolean) => void,
}

const Login:FC<LoginProps> = ({setLoggedIn}) => {
    const [telephone, setTelephone] = useState('');
    const [password, setPassword]  = useState('');

    let navigate = useNavigate();
    const redirect = (url:string) =>{
        navigate(url);
    }

    const submitForm = () => {
        const loginUserCommand = {
            telephone: telephone,
            password:password
        }
        axios.post(API_URL+'/user/login', loginUserCommand)
        .then(response => {
            console.log(response.data)
            if(response.data.isSuccess){
                setLoggedIn(true);
                sessionStorage.setItem('id', response.data.userId)
                sessionStorage.setItem('token', `Bearer ${response.data.message}`)
                redirect("/dashboard");
            }
            else{
                alert(JSON.stringify(response.data));
            }
            setTelephone('');
            setPassword('');
        });


    }

  return (
    <div className='login__form'>
        <div className='login__header'>
            Login
        </div>
        <div className='login__row'>
            <label>Telephone:</label>
            <input className='login__input' type='text' value={telephone} onChange={(e) => setTelephone(e.target.value)}/>
        </div>
        <div className='login__row'>
            <label>Password:</label>
            <input className='login__input' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className='login__row'>
            <button className='login__btn' onClick={submitForm}>Login</button>
        </div>
        87476959046
        <div>87071958146 talgat</div>
    </div>
  )
}

export default Login