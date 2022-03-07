import React, { useState } from 'react'
import './Register.css'
import axios from 'axios'
import API_URL from '../api_url';
import { useNavigate } from 'react-router-dom';

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
            return alert("Passwords do not match!")
        }
    }
    const validateIIN = (iin:string) => {
        if(iin.length !== 12){
            return alert("IIN must consist of 12 numbers!");
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
                return alert("IIN or date of birth is not valid");
            }
        }
    }
    const validatePhoneNumber = (telephone:string) => {
        if(telephone.length < 11 || telephone.length > 12){
            return alert("Invalid telephone number length!");
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
    <div className='register__form'>
        <div className='register__form_header'>
            Register
        </div>
        <div className='register__row'>
            <label>Firstname:</label>
            <input type="text" 
                className='register__input'
                value={firstName} 
                onChange={(e)=> setFirstName(e.target.value)}
            />
        </div>
        <div className='register__row'>
            <label>Lastname:</label>
            <input type="text" 
                className='register__input' 
                value={lastName} 
                onChange={(e)=> setLastName(e.target.value)}
            />
        </div>
        <div className='register__row'>
            <label>IIN:</label>
            <input type="text" 
                className='register__input' 
                value={iin} 
                onChange={(e)=> setIIN(e.target.value)} 
            />
        </div>
        <div className='register__row'>
            <label>Birth date:</label>
            <input type="date" 
                className='register__input' 
                value={birthdate} 
                onChange={(e)=> setBirthdate(e.target.value)} 
            />
        </div>
        <div className='register__row'>
            <label>Gender</label>
            <div className='gender_radio_input'>
                <label>Male</label>
                <input type='radio' 
                    name='gender' 
                    value="Мужской" 
                    checked={gender === 'Мужской'}
                    onChange={(e) => setGender(e.target.value)}
                />
                <label>Female</label>
                <input type="radio" 
                    name='gender' 
                    value="Женский" 
                    checked={gender === 'Женский'}
                    onChange={(e) => setGender(e.target.value)}
                />
            </div>
        </div>
        <div className='register__row'>
            <label>Phone number:</label>
            <input type="text" 
                className='register__input' 
                value={telephone} 
                onChange={(e)=> setTelephone(e.target.value)}
            />
        </div>
        <div className='register__row'>
            <label>Password:</label>
            <input type="text" 
                className='register__input' 
                value={password} 
                onChange={(e)=> setPassword(e.target.value)}
            />
        </div>
        <div className='register__row'>
            <label>Confirm Password:</label>
            <input type="text" 
                className='register__input' 
                value={consfirmPassword} 
                onChange={(e)=> setConfirmPassword(e.target.value)} 
            />
        </div>
        <div className='register__row'>
            <button className='register__btn' type='button' onClick={handleRegistration}>Register</button>
        </div>
    </div>
  )
}

export default Register