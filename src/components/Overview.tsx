import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import CardDetails from './CardDetails'
import '../App.css'
import API_URL from '../api_url'
import Account from '../models/Account'
import BankOperation from '../models/BankOperation'

interface OverviewProps{
  accountStatus:boolean,
  accountType:string,
  accountNames:string[],
  operations:BankOperation[]
}

const Overview:FC<OverviewProps> = ({accountType, accountNames, operations, accountStatus}) => {

  const [showForm, setShowForm] = useState<string>('');
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [token, setToken] = useState<string>('');

  const [transferType, setTransferType] = useState<string>('');
  const [clientPhoneNumber, setClientPhoneNumber] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [clientAccount, setClientAccounts] = useState<Account[]>([]);
  const [transferToAccount, setTransferToAccount] = useState<string>('');
  const [money, setMoney] = useState<string>('');

  const [lastTransactions, setLastTransactions] = useState<string[]>([]);

  useEffect(() => {
    const id = sessionStorage.getItem('id')
    setId(`${id}`);
    const token = sessionStorage.getItem('token');
    setToken(`${token}`);

    var transactions:string[] = [];
    for(let i = operations.length-1; i >= 0; i--){
      if(transactions.length == 2){
        break;
      }
      if(operations[i].bankOperationType === 'Пополнение'){
        transactions[0] = operations[i].bankOperationTime.slice(0, 10);
      }else{
        transactions[1] = operations[i].bankOperationTime.slice(0, 10);
      }
    }
    setLastTransactions(transactions)

  },[operations])


  function handleFormChange(type:string){
    if(type === 'replenish'){
      if(showForm !== 'replenish'){
        setShowForm('replenish')
      }else{
        setShowForm('');
      }
    }else{
      if(showForm !== 'transfer'){
        setShowForm('transfer')
      }else{
        setShowForm('')
      }  
    }
    setShowConfirm(false)
  }

  function handleTelephoneChange(tel:string){
    const url = `${API_URL}/user/get-user-by-telephone/${tel}`;
    setClientPhoneNumber(tel)
    setTimeout(() => fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `${token}`
      },
    }).then (function (response) {return response.json()})
      .then(function (json) {
        const clientName:string = `${json.firstName} ${json.lastName}`
        setClientName(clientName);
        setClientAccounts(json.accounts);
      })
      .catch(function (error) {console.log(error)}), 1000)
  }

  function handleTransfer(){
    if(transferType === 'Между счетами'){
      const url = `${API_URL}/BankOperation/make-transfer-myaccount`;
      const MakeTransferCommand = {
        userId: id,
        fromAccount: accountType,
        toAccount: transferToAccount,
        transferAmount: money,
        currencyType: 'KZT'
      }
      fetch(url,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        body: JSON.stringify(MakeTransferCommand)
      }).then (function (response) {return response.json()})
        .then(function (json) {
          alert(json.message);
          setTransferToAccount('')
          setMoney('')
        })
        .catch(function (error) {console.log(error)})
    }
    else{
      const url = `${API_URL}/BankOperation/make-transfer`;
      const MakeTransferCommand = {
        transferMakerId: id,
        transferFromAccountType: accountType,
        transferToAccountType: transferToAccount,
        transferAmount: money,
        currencyType: 'KZT',
        receiverTelephone: clientPhoneNumber
      }
      fetch(url,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        body: JSON.stringify(MakeTransferCommand)
      }).then (function (response) {return response.json()})
        .then(function (json) {
          alert(json.message);
          setTransferToAccount('')
          setClientPhoneNumber('');
          setMoney('')
          setClientName('')       
        })
        .catch(function (error) {console.log(error)})  
    }
    window.location.reload()
  }

  function handleReplenish(){
    const MakeDepositCommand = {
      userId: id,
      depositAmount: money,
      depositAccountType: accountType,
      currencyType: 'KZT'
    }
    const url = `${API_URL}/bankoperation/make-deposit`
    fetch(url,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify(MakeDepositCommand)
    }).then (function (response) {return response.json()})
      .then(function (json) {
        alert(json.message);
        setMoney('')
        window.location.reload()
      })
      .catch(function (error) {console.log(error)})  
  }

  function changeAccountStatus(){
    const ChangeStatusCommand = {
      userId:id,
      accountType: accountType,
      password: confirmPassword
    }
    var url = "";
    if(accountStatus === true){
      url = `${API_URL}/account/deactivate-account`
    }else{
      url = `${API_URL}/account/activate-account`
    }
    fetch(url,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify(ChangeStatusCommand)
    }).then (function (response) {return response.json()})
      .then(function (message) {
        alert(message);
        setConfirmPassword('');
        setShowConfirm(false)
        window.location.reload()
      })
      .catch(function (error) {console.log(error)}) 

  }

  function showConfirmForm(){
    setShowConfirm(!showConfirm)
    setShowForm('');
  }


  return (
    <OverviewWrapper>
      <AccountType>
        {accountType}
        <button className='deactivate__button' onClick={showConfirmForm}>
          {accountStatus ? 'Деактивировать' : 'Активировать'}
        </button>
      </AccountType>
      <BankOperationButtons>
        <ReplenishButton onClick={()=>handleFormChange('replenish')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cash" viewBox="0 0 16 16">
          <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
          <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2H3z"/>
        </svg>
          <span>Пополнить</span>
        </ReplenishButton>
        <TransferButton onClick={()=>handleFormChange('transfer')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z"/>
          </svg>
          <span>Перевод</span>
        </TransferButton>
      </BankOperationButtons>

      <CardDetails lastTransactions={lastTransactions} operations={operations}/>

      <ReplenishForm className={showForm === 'replenish' ? 'showReplenish' : 'hideReplenish'}>
          <div>
            <span>Счет для пополнения: {accountType}</span>
          </div>
          <div>
            Сумма пополнения: <input type='text' value={money} onChange={e => setMoney(e.target.value)}/> 
            <span>KZT</span>
          </div>
          <button onClick={handleReplenish}>Пополнить</button>
      </ReplenishForm>
      <TransferForm className={showForm === 'transfer' ? 'showTransfer' : 'hideTransfer'}>
        <div>
          <span>Вид перевода: </span>
          <select onChange={(e) => setTransferType(e.target.value)}>
            <option>Перевод</option>
            <option>Между счетами</option>
            <option>На счет клиента</option>
          </select>
        </div>
        {transferType === 'Между счетами' ?
          <div>
            <span>Счет:</span> 
            <select value={transferToAccount} onChange={e => setTransferToAccount(e.target.value)}>
              <option>Выберите счет</option>
              {accountNames.map((acc, a)=> <option key={a++}>{acc}</option>)}
            </select>
          </div> :
          <div>
            <div>
              <span>Номер клиента:</span>
              <input type='text' value={clientPhoneNumber} onChange={e => handleTelephoneChange(e.target.value)} />
            </div>
            { clientName !== '' ?
            <div>
              <span>{clientName}</span>
              <select value={transferToAccount} onChange={(e) => setTransferToAccount(e.target.value)}>
                <option>Счет клиента</option>
                {clientAccount.map((account, i) => <option key={i++}>{account.accountType}</option>)}
              </select>
            </div> : null}
          </div>    
        }
        <div>
          <span>Сумма перевода: </span>
          <input type='text' className='money__input' value={money} onChange={e => setMoney(e.target.value)}/>
          <span>KZT</span>
        </div>
        <div>
          <button onClick={handleTransfer}>Перевод</button>
        </div>
      </TransferForm>

      <ConfirmForm className={showConfirm ? 'showConfirm' : 'hideConfirm'}>
        <div>Вы уверены?</div>
        <div>Пароль: <input type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/></div>
        <div>
          <button className='submit' onClick={changeAccountStatus}>Принять</button>
          <button className='cancel' onClick={() => setShowConfirm(false)}>Отмена</button>
        </div>
      </ConfirmForm>
      
    </OverviewWrapper>

  )
}

export default Overview

const OverviewWrapper = styled.div`
  height:400px;
  margin-left:20px;
  margin-right:20px;
  margin-bottom:20px;
  position:relative;
  background-color:white;
`

const BankOperationButtons = styled.div`
  position:absolute;
  right:0px;
  top:5px;
`

const ReplenishButton = styled.button`
  margin-right:20px;
  width:150px;
  height:40px;
  border:1px solid #46a062;
  background-color:white;
  color:#46a062;
  position:relative;
  font-weight:600;
  font-size:14px;
  transition:background-color, 0.3s ease-in-out;
  svg{
    margin-right:20px;
    width:20px;
    height:20px;
    position:absolute;
    left:20px;
    top:9px;
  }
  span{
    position:absolute;
    right:25px;
    top:11px;
  }
  :hover{
    cursor:pointer;
    background-color:#edf7f0;
  }
`

const TransferButton = styled.button`
margin-right:20px;
width:150px;
height:40px;
border:1px solid #e65c4d;
background-color:white;
color:#e65c4d;
position:relative;
font-weight:600;
font-size:14px;
transition:background-color, 0.3s ease-in-out;

svg{
  margin-right:20px;
  width:20px;
  height:20px;
  position:absolute;
  left:20px;
  top:9px;
}
span{
  position:absolute;
  right:25px;
  top:11px;
}
:hover{
  cursor:pointer;
  background-color: #fcebe9;
}
`

const AccountType = styled.div`
  color:#666;
  font-size:18px;
  margin-left:10px;
  margin-top:10px;
  .deactivate__button{
    border:1px solid #666;
    padding-top:3px;
    padding-bottom:3px;
    background-color:white;
    color:#666;
    margin-left:20px;
    transition:background-color, 0.5s ease-in-out;
    :hover{
      background-color:#f2f2f2;
    }
  }
`

const ReplenishForm = styled.div`
  background-color:white;
  border:1px solid #e3e3e3;
  width:fit-content;
  height:fit-content;
  color:#666;
  font-size:15px;
  padding:20px;
  margin-top:10px;
  div{
    margin-bottom:5px;
  }
  input{
    outline:none;
    border:0;
    border-bottom:1px solid #666;
    width:70px;
  }
  button{
    border:0;
    background-color:#46a062;
    width:100%;
    padding-top:5px;
    padding-bottom:5px;
    padding-right:10px;
    padding-left:10px;
    margin-top:10px;
    color:white;
    cursor:pointer;
  }
`

const TransferForm = styled.div`
  background-color:white;
  border:1px solid #e3e3e3;
  padding-left:20px;
  padding-right:20px;
  padding-top:10px;
  padding-bottom:10px;
  top:34px;
  position:absolute;
  left:10px;
  div{
    font-size:15px;
    margin-bottom:5px;
  }
  span{
    color:#666;
    font-size:15px;
  }
  select{
    outline:none;
    border:0;
    border-bottom:1px solid #666666;
    color:#666666;
    margin-left:10px;
  }
  input{
    width:100px;
    border:0;
    border-bottom:1px solid #666;
    margin-left:10px;
    outline:none;
  }
  .money__input{
    width:70px;
  }
  button{
    width:100%;
    margin-top:10px;
    margin-bottom:-20px;
    border:0;
    background-color:#e65c4d;
    color:white;
    cursor:pointer;
    padding-top:5px;
    padding-bottom:5px;
  }
`

const ConfirmForm = styled.div`
  border:1px solid #a6a6a6;
  width:250px;
  position:absolute;
  height:105px;
  top:50px;
  background-color:white;
  div{
    padding-top:5px;
    padding-bottom:5px;
    padding-left:10px;
    padding-right:5px;
    color:#666;
    input{
      width:140px;
      outline:none;
    }
    .submit{
      background-color:#46a062;
      border:0;
      color:white;
      height:23px;
      padding-left:10px;
      padding-right:10px;
      cursor:pointer;
    }
    .cancel{
      background-color:#e65c4d;
      border:0;
      color:white;
      height:23px;
      padding-left:10px;
      padding-right:10px;
      margin-left:20px;
      cursor:pointer;
    }
  }
`