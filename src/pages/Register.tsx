import React from 'react'
import './Register.css'

const Register = () => {
  return (
    <div className='register__form'>
        <div className='register__form_header'>
            Register
        </div>
        <div className='register__row'>
            <label>Firstname:</label>
            <input type="text" className='register__input'/>
        </div>
        <div className='register__row'>
            <label>Lastname:</label>
            <input type="text" className='register__input'/>
        </div>
        <div className='register__row'>
            <label>IIN:</label>
            <input type="text" className='register__input'/>
        </div>
        <div className='register__row'>
            <label>Gender</label>
            <div className='gender_radio_input'>
                <label>Male</label>
                <input type='radio' name='gender' />
                <label>Female</label>
                <input type="radio" name='gender'/>
            </div>
        </div>
        <div className='register__row'>
            <label>Phone number:</label>
            <input type="text" className='register__input'/>
        </div>
        <div className='register__row'>
            <label>Password:</label>
            <input type="text" className='register__input'/>
        </div>
        <div className='register__row'>
            <label>Confirm Password:</label>
            <input type="text" className='register__input'/>
        </div>
        <div className='register__row'>
            <button className='register__btn'>Register</button>
        </div>
    </div>
  )
}

export default Register