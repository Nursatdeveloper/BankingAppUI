import React, { useState } from 'react'
import axios from 'axios'
import API_URL from '../api_url';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


const Register = () => {
    let navigate = useNavigate();
    const redirect = (url:string) =>{
        navigate(url);
    }

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [iin, setIIN] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [gender, setGender] = useState('');
    const [telephone, setTelephone] = useState('');
    const [password, setPassword] = useState('');
    const [consfirmPassword, setConfirmPassword] = useState('');

    const handleRegistration = () => {
        passwordsMatch(password, consfirmPassword);
        validateIIN(iin);
        validateBirthdate(birthdate);
        validatePhoneNumber(telephone);
        const createUserCommand = {
            firstName: firstName,
            lastName: lastName,
            iin: iin,
            birthDate: birthdate,
            gender: gender,
            phoneNumber: telephone,
            password: password
        }
        axios.post(API_URL+'/user/create-user', createUserCommand)
            .then(response => {
                console.log(response.data)
                if(response.data.isSuccess){
                    resetForm();
                    alert(JSON.stringify(response.data.message));
                    redirect("/login");
                }
                else{
                    alert(JSON.stringify(response.data.message));
                }
            })
        
    }

    const passwordsMatch = (password:string, confirmPassword:string) => {
        if(password !== confirmPassword){
            setPassword('');
            setConfirmPassword('');
            return alert("Пароль не совпал!")
        }
    }
    const validateIIN = (iin:string) => {
        if(iin.length !== 12){
            return alert("ИИН должен состоять из 12 цифр!");
        }
    }
    const validateBirthdate = (date:string) => {
        let validator:string = "";
        validator += date[2];
        validator += date[3];
        validator += date[5];
        validator += date[6];
        validator += date[8];
        validator += date[9];
        for(let i = 0; i < 6; i++){
            if(iin[i] !== validator[i]){
                return alert("ИИН или дата рождения введена неправильно!");
            }
        }
    }
    const validatePhoneNumber = (telephone:string) => {
        if(telephone.length < 11 || telephone.length > 12){
            return alert("Неверная длина номара телефона!");
        }
    }
    
    const resetForm = () => {
        setFirstName('');
        setLastName('');
        setIIN('');
        setBirthdate('');
        setGender('');
        setTelephone('');
        setPassword('');
        setConfirmPassword('');
    }

  return (
      <RegisterForm>
          <RegisterHeader>
            <LogoWrapper>
                <img src={require('../images/logo.png')} />
            </LogoWrapper>
            <div className='header__text'>
                Регистрация
            </div>
          </RegisterHeader>
          <form >
            <div className='register__row'>
                <label>Имя:</label>
                <input type="text" 
                    className='register__input'
                    value={firstName} 
                    onChange={(e)=> setFirstName(e.target.value)}
                />
            </div>
            <div className='register__row'>
                <label>Фамилия:</label>
                <input type="text" 
                    className='register__input' 
                    value={lastName} 
                    onChange={(e)=> setLastName(e.target.value)}
                />
            </div>
            <div className='register__row'>
                <label>ИИН:</label>
                <input type="text" 
                    className='register__input' 
                    value={iin} 
                    onChange={(e)=> setIIN(e.target.value)} 
                />
            </div>
            <div className='register__row'>
                <label>Дата рождения:</label>
                <input type="date" 
                    className='register__input' 
                    value={birthdate} 
                    onChange={(e)=> setBirthdate(e.target.value)} 
                />
            </div>
            <div className='register__row'>
                <div>
                    <label>Пол:</label>
                </div>
                <div className='gender_radio_input'>
                    <label>Мужской</label>
                    <input type='radio' 
                        name='gender' 
                        value="Мужской" 
                        checked={gender === 'Мужской'}
                        onChange={(e) => setGender(e.target.value)}
                    />
                    <label>Женский</label>
                    <input type="radio" 
                        name='gender' 
                        value="Женский" 
                        checked={gender === 'Женский'}
                        onChange={(e) => setGender(e.target.value)}
                    />
                </div>
            </div>
            <div className='register__row'>
                <label>Моб. телефон:</label>
                <input type="text" 
                    className='register__input' 
                    value={telephone} 
                    onChange={(e)=> setTelephone(e.target.value)}
                />
            </div>
            <div className='register__row'>
                <label>Пароль:</label>
                <input type="password" 
                    className='register__input' 
                    value={password} 
                    onChange={(e)=> setPassword(e.target.value)}
                />
            </div>
            <div className='register__row'>
                <label>Подтвердить пароль:</label>
                <input type="password" 
                    className='register__input' 
                    value={consfirmPassword} 
                    onChange={(e)=> setConfirmPassword(e.target.value)} 
                />
            </div>
            <div className='register__row'>
                <a href="/login" className='return_back'>Назад</a>
                <button className='register__btn' type='submit' onClick={handleRegistration} >Зарегистрироваться</button>
            </div>
          </form>
 
      </RegisterForm>
   
  )
}

export default Register

const RegisterForm = styled.div`
    border:1px solid #cccccc;
    width:600px;
    height:500px;
    margin-right:auto;
    margin-left:auto;
    margin-top:100px;
    background-color:white;

    .register__row{
        margin-left:30px;
        margin-right:30px;
        position:relative;
        margin-top:10px;
        width:350px;
        margin-left:auto;
        margin-right:auto;
        label{
            font-size:14px;
        }
    }
    .register__input{
        position:absolute;
        right:10px;
        outline:none;
    }
    .gender_radio_input{
        margin-left:20px;
        label{
            margin-left:30px;
        }
    }
    .register__btn{
        position:absolute;
        right:10px;
        background-color:#002db3;
        color:white;
        border:0;
        padding-top:5px;
        padding-bottom:5px;
        padding-right:10px;
        padding-left:10px;
        border-radius:3px;
        font-size:13px;
        cursor:pointer;
    }
    .return_back{
        font-size:14px;
        color:orange;
        text-decoration:none;
        :hover{
            text-decoration:underline;
        }
    }
`

const RegisterHeader = styled.div`
    .header__text{
        text-align:center;
        font-size:20px;
        color:#4d4d4d;
    }
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