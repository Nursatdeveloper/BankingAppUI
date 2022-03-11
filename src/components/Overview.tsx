import React, { FC } from 'react'
import styled from 'styled-components'
import CardDetails from './CardDetails'

interface OverviewProps{
  accountType:string
}

const Overview:FC<OverviewProps> = ({accountType}) => {
  return (
    <OverviewWrapper>
      <AccountType>
        {accountType}
      </AccountType>
      <BankOperationButtons>
        <ReplenishButton>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cash" viewBox="0 0 16 16">
          <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
          <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2H3z"/>
        </svg>
          <span>Пополнить</span>
        </ReplenishButton>
        <TransferButton>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z"/>
          </svg>
          <span>Перевод</span>
        </TransferButton>
      </BankOperationButtons>
      <CardDetails />
    </OverviewWrapper>

  )
}

export default Overview

const OverviewWrapper = styled.div`
  border:1px solid #e3e3e3;
  height:400px;
  margin-left:20px;
  margin-right:20px;
  margin-bottom:20px;
  position:relative;
`

const BankOperationButtons = styled.div`
  position:absolute;
  right:10px;
  top:15px;
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
`