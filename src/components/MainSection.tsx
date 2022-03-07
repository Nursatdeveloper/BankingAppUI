import axios from 'axios'
import React, { FC, useEffect } from 'react'
import API_URL from '../api_url'
import Account from '../models/Account'
import './MainSection.css'

interface MainSectionProps{
  accounts:Account[]
}

const MainSection:FC<MainSectionProps> = ({accounts}) => {

  useEffect(()=> {
    axios.post(API_URL+'')
  },[])

  return (
    <div className='mainsection__container'>
      {accounts.map(account => 
        <div key={account.accountId} className='mainsection__row'>
          <div className='accountType__container'>{account.accountType}</div>
          <div className='accountNumber__container'>{account.accountNumber}</div>
          <div className='balance__container'>Доступно: {account.balance}</div>
          <div className='currencyType__container'>{account.currencyType}</div>
        </div>
      )}

    </div>
  )
}

export default MainSection