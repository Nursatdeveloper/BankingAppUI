import axios from 'axios'
import React, { FC, useEffect, useState } from 'react'
import API_URL from '../api_url'
import Account from '../models/Account'
import './MainSection.css'

interface MainSectionProps{
  userId:number
}

const MainSection:FC<MainSectionProps> = ({userId}) => {
  const [account, setAccount] = useState<Account[]>([])

  useEffect(()=> {
    apiRequest();
  },[])

  async function apiRequest(){
    const id = sessionStorage.getItem("id");
    const response = await fetch(API_URL+'/account/get-accounts/'+id, {
      method: "GET",
      /*headers: {
          "Accept": "application/json",
          "Authorization": "Bearer " + token  
      }*/
    });
    if (response.ok === true) {     
        const data = await response.json();
        setAccount(data);
    }
    else
        apiRequest()
  }


  return (
    <div className='mainsection__container'>
      {account.map(account => 
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