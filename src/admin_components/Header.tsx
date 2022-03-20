import React from 'react'
import styled from 'styled-components'

const Header = () => {
  return (
    <HeaderWrapper>
        <EmployeeInfo>
            <ImgWrapper>
            </ImgWrapper>
            <NameWrapper>
                <div className='user__name'>Nursat Zeinolla</div>
                <div className='user__role'>Роль: Admin</div>
            </NameWrapper>
        </EmployeeInfo>
    </HeaderWrapper>
  )
}

export default Header

const HeaderWrapper = styled.div`
    width:85%;
    border:1px solid grey;
    height:180px;
    background-color:#0033cc;
    position:fixed;
    opacity:0.8;
`

const EmployeeInfo = styled.div`
    position:absolute;
    border:1px solid black;
    display:flex;
    right:20px;
    top:5px;
    padding:10px;
`

const ImgWrapper = styled.div`
    border:1px solid white;
    width:35px;
    height:35px;
    border-radius:50%;
    margin-right:20px;
`

const NameWrapper = styled.div`
    color:white;

    .user__name{
        font-size:15px;
    }

    .user__role{
        font-size:12px;
    }
`