import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import API_URL from '../api_url';
import BankOperation from '../models/BankOperation'

interface TransactionsProps {
  setBankOperations:(operations: BankOperation[]) => void,
  accountType:string,
  userName:string
}

const Transactions:FC<TransactionsProps> = ({setBankOperations, accountType, userName}) => {
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [operations, setOperations] = useState<BankOperation[]>([]);

  const [from, setFrom] = useState<string>('');

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
        const bankOperations = getBankOperations(json);
        setOperations(bankOperations);
        setBankOperations(bankOperations)

      })
      .catch(function (error) {console.log(error)}), 500)
  },[accountType])

  function handleDateChange(toDate:string){
    var newOperations:BankOperation[] = []
    for(let i = 0; i < operations.length; i++){
      if(operations[i].bankOperationTime.slice(0, 10) >= from && operations[i].bankOperationTime.slice(0, 10) <= toDate){
        newOperations.push(operations[i])
      }
    }
    setOperations(newOperations)
  }

  function getBankOperations(operations:BankOperation[]){
    var array:BankOperation[] = [];
    operations.map(o => {
      if(o.bankOperationType === 'Пополнение' && o.bankOperationMaker != userName && o.toAccount === accountType){
        array.push(o)
      }
      if(o.bankOperationType === 'Пополнение' && o.bankOperationMaker === userName && o.toAccount === accountType){
        array.push(o)
      }
      if(o.fromAccount === accountType && o.bankOperationMaker === userName && o.bankOperationType === 'Перевод'){
        array.push(o)
      }

    })
    console.log(array)
    return array
  }

  return (
    <TransactionsWrapper>
      <TransactionHeader>
        <span>Операции</span>
        <div className='operation__period'>
          <span>Период:</span>
          <input type={fromDate} onFocus={()=> setFromDate('date')} placeholder="От" onChange={e => setFrom(e.target.value)}/>
          <input type={toDate} onFocus={()=> setToDate('date')} placeholder="До" onChange={(e) => handleDateChange(e.target.value)} />
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
        {operations.length === 0 ? <div className='no_transactions'>Пока нет транзакций!</div> : null}
        <TransactionList>
        {operations.map(operation => 
          <TransactionColumns key={operation.bankOperationId}>
            <div className='type'>{operation.bankOperationType}</div>
            <div className='time'>{operation.bankOperationTime.slice(0, 10)} / {operation.bankOperationTime.slice(12, 16)}</div>
            <div className='from'>
              <div>{operation.bankOperationMaker}</div>
              <div className='small__font'>
                {operation.fromAccount}
              </div>
            </div>

            <div className='to'>
              <div>{operation.bankOperationParticipant}</div>
              <div className='small__font'>
                {operation.toAccount}
              </div>
            </div>

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
  height:290px;
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
      width:125px;
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
 .no_transactions{
  text-align:center;
  font-size:14px;
  margin-top:20px;
}
`
const TransactionColumns = styled.div`
  height:35px;
  border-bottom:1px solid #e3e3e3;
  display:flex;
  padding-top:5px;
  padding-bottom:5px;
  div{   
    color:#666;
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
  .small__font{
    font-size:11px;
  }

`

const TransactionList =styled.div`
  position:absolute;
  top:45px;
  right:0;
  left:0;
  bottom:0;
  overflow-y:scroll;
`