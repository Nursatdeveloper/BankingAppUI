import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import API_URL from '../api_url';
import BankOperation from '../models/BankOperation'

const Transactions = () => {
  const [fromDate, setFromDate] = useState<string>('text');
  const [toDate, setToDate] = useState<string>('text');
  const [operations, setOperations] = useState<BankOperation[]>([]);

  useEffect(() => {
    const id = sessionStorage.getItem('id');
    const token = sessionStorage.getItem('token');
    const path = `${API_URL}/BankOperation/get-bank-operations/${id}`;
    setTimeout(() => fetch(path, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `${token}`
      },
    }).then (function (response) {return response.json()})
      .then(function (json) {
        console.log(json)
        setOperations(json);
      })
      .catch(function (error) {console.log(error)}), 1500)
  },[])

  return (
    <TransactionsWrapper>
      <TransactionHeader>
        <span>Операции</span>
        <div className='operation__period'>
          <span>Период:</span>
          <input type={fromDate} onFocus={()=> setFromDate('date')} placeholder="От"/>
          <input type={toDate} onFocus={()=> setToDate('date')} placeholder="До"/>
        </div>
      </TransactionHeader>
      <TransactionBody>
        <TransactionColumns style={{fontWeight:600, marginRight:20}}>
          <div className='type'>Вид операции</div>
          <div className='time'>Дата / Время</div>
          <div className='from'>Откуда</div>
            <div className='to'>Куда</div>
          <div className='amount'>Сумма</div>
          <div className='currency'>Валюта</div>
        </TransactionColumns>
        <TransactionList>
        {operations.map(operation => 
          <TransactionColumns key={operation.bankOperationId}>
            <div className='type'>{operation.bankOperationType}</div>
            <div className='time'>{operation.bankOperationTime.slice(0, 10)} / {operation.bankOperationTime.slice(12, 16)}</div>
            <div className='from'>{operation.fromAccount}</div>
            <div className='to'>{operation.toAccount}</div>
            <div className='amount' 
                style={operation.bankOperationType === 'Пополнение'?
                {color:'#46a062'} : {color:'#e65c4d'}  
            }>
              <span>
                {operation.bankOperationType === 'Пополнение'? '+' : '-'}
              </span>
              {operation.bankOperationMoneyAmount}
            </div>
            <div className='currency'>{operation.currencyType}</div>
        </TransactionColumns>
        ).reverse()}
        </TransactionList>
      </TransactionBody>
    </TransactionsWrapper>
  )
}

export default Transactions

const TransactionsWrapper = styled.div`
  border:1px solid #e3e3e3;
  height:300px;
  margin-left:20px;
  margin-right:20px;
  position:relative;
`

const TransactionHeader = styled.div`
  height:35px;
  border-bottom:1px solid #e3e3e3;
  color:#666;
  background-color:#f2f2f2;
  position:absolute;
  top:-0.5px;
  left:0;
  right:0;
  display:flex;
  align-items:center;
  span{
    margin-left:20px;
  }

  .operation__period{
    position:absolute;
    right:20px;
    display:flex;
    input{
      border:0;
      margin-left:20px;
      border-radius:3px;
      width:110px;
      outline:none;
    }
    input::placeholder{
      padding-left:20px;
    }
  }
  
`
const TransactionBody = styled.div`
 position:absolute;
 top:35px;
 right:0;
 left:0;
 bottom:0;

`
const TransactionColumns = styled.div`
  height:35px;
  border-bottom:1px solid #e3e3e3;
  display:flex;
  div{   
    color:#666;
    align-items:center;
    margin-top:5px;
    text-align:center;
    font-size:14px;
  }
  .type{
    width:15%;
  }
  .time{
    width:20%;
  }
  .from{
    width:22.5%;
  }
  .to{
    width:22.5%;
  }
  .amount{
    width:15%;
    
  }
  .currency{
    width:5%;
  }
`

const TransactionList =styled.div`
  position:absolute;
  top:35px;
  right:0;
  left:0;
  bottom:0;
  overflow-y:scroll;
`