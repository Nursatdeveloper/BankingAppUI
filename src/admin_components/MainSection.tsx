import React from 'react'
import styled from 'styled-components'
import CreateEmployeeForm from './CreateEmployeeForm'

const MainSection = () => {
  return (
    <MainSectionWrapper>
        <GeneralInfo>
            <Information>
                <div className='center'>Количество клиентов:</div>
                <div className='number'>1000</div>
            </Information>
            <Information>
                <div className='center'>Количество счетов:</div>
                <div className='number'>1000</div>
                <div className='additional_info'>
                    <span>Текуший счет: 200</span>
                    <span>Депозит: 230</span>
                </div>
            </Information>
            <Information>
                <div className='center'>Количество операции:</div>
                <div className='number'>1000</div>
            </Information>
            <Information>
                <div className='center'>Деньги в банке:</div>
                <div className='number'>100000</div>
                <div className='additional_info'>Включая депозит и текущий счет</div>
            </Information>
        </GeneralInfo>

        <CreateEmployeeForm />

    </MainSectionWrapper>
  )
}

export default MainSection

const  MainSectionWrapper = styled.div`
    width:92%;
    height:680px;
    position:absolute;
    top:90px;
    left:4%;
    right:4%;
    background-color:#f2f2f2;
    border-radius:10px;
`

const GeneralInfo = styled.div`
    display:flex;
    justify-content:space-between;
    margin-top:30px;
    margin-left:20px;
    margin-right:20px;
    height:100px;
`

const Information = styled.div`
    width:240px;
    border-radius:5px;
    height:100px;
    background-color:white;
    border:1px solid #e3e3e3;
    color:#4d4d4d;
    .center{
        text-align:center;
        font-size:16px;
        padding-top:5px;
    }

    .number{
        font-weight:600;
        font-size:30px;
        text-align:center;
        margin-top:10px;
    }

    .additional_info{
        width:fit-content;
        margin-left:auto;
        margin-right:auto;
        font-size:13px;
        span{
            margin-right:10px;
        }
    }
`

const TableWrapper = styled.div`
    margin-top:40px;
    margin-left:20px;
    margin-right:20px;
    height:60vh;
    background-color:white;
`


