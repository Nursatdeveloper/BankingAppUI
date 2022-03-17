import React, { FC, useState } from 'react'
import axios from 'axios'
import API_URL from '../api_url';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


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
    <LoginWrapper>

    </LoginWrapper>
  )
}

export default Login

const LoginWrapper = styled.div`

`