import React, { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import API_URL from '../api_url';
import Account from '../models/Account'

interface AccountListProps{
    account:string
}

const AccountList:FC<AccountListProps> = ({account}) => {
    const [accounts, setAccounts] = useState<Account[]>([]);

    let navigate = useNavigate();
    const redirect = (url:string) =>{
        navigate(url);
    }

    useEffect(() => {
        getAccounts();
    },[])

    async function getAccounts() {
        const token = sessionStorage.getItem('token');
        const url = `${API_URL}/account/get-all-accounts`
        await fetch(url, {
            method:'GET',
            headers:{
                'Accept':'application/json',
                'Authorization':`${token}`
            }
        }).then(response => {
            if(response.status == 401) {
                alert('В целях безопасности перезайдите заново!')
                redirect('/login')
            }
            return response.json()
        })
        .then(result => {
            if(account === 'current'){
                var currentAccounts:Account[] = result.filter((account:Account) => account.accountType === 'Текущий счет')
                setAccounts(currentAccounts)
            } else {
                var depositAccounts:Account[] = result.filter((account:Account) => account.accountType === 'Депозит')
                setAccounts(depositAccounts)
            }
        })
        .catch(error => console.log(error));
    }
  return (
    <CurrentAccountListWrapper>
        {account === 'current' ?
        <div className='table_name'>
            Текущие счета
        </div> : 
        <div className='table_name'>
            Депозиты
        </div>}
        <CurrentAccountTable>
            <div className='table__header'>
                <div className='id'>
                    ID:
                </div>
                <div className='account__number'>
                    Счет:
                </div>
                <div className='owner__name'>
                    Клиент:
                </div>
                <div className='balance'>
                    Баланс:
                </div>
                <div className='currency'>
                    Валюта:
                </div>
                <div className='activated__date'>
                    Дата активации:
                </div>
                <div className='is_active'>
                    Активен:
                </div>
                <div className='is_blocked'>
                    Заблокирован:
                </div>
            </div>
            <div className='table__body'>
                {accounts.map((account, i) => 
                <div className='table__row' key={i++}>
                    <div className='id'>
                        {account.accountId}
                    </div>
                    <div className='account__number'>
                        {account.accountNumber}
                    </div>
                    <div className='owner__name'>
                        {account.ownerName}
                    </div>
                    <div className='balance'>
                        {account.balance}
                    </div>
                    <div className='currency'>
                        {account.currencyType}
                    </div>
                    <div className='activated__date'>
                        {account.activatedDate.slice(0, 10)}
                    </div>
                    <div className='is_active'>
                        {account.isActive ? 'Да' : 'Нет'}
                    </div>
                    <div className='is_blocked'>
                        {account.isBlocked ? 'Да' : 'Нет'}
                    </div>
                </div>
                )}
            </div>
        </CurrentAccountTable>
    </CurrentAccountListWrapper>
  )
}

export default AccountList

const CurrentAccountListWrapper = styled.div`
    width:92%;
    height:680px;
    position:absolute;
    top:90px;
    left:4%;
    right:4%;
    background-color:#f2f2f2;
    border-radius:10px;
    .table_name{
        text-align:center;
        margin-top:10px;
        font-size:18px;
    }
`

const CurrentAccountTable = styled.div`
    width:95%;
    margin-left:auto;
    margin-right:auto;
    border:1px solid #a6a6a6;
    margin-top:10px;
    height:90%;
    background-color:white;
    .table__header{
        background-color:#e3e3e3;
        display:flex;
        border-bottom:1px solid #a6a6a6;
        
    }
    .table__body{
        overflow-y:scroll;
        height:93%;
    }
    .table__row{
        display:flex;
        border-bottom:1px solid #a6a6a6;
    }
    div{ 
        text-align:center;
        font-size:14px;
        padding-top:3px;
        padding-bottom:4px;
    }
    .id{
        width:5%;
    }
    .account__number{
        width:20%;
    }
    .owner__name{
        width:20%;
    }
    .balance{
        width:15%;
    }
    .currency{
        width:6%;
    }
    .activated__date{
        width:17%;
    }
    .is_active{
        width:6%;
    }
    .is_blocked{
        width:11%;
    }
`