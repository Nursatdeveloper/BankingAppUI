import axios from 'axios'
import React, { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API_URL from '../api_url'
import LeftBar from '../components/LeftBar'
import Account from '../models/Account'
import './MyBank.css'


interface MyBankProps{
    setLogout:(logout:boolean) => void
}
const MyBank:FC<MyBankProps> = ({setLogout}) => {
    const [accounts, setAccounts] = useState<Account[]>([])
    const [telephone, setTelephone] = useState<string>('');
    let navigate = useNavigate();
    const redirect = (url:string) =>{
        navigate(url);
    }
    useEffect(()=>{
        const id = sessionStorage.getItem("id")
        axios.get(API_URL+'/user/get-user-by-id/'+id)
        .then(response => {
            if(response.data.accounts.length !== 0){
                setAccounts(response.data.accounts)
                setTelephone(response.data.phoneNumber)
            }
        })
    },[])

    async function toggleAccount(accountType:string, status:boolean){
        const password = prompt("Пароль: ")

        const accountCommand = {
            telephone: telephone,
            accountType: accountType,
            password:password
        }
        if(status){
            const response = await axios.post(API_URL+'/account/deactivate-account', accountCommand)
           alert(response.data)
        }else{
            const response = await axios.post(API_URL+'/account/activate-account', accountCommand)
            const res = response.data
            alert(response.data)
        }
        window.location.reload()

    }
  return (
    <div className='mybank__container'>
        <LeftBar setLogout={setLogout}/>
        {accounts.length !== 0 ?
            <div className='mybank__accounts'>
                {accounts.map((account, i) => 
                    <div key={i++} className='mybank__account'>
                        <div>{account.accountType}</div>
                        <div>IBAN: {account.accountNumber}</div>
                        <div>Доступно: {account.balance} {account.currencyType}</div>
                        <div>Клиент: {account.ownerName}</div>
                        <div>ИИН: {account.ownerIIN}</div>
                        <div>Дата открытия: {account.activatedDate.slice(0, 10)}</div>
                        <div>Активен: {account.isActive ? "Да": "Нет"}</div>
                        <div>Заблокирован: {account.isBlocked ? "Да": "Нет"}</div>
                        <div>
                        <button onClick={()=>toggleAccount(account.accountType, account.isActive)} className='deactivate__account'>
                            {account.isActive ?
                            "Деактивировать" :
                            "Активировать"}
                        </button>
                        </div>
                    </div>
                )}
            </div>
        
        :null}

    </div>
  )
}

export default MyBank
