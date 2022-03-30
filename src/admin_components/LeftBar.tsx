import React, { FC, useState } from 'react'
import styled from 'styled-components'

interface LeftBarProps{
    setCurrentPage:(page:string) => void
}

const LeftBar:FC<LeftBarProps> = ({setCurrentPage}) => {

  return (
    <LeftBarWrapper>
        <LogoWrapper>
            <img src={require('../images/logo.png')} />
        </LogoWrapper>
        <LeftBarItemWrapper>
            <LeftBarItem onClick={() => setCurrentPage('bank')}>
                Nursat Bank
            </LeftBarItem>
            <LeftBarItem onClick={() => setCurrentPage('userList')} >
                Пользователи
            </LeftBarItem>
            <LeftBarItem onClick={() => setCurrentPage('current')}>
                Текущие счета
            </LeftBarItem>
            <LeftBarItem onClick={() => setCurrentPage('deposit')}>
                Депозиты
            </LeftBarItem>
            <LeftBarItem>
                Операции
            </LeftBarItem>
        </LeftBarItemWrapper>

    </LeftBarWrapper>
  )
}

export default LeftBar

const LeftBarWrapper = styled.div`
    width:15%;
    border:1px solid #a6a6a6;
    position:relative;
    position:absolute;
    bottom:0px;
    top:0px;
    left:0px;
    background-color:white;
`

const LogoWrapper = styled.div`
    height:70px;
    width:fit-content;
    margin-left:auto;
    margin-right:auto;
    img{
        height:70px;
    }
`

const LeftBarItemWrapper = styled.div`
    margin-top:10px;
`

const LeftBarItem = styled.div`
    padding-top:10px;
    padding-bottom:10px;
    padding-left:20px;
    font-size:15px;
    color:#666;
    :hover{
        background-color:#f2f2f2;
        cursor:pointer;
        font-weight:600;
    }
`