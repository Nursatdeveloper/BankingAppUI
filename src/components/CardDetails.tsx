import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import BankOperation from '../models/BankOperation';

interface CardDetailsProps{
  lastTransactions:string[],
  operations:BankOperation[]
}

const CardDetails: FC<CardDetailsProps> = ({lastTransactions, operations}) => {
  const [timePeriod, setTimePeriod] = useState<string>('Неделя');
  const [revenue, setRevenue] = useState<number>(0);
  const [expense, setExpense] = useState<number>(0);
  useEffect(() => {
    calculateRevenue()
  }, [operations])

  function calculateRevenue(){
    var today = new Date();
    var from:string = "";
    if(timePeriod === 'Неделя'){
      var fromDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()-7);
      from = dateToString(fromDate);
    }else if(timePeriod === 'Месяц'){
      var fromDate = new Date(today.getFullYear(), today.getMonth()-1, today.getDate());
      from = dateToString(fromDate);
    }else{
      var fromDate = new Date(today.getFullYear()-1, today.getMonth(), today.getDate());
      from = dateToString(fromDate);
    }
    setRevenue(calculateSumBetween(from, 'Пополнение'))
    setExpense(calculateSumBetween(from, 'Перевод'))
  }

  function dateToString(date:Date){
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    const time = yyyy+'-'+mm+'-'+dd;
    return time;
  }
  
  function calculateSumBetween(from:string, type:string){
    var amount = 0;
    for(let i = operations.length-1; i >= 0; i-- ){
      if(operations[i].bankOperationTime.slice(0, 10) !== from){
        if(operations[i].bankOperationType === type){
          amount += operations[i].bankOperationMoneyAmount;
        }
      }
      else{
        break;
      }
    }
    return amount;
  }



  function handlePeriodChange(period:string){
    if(period === 'Неделя'){
      setTimePeriod(period)
    } else if (period == 'Месяц'){
      setTimePeriod(period)
    } else {
      setTimePeriod(period)
    }
  }
  return (
    <CardDetailsWrapper>
      <TimePeriod>
        <div onClick={() => handlePeriodChange('Неделя')}
            className={timePeriod === 'Неделя' ? 'selected' : ''}
        >Неделя</div>
        <div onClick={() => handlePeriodChange('Месяц')}
            className={timePeriod === 'Месяц' ? 'selected' : ''}
        >Месяц</div>
        <div onClick={() => handlePeriodChange('Год')}
            className={timePeriod === 'Год' ? 'selected' : ''}
        >Год</div>
      </TimePeriod>
      <DataWrapper>
        <Graph>

        </Graph>
        <Income>
          <div className='header'>
            <span>Получено</span>
            <span className='period'>{timePeriod}</span>
          </div>
          <div className='money__amount'>
            {revenue} KZT
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
              </svg>
            </span>
          </div>
          <div className='last__transaction'>
            Посленяя транзакция в {lastTransactions[0]}
          </div>
        </Income>
        <Expense>
          <div className='header'>
              <span>Потрачено</span>
              <span className='period'>{timePeriod}</span>
            </div>
            <div className='money__amount'>
              {expense} KZT
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                </svg>
            </div>
            <div className='last__transaction'>
              Посленяя транзакция в {lastTransactions[1]}
            </div>
        </Expense>
      </DataWrapper>
    </CardDetailsWrapper>
  )
}

export default CardDetails

const CardDetailsWrapper = styled.div`
  height:220px;
  position:absolute;
  bottom:5px;
  left:10px;
  right:10px;
`

const TimePeriod = styled.div`
  display:flex;
  height:35px;
  width:fit-content;
  margin-left:auto;
  margin-right:auto;
  margin-top:10px;
  margin-bottom:5px;
  div{
    padding-left:20px;
    padding-right:20px;
    background-color:#F5F7F9;
    color:#a6a6a6;
    width:50px;
    height:30px;
    text-align:center;
    transition:height, 0.5s ease-in-out;
    transition:color, 0.5s ease-in-out;
    :hover{
      cursor:pointer;
    }
  }
  .selected{
    background-color: white;
    -webkit-box-shadow: 1px 3px 10px 3px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 1px 3px 10px 3px rgba(34, 60, 80, 0.2);
    box-shadow: 1px 3px 10px 3px rgba(34, 60, 80, 0.2);
    height:33px;
    width:55px;
    color:#666;
    position:relative;
    border-radius:4px;
  }
`

const DataWrapper = styled.div`
  display:flex;
  height:160px;
  justify-content:space-between;
  margin-top:15px;
`

const Graph = styled.div`
  width:30%;
  border:1px solid #e3e3e3;
`

const Income = styled.div`
  width:30%;
  border:1px solid #e3e3e3;
  position:relative;
  svg{
    width:30px;
    height:28px;
    margin-left:30px;
    padding-top:5px;
    position:absolute;
    right:10px;
  }
  .header{
    height:25%;
    border-bottom:1px solid #e3e3e3;
    color:#666;
    padding-left:10px;
    display:flex;
    align-items:center;
  }
  .money__amount{
    height:30%;
    color:#46a062;
    font-size:30px;
    margin-left:20px;
    margin-top:20px;
  }
  .last__transaction{
    margin-left:20px;
    font-size:14px;
    color:#a6a6a6;
    margin-top:10px;
  }
  .period{
    background-color:#46a062;
    padding-left:15px;
    padding-right:15px;
    padding-bottom:3px;
    color:white;
    position:absolute;
    right:10px;
    border-radius:5px;
  }
`

const Expense = styled.div`
width:30%;
  border:1px solid #e3e3e3;
  position:relative;
  svg{
    width:30px;
    height:28px;
    margin-left:30px;
    padding-top:5px;
    position:absolute;
    right:10px;
  }
  .header{
    height:25%;
    border-bottom:1px solid #e3e3e3;
    color:#666;
    padding-left:10px;
    display:flex;
    align-items:center;
  }
  .money__amount{
    height:30%;
    color:#e65c4d;
    font-size:30px;
    margin-left:20px;
    margin-top:20px;
  }
  .last__transaction{
    margin-left:20px;
    font-size:14px;
    color:#a6a6a6;
    margin-top:10px;
  }
  .period{
    background-color:#e65c4d;
    padding-left:15px;
    padding-right:15px;
    padding-bottom:3px;
    color:white;
    position:absolute;
    right:10px;
    border-radius:5px;
  }
`