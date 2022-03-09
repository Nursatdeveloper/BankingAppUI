import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom';
import './LeftBar.css'

interface LeftBarProps{
    setLogout:(logout:boolean) => void
}

const LeftBar:FC<LeftBarProps> = ({setLogout}) => {
    let navigate = useNavigate();
    const redirect = (url:string) =>{
        navigate(url);
    }
    function logout(){
        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("id")
        setLogout(false)
        redirect('/login')
    }
  return (
    <div className='leftbar__container'>
        <a href="/messages">
            <div className='leftbar__item'>
                Сообщения
            </div>
        </a>
        <a href="/deposit">
            <div className='leftbar__item'>
                Пополнение
            </div>
        </a>
        <a href="/my-bank">
            <div className='leftbar__item'>
                Мой Банк
            </div>
        </a>
        <a href="/transfer">
            <div className='leftbar__item'>
                Переводы
            </div>
        </a>
        <a href="/notifications">
            <div className='leftbar__item'>
                Уведомления
            </div>
        </a>
        <a onClick={logout}>
            <div className='leftbar__item'>
                Выйти
            </div>
        </a>
    </div>
  )
}

export default LeftBar