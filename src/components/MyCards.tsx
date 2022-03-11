import axios from 'axios';
import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import API_URL from '../api_url';
import '../App.css'
import Account from '../models/Account';

interface MyCardsProps{
  setAccountType:(account:string) => void
}

const MyCards:FC<MyCardsProps> = ({setAccountType}) => {
  const [lastDigits, setLastDigits] = useState<string>('')
  const [id, setId] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [accounts, setAccounts] = useState<Account[]>([]);
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
        }else if(json.accounts.length == 2){
          setAccountType('Текущий счет')
        }
      })
      .catch(function (error) {console.log(error)});

  },[])

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

      {accounts.map(account => 
        <Card style={
          account.accountType === 'Текущий счет' ? 
            currentAccount :
            depositAccount
          }
          onClick={() => setAccountType(account.accountType)}
        >

          <Section1>
            <div className='golden__thing'></div>
            <Balance>
              <div>
                {account.accountType}
              </div>
              {account.balance}{account.currencyType}
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
      )}
      <AddCard>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
      </svg>
      <div>
        Открыть счет
      </div>
      </AddCard>

    </MyCardsWrapper>
  )
}

export default MyCards

const MyCardsWrapper = styled.div`
  width:30%;
  background-color:#F5F7F9;
`

const Title = styled.div`
  font-size:22px;
  color:#4d4d4d;
  text-align:center;
  padding-top:15px;
  padding-bottom:15px;
  border-bottom:2px solid #f2f2f2;
`

const Card = styled.div`
  margin-left:30px;
  margin-right:30px;
  height:200px;
  border-radius:5px;
  opacity:0.7;
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
`

const CardNumberWrapper = styled.div`
  display:flex;
  margin-left:25px;
  margin-top:10px;
`

const AddCard = styled.div`
  color:#a6a6a6;
  text-align:center;
  margin-top:40px;
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