import React from 'react'
import './MainSection.css'

const MainSection = () => {
  return (
    <div className='mainsection__container'>
      <div className='mainsection__row'>
        <div className='mainsection__item'>
          Make Deposit
        </div>
        <div className='mainsection__item'>
          Make Transfer
        </div>
        <div className='mainsection__item'>
          Create Account
        </div>
      </div>
    </div>
  )
}

export default MainSection