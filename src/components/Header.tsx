import React from 'react'
import "./Header.css"

const Header = () => {
  return (
    <div className='header__container'>
        <div className='header__left'>
            <div className='header__left_item'>
                <a href="/" className='logo__container'>Banking App</a>
            </div>
        </div>
        <div className='header__right'>
            <div className='login__container'>
                <a href="login">Login</a>
            </div>
            <div className='register__container'>
                <a href="register">Register</a>
            </div>
        </div>
    </div>
  )
}

export default Header