import axios from 'axios';
import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import API_URL from '../api_url';
import '../App.css'
import Account from '../models/Account';

interface MyCardsProps{
  setAccountType:(account:string) => void,
  setAccountNames:(accountNames:string[]) => void,
  setAccountStatus:(status:boolean) => void,
  setUserName:(name:string) => void
}

const MyCards:FC<MyCardsProps> = ({setAccountType, setAccountNames, setAccountStatus, setUserName}) => {
  const [lastDigits, setLastDigits] = useState<string>('')
  const [id, setId] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [addAccountType, setAddAccountType] = useState<string>('');
  const [agreementCheckbox, setAgreementCheckbox] = useState<boolean>(false);
  const [current, setCurrent] = useState<boolean>(false);
  const [deposit, setDeposit] = useState<boolean>(false);
  const [viewBack, setViewBack] = useState<string>('');
  const invisibleCardNumber = "****   ****   ****";

  useEffect(()=> {
    const id = sessionStorage.getItem('id');
    setId(`${id}`);
    const token = sessionStorage.getItem('token');
    setToken(`${token}`)
    const url = `${API_URL}/user/get-user-by-id/${id}`
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `${token}`
      },
    }).then (function (response) {return response.json()})
      .then(function (json) {
        setAccounts(json.accounts)
        setLastDigits(json.cardNumber)
        if(json.accounts.length == 1){
          setAccountType(json.accounts[0].accountType)
          setAccountNames(json.accounts[0].accountType)
          setAccountStatus(json.accounts[0].isActive)
          setUserName(json.accounts[0].ownerName)
          if(json.accounts[0].accountType === 'Депозит'){
            setDeposit(true);
          }else{
            setCurrent(true)
          }
        }else if(json.accounts.length == 2){
          setAccountType('Текущий счет')
          setUserName(json.accounts[0].ownerName)
          setAccountNames([json.accounts[0].accountType, json.accounts[1].accountType])
          json.accounts.map((a:Account) => a.accountType === 'Текущий счет' ? setAccountStatus(a.isActive) : null)
        }
      })
      .catch(function (error) {console.log(error)})

  },[])

  function formatBalance(money:number){
    const balance = money.toString()
    var array = [];
    var count = 0
    for(let i = balance.length-1; i >= 0; i--){
      if(count != 3){
        array.push(balance[i]);
        count++ 
      }
      else{
        array.push(",")
        array.push(balance[i])
        count = 0;
      }
    }
    array = array.reverse();  
    var number = '';
    array.map(n => number += n);
    return number
  }

  function openNewAccount(){
    setShowForm(!showForm)
  }
  function createNewAccount(){
    const url = `${API_URL}/account/create-account`
    const CreateAccountCommand = {
      userId: id,
      accountType:addAccountType
    }
    fetch(url, {
      method:"POST",
      headers:{
        'Content-Type':'application/json',
        'Authorization':`${token}`
      },
      body: JSON.stringify(CreateAccountCommand)
    }).then(response => response.json())
    .then(result => {
      alert(result)
      window.location.reload()
    })
    .catch(error => console.log(error))
  }

  function getContractTemplate() {
    const url = `${API_URL}/document/get-account-contract-template`;
    fetch(url, {
      method:"GET",
      headers:{
        'Authorization':`${token}`,
        'Accept':'application/pdf'
      }
    }).then(result => result.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link  = document.createElement('a');
      link.href=url;
      link.setAttribute('download', 'Document.pdf')
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    }).catch(error =>  console.log(error))
  }

  function viewBackHandler(account:string){
    if(account === 'close'){
      setViewBack('')
    }
    else if(account === 'Текущий счет'){
      setViewBack('Текущий счет');
    }else{
      setViewBack('Депозит')
    }
  }

  const currentAccount = {
    backgroundColor: '#DAA520',
    color:'#4d4d4d',
  }

  const depositAccount = {
    backgroundColor:'#000058',
    color:"#a6a6a6",
  }

  return (
    <MyCardsWrapper>

      <Title>
        Мои счета
      </Title>
      <AddAccountForm className={showForm ? 'showOpenNewAccountForm' : 'hideOpenNewAccountForm'} >
        <div className={current === true ? 'hide' : 'accountType'}  onClick={()=> setAddAccountType('Текущий счет')}>
          Открыть Текущий счет
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
          </svg>
        </div>
        <div className={deposit === true ? 'hide' : 'accountType'} onClick={()=> setAddAccountType('Депозит')}>
          Открыть Депозит
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
          </svg>
        </div>
        {addAccountType !== '' ? <div>Счет: {addAccountType}</div> : null}
        <div>
          <div className='download__link' onClick={getContractTemplate}>Посмотреть договор</div>
        </div>
        <div>
          <input type='checkbox' onClick={() => setAgreementCheckbox(!agreementCheckbox)} />
          <span>Я согласен с условиями соглашения</span>
        </div>
        {agreementCheckbox ? 
        <div>
          <span>Пароль: </span>
          <input type='password' className='password__input'/>
          <button onClick={createNewAccount}>Открыть</button>
        </div> 
        
        : null}
      </AddAccountForm>

      {accounts.map((account, i) => 
        <div className={account.accountType === viewBack ? 'flip-box' : ''}>
          <div className='flip-box-inner'>
            <Card className='flip-box-front' style={
              account.accountType === 'Текущий счет' ? 
                currentAccount :
                depositAccount
              }

              key={i++}
            >

              <Section1>
                <div className='golden__thing'></div>
                <Balance>
                  <div>
                    {account.accountType}
                  </div>
                  {formatBalance(account.balance)} {account.currencyType}
                  <div className='view__back' onClick={()=>viewBackHandler(account.accountType)}>
                    Посметреть реквезиты
                  </div>
                  <div className='choose__account' onClick={() => setAccountType(account.accountType)}>
                    Выбрать счет
                  </div>
                </Balance>
              </Section1>

              <Section2>
              {account.accountType === 'Текущий счет' ?
                <CardNumberWrapper>
                  {invisibleCardNumber} {lastDigits.slice(12, 16)}
                </CardNumberWrapper>
              :null}
              </Section2>

              <Section3>
                  {account.ownerName.toUpperCase()}
              </Section3>

            </Card>
            <div className='flip-box-back' >
                <div>
                  <span>IBAN: {account.accountNumber}</span>
                </div>
                <div>
                  <span>Счет: {account.accountType}</span>
                </div>
                <div>
                  <span>Дата открытия: {account.activatedDate.slice(0,10)}</span>
                </div>
                <div>
                  <span>Клиент: {account.ownerName}</span>
                </div>
                <div>
                  <span>ИИН: {account.ownerIIN}</span>
                </div>
                <div>
                  <span>Активен: {account.isActive ? 'Да' : 'Нет'}</span>
                </div>
                <div>
                  <span>Заблокирован: {account.isBlocked ? 'Да' : 'Нет'}</span>
                  <span className='return__back' onClick={()=> viewBackHandler('close')}>Вернуться назад</span>
                </div>
            </div>
          </div>
        </div>  
      )}
      {accounts.length === 1 ? null :
      <AddCard onClick={openNewAccount}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
      </svg>
      <div>
        Открыть счет
      </div>
    </AddCard> }

    </MyCardsWrapper>
  )
}

export default MyCards

const MyCardsWrapper = styled.div`
  width:30%;
  background-color:#F5F7F9;
  z-index:4;
  position:relative;
`

const Title = styled.div`
  font-size:22px;
  color:#4d4d4d;
  text-align:center;
  padding-top:15px;
  padding-bottom:15px;
  border-bottom:2px solid #f2f2f2;
  position:relative;
  z-index:3;
  background-color:#F5F7F9;
`

const AddAccountForm = styled.div`
  border:1px solid #a6a6a6;
  margin-left:30px;
  margin-right:30px;
  padding:5px;
  background-color:#e6e6e6;
  height:168px;
  .accountType{
    border:1px solid #e3e3e3;
    color:#666;
    position:relative;
    transition:color, 0.5s ease-in-out;
    transition:border, 0.5s ease-in-out;
    background-color:white;
    padding-left:10px;
    padding-top:5px;
    padding-bottom:5px;
    svg{
      position:absolute;
      right:10px;
      width:20px;
      height:20px;
    }
    :hover{
      border:1px solid #000058;
      color:#000058;
      cursor:pointer;
    }
  }
  .hide{
    display:none;
  }
  .download__link{
    text-decoration:underline;
    color:#4d4d4d;
    :hover{
      color:purple;
      cursor:pointer;
    }
  }
  div{
    padding-left:10px;
    padding-top:5px;
    background-color:#e6e6e6;
    position:relative;
    font-size:14px;
    .password__input{
      width:120px;
      margin-bottom:10px;
      outline:none;
    }
    button{
      position:absolute;
      right:10px;
      background-color:#000058;
      color:white;
      padding-left:15px;
      padding-right:15px;
      margin-top:0px;
      border:0;
      padding-top:4px;
      padding-bottom:4px;
    }
  }
`

const Card = styled.div`
  margin-left:30px;
  margin-right:30px;
  height:200px;
  border-radius:5px;
  opacity:0.8;
  margin-top:30px;
  -webkit-box-shadow: 0px 5px 12px -1px rgba(34, 60, 80, 0.6);
  -moz-box-shadow: 0px 5px 12px -1px rgba(34, 60, 80, 0.6);
  box-shadow: 0px 5px 12px -1px rgba(34, 60, 80, 0.6);
`

const Section1 = styled.div`
  height:100px;
  display:flex;
  position:relative;
`

const Section2 = styled.div`
  height:40px;
  display:flex;
`

const Section3 = styled.div`
  height:40px;
  margin-left:25px;
  margin-top:10px;
`

const Balance = styled.div`
  font-size:20px;
  position:absolute;
  margin-top:20px;
  right:20px;
  div{
    font-size:14px;
  }
  .view__back{
    font-size:12px;
    margin-top:10px;
    :hover{
      text-decoration:underline;
      cursor:pointer;
    }
  }
  .choose__account{
    font-size:12px;
    margin-left:50px;
    margin-top:8px;
    :hover{
      text-decoration:underline;
      cursor:pointer;
    }
  }
`

const CardNumberWrapper = styled.div`
  display:flex;
  margin-left:25px;
  margin-top:10px;
`

const AddCard = styled.div`
  color:#a6a6a6;
  text-align:center;
  margin-top:30px;
  transition:color, 0.5s ease-in-out;
  svg{
    width:30px;
    height:30px;
  }
  :hover{
    color:#000058;
    cursor:pointer;
  }
`