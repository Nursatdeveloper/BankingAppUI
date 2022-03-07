import React from 'react'
import './LeftBar.css'

const LeftBar = () => {
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
    </div>
  )
}

export default LeftBar