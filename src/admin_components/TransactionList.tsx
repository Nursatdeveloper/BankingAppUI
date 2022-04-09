import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import API_URL from '../api_url';
import BankOperation from '../models/BankOperation';


const TransactionList = () => {
    const [bankOperations, setBankOperations] = useState<BankOperation[]>([]);
    
    let navigate = useNavigate();
    const redirect = (url:string) =>{
        navigate(url);
    }

    useEffect(() => {
        getTransactions();

    }, [])

    async function getTransactions() {
        const token = sessionStorage.getItem('token');
        const url = `${API_URL}/bankoperation/get-all-bankoperations`
        await fetch(url, {
            method:"GET",
            headers:{
                'Accept':'application/json',
                'Authorization':`${token}`
            }
        }).then(response => {
            if(response.status === 401) {
                alert('В целях безопасности перезайдите заново!')
                redirect('/login')
            } else if (response.status === 500) {
                getTransactions();
            } else {
                return response.json()
            }
        })
        .then(operations => setBankOperations(operations))
        .catch(error => console.log(error));

    }

  return (
    <TransactionListWrapper>
        <div className='header'>Переводы и пополнения</div>
        <TransactionTable>
            <div className='table__header'>
                <div className='id'>
                    ID:
                </div>
                <div className='from_account'>
                    Отправитель:
                </div>
                <div className='to_account'>
                    Получатель:
                </div>
                <div className='type'>
                        Тип:
                    </div>
                <div className='amount'>
                    Сумма:
                </div>
                <div className='currency'>
                    Валюта:
                </div>
                <div className='date'>
                    Дата операции:
                </div>

            </div>
            <div className='transaction__body'>
                {bankOperations.map((operation, i) => 
                <div className='transaction__row' key={i++}>
                    <div className='id'>
                        {operation.bankOperationId}
                    </div>
                    <div className='from_account'>
                        <div className='big'>
                            {operation.bankOperationMaker}
                        </div>
                        <div className='small'>
                            {operation.fromAccount}
                        </div>
                    </div>
                    <div className='to_account'>
                        <div className='big'>
                            {operation.bankOperationParticipant}  
                        </div>
                        <div className='small'>
                            {operation.toAccount}
                        </div>
                    </div>
                    <div className='type'>
                        {operation.bankOperationType}
                    </div>
                    <div className='amount'>
                        {operation.bankOperationMoneyAmount}
                    </div>
                    <div className='currency'>
                        {operation.currencyType}
                    </div>
                    <div className='date'>
                        {operation.bankOperationTime}
                    </div>
                </div>
                ).reverse()}
            </div>
        </TransactionTable>
    </TransactionListWrapper>
  )
}

export default TransactionList

const TransactionListWrapper = styled.div`
    width:92%;
    height:680px;
    position:absolute;
    top:90px;
    left:4%;
    right:4%;
    background-color:#f2f2f2;
    border-radius:10px;
    .header{
        text-align:center;
        margin-top:10px;
        font-size:18px;
        color:#4d4d4d;
    }
`

const TransactionTable = styled.div`
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
        padding-right:10px;
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
    .from_account{
        width:15%;
    }
    .to_account{
        width:15%;
    }
    .type{
        width:15%;
    }
    .amount{
        width:15%;
    }

    .currency{
        width:10%;
    }
    .date{
        width:30%;
    }


    .transaction__row{
        width:100%;
        display:flex;
        border-bottom:1px solid #a6a6a6;
    }
    .transaction__body{
        overflow-y:scroll;
        height:93%;
    }

    .small{
        font-size:10px;
    }
`