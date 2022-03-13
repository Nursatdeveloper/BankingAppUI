import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import BankOperation from '../models/BankOperation';

interface CardDetailsProps{
  lastTransactions:string[],
  operations:BankOperation[]
}

interface GraphColoumn{
  date:string,
  revenue:number,
  expense:number
}

const CardDetails: FC<CardDetailsProps> = ({lastTransactions, operations}) => {
  const [timePeriod, setTimePeriod] = useState<string>('Неделя');
  const [revenue, setRevenue] = useState<number>(0);
  const [expense, setExpense] = useState<number>(0);
  const [graphArray, setGraphArray] = useState<GraphColoumn[]>([]);
  useEffect(() => {
    calculateRevenue()
    generateGraph()
  }, [operations])

  function generateGraph(){
    var array = []
    var get = 0;
    var spend = 0;
    var today = new Date();
    var date = dateToString(today)
    var count = 0;
    var dates:string[] = []
    operations.map(function(operation){
      if(!dates.includes(operation.bankOperationTime.slice(5, 10))){
        dates.push(operation.bankOperationTime.slice(5, 10))
      }
    })
    if(dates.length > 7){
      dates = dates.slice(dates.length-8, dates.length-1)
    }
    for(let i = 0; i < operations.length; i++){
      if(operations[i].bankOperationTime.slice(5,10) === dates[count]){
        if(operations[i].bankOperationType === 'Пополнение'){
          get += operations[i].bankOperationMoneyAmount;
        }else{
          spend += operations[i].bankOperationMoneyAmount;
        }
      }else{
        const max = get + spend;
        const revenue = Math.round(get/max*100)
        const expense = Math.round(spend/max*100)
        const obj:GraphColoumn = {
          date: dates[count],
          revenue: revenue,
          expense: expense
        }
        array.push(obj);
        count++;
        get = 0;
        spend = 0;
      }
    }
    console.log(array)
    setGraphArray(array)
    
  }

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
          <div className='data__container'>
            {graphArray.map((graph, i) => 
              <div key={i++} className='column__wrapper'>
                <div className='revenue__column' style={{height:`${graph.revenue}px`}}>
                </div>
                <div className='expense__column' style={{height:`${graph.expense}px`}}>
                </div>
                <div className='date__wrapper'>
                  {graph.date}
                </div>
              </div>  
            )}
          </div>
          <div className='description'>
            <div className='green_square'></div>
            <div>Получено</div>
            <div className='red_square'></div>
            <div>Потрачено</div>
          </div>
          <div className='statistics'>Статистика по доходам и расходам</div>
        </Graph>
        <Income>
          <div className='header'>
            <span>Получено</span>
            <span className='period'>{timePeriod}</span>
          </div>
          <div className='money__amount'>
            {formatBalance(revenue)} KZT
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
              {formatBalance(expense)} KZT
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
    .data__container{
      height:79%;
      display:flex;
      justify-content:space-between;
      padding-left:5px;
      padding-right:5px;
    }
    .description{
      display:flex;
      color:#a6a6a6;
      font-size:14px;
      width:fit-content;
      margin-left:auto;
      margin-right:auto;
    }
    .column__wrapper{
      width:14%;
      height:96%;
      position:relative;
      
      .date__wrapper{
        position:absolute;
        bottom:0;
        font-size:11px;
        color:#a6a6a6
      }

    }
    .revenue__column{
      width:48%;
      background-color:#46a062;
      position:absolute;
      bottom:15px;
      left:0px;
    }
    .expense__column{
      width:48%;
      background-color:#e65c4d;
      position:absolute;
      bottom:15px;
      right:0px;
    }
    .statistics{
      font-size:10px;
      color:#666666;
      text-align:center;
    }

  .green_square{
    width:15px;
    height:15px;
    background-color:#46a062;
    margin-right:5px;
    border-radius:3px;
  }
  .red_square{
    margin-left:15px;
    width:15px;
    height:15px;
    background-color:#e65c4d;
    margin-right:5px;
    border-radius:3px;
  }
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