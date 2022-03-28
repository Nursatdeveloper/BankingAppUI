import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import API_URL from '../api_url'
import CreateEmployeeForm from './CreateEmployeeForm'
import SendNotificationForm from './SendNotificationForm'

const MainSection = () => {
    const [customerNumber, setCustomerNumber] = useState<number>(0);
    const [accountNumber, setAccountNumber] = useState<number>(0);
    const [currentAccountNumber, setCurrentAccountNumber] = useState<number>(0);
    const [depositAccountNumber, setDepositAccountNumber] = useState<number>(0);
    const [operationNumber, setOperationNumber] = useState<number>(0);
    const [moneyInBank, setMoneyInBank] = useState<number>(0);
    const [femalePercentage, setFemalePercentage] = useState<number>(0);
    const [malePercentage, setMalePercentage] = useState<number>(0);

    let navigate = useNavigate();
    const redirect = (url:string) =>{
        navigate(url);
    }

    useEffect(() => {
        setGeneralInformation();
    })

    async function setGeneralInformation() {
        const token = sessionStorage.getItem('token');
        const url = `${API_URL}/user/get-general-information`
        await fetch(url, {
            method:"GET",
            headers:{
                'Accept':'application/json',
                'Authorization':`${token}`
            }
        }).then(response => {
            if (response.status === 401) {
                alert('В целях безопасности перезайдите заново!')
                redirect('/login')
            }
            return response.json()
        })
        .then(result => {
            setCustomerNumber(result[0]);
            setAccountNumber(result[1]);
            setCurrentAccountNumber(result[2]);
            setDepositAccountNumber(result[3]);
            setOperationNumber(result[4]);
            setMoneyInBank(result[5]);
            const male = result[6]
            const female = result[7]
            const total = male+female;
            const malePercentage = male*100/total;
            const femalePercentage = female*100/total;
            setFemalePercentage(femalePercentage);
            setMalePercentage(malePercentage);
        })
    }

  return (
    <MainSectionWrapper>
        <GeneralInfo>
            <Information>
                <div className='center'>Количество клиентов:</div>
                <div className='number'>{customerNumber}</div>
            </Information>
            <Information>
                <div className='center'>Количество счетов:</div>
                <div className='number'>{accountNumber}</div>
                <div className='additional_info'>
                    <span>Текуший счет: {currentAccountNumber}</span>
                    <span>Депозит: {depositAccountNumber}</span>
                </div>
            </Information>
            <Information>
                <div className='center'>Количество операции:</div>
                <div className='number'>{operationNumber}</div>
            </Information>
            <Information>
                <div className='center'>Деньги в банке:</div>
                <div className='number'>{moneyInBank}</div>
                <div className='additional_info'>Включая депозит и текущий счет</div>
            </Information>
        </GeneralInfo>

        <div className='wrapper'>
            <div>
                <CreateEmployeeForm />
                <SendNotificationForm />
            </div>
            <div className='gender__proportion'>
                <span>Мужчины</span>
                <div className='gender__percentage'>
                    {malePercentage}%
                </div>
            </div>
            <div className='gender__proportion'>
                <span>Женщины</span>
                <div className='gender__percentage'>
                    {femalePercentage}%
                </div>
            </div>
        </div>

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
    .wrapper{
        display:flex;
        justify-content:space-between;
    }
    .gender__proportion{
        background-color:white;
        border:1px solid #e3e3e3;
        border-radius:5px;
        width:25%;
        text-align:center;
        height:fit-content;
        padding:20px;
        margin-top:20px;
        margin-right:20px;
        span{
            font-size:14px;
        }
    }
    .gender__percentage{
        font-size:30px;
        color:#4d4d4d;
    }
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


