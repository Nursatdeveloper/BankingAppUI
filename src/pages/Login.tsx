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
    const [userType, setUserType] = useState('user');

    let navigate = useNavigate();
    const redirect = (url:string) =>{
        navigate(url);
    }

    const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
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
        <LogoWrapper>
            <img src={require('../images/logo.png')} />
        </LogoWrapper>
        <UserTypeWrapper>
            <div className='user_type' 
                onClick={() => setUserType('user')}
                style={userType === 'user' ? {borderBottom: '2px solid #002db3'} : {}}
            >
                Клиент
            </div>
            <div className='user_type' 
                onClick={() => setUserType('employee')}
                style={userType === 'employee' ? {borderBottom: '2px solid #002db3'} : {}}
            >
                Сотрудник
            </div>
        </UserTypeWrapper>
        <ClientLogin>
            <form onSubmit={submitForm}>
                <div className='login-item'>
                    <div className='input-wrapper'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone" viewBox="0 0 16 16">
                        <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                        </svg>
                        <input type='text'  value={telephone} onChange={(e) => setTelephone(e.target.value)}/>
                    </div>
                </div>
                <div className='login-item'>
                    <div className='input-wrapper'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock" viewBox="0 0 16 16">
                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/>
                        </svg>
                        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                </div>
                <div className='login-footer'>
                    <div><div>Станьте нашим клиентом!</div> <div className='register_link'><a href='/register'>Зарегистрируйтесь!</a></div></div>
                    <div className='login-btn'>
                        <button type='submit'>Войти</button>
                    </div>
                </div>
            </form>
        </ClientLogin>
    </LoginWrapper>
  )
}

export default Login

const LoginWrapper = styled.div`
    border:1px solid #cccccc;
    width:600px;
    height:500px;
    margin-right:auto;
    margin-left:auto;
    margin-top:100px;
    background-color:white;
`

const LogoWrapper = styled.div`
    width:fit-content;
    margin-right:auto;
    margin-left:auto;
    margin-top:10px;
    img{
        width:100px;
        height:90px;
    }
`

const UserTypeWrapper = styled.div`
    display:flex;
    width:fit-content;
    margin-left:auto;
    margin-right:auto;
    .user_type{
        width:200px;
        text-align:center;
        padding-bottom:5px;
        color:#002db3;
        font-weight:600;
        cursor:pointer;
    }
`

const ClientLogin = styled.div`
    margin-left:20px;
    margin-right:20px;
    .login-item{
        width:fit-content;
        margin-left:auto;
        margin-right:auto;
        padding-top:10px;
        padding-bottom:10px;
        padding-left:25px;
        padding-right:25px;
        margin-top:20px;
    }
    svg{
        color:#999;
        position:absolute;
        left:0;
        width:20px;
        height:20px;
        top:5px;
        left:10px;
    }

    .input-wrapper{
        width:250px;
        border:1px solid #a6a6a6;
        border-radius:5px;
        position:relative;
        padding-bottom:3px;
        input{
            width:200px;
            height:25px;
            margin-left:40px;
            border:0px;
            outline:none;
            font-size:16px;
            color:#4d4d4d;
        }
    }
    .login-footer{
        position:relative;
        width:400px;
        margin-left:auto;
        margin-right:auto;
        margin-top:20px;
        display:flex;
        .login-btn{
            position:absolute;
            right:70px;
            button{
                background-color:#002db3;
                color:white;
                border:0;
                padding-top:5px;
                padding-bottom:5px;
                padding-right:30px;
                padding-left:30px;
                border-radius:3px;
                font-size:14px;
            }
        }
        div{
            font-size:14px;
            color:#666;
            .register_link{
                a{
                    color:orange;
                }
            }
        }
    }
`