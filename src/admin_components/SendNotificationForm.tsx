import React from 'react'
import styled from 'styled-components'


const SendNotificationForm = () => {
  return (
    <NotificationFormWrapper>
        <span>Отправить уведомление</span>
        <TextAreaWrapper>
            <textarea className='notification__text'>
            </textarea>
        </TextAreaWrapper>
        <div>
            <select>
                <option>Кому</option>
                <option>Всем</option>
                <option>Клиентам</option>
                <option>Сотрудникам</option>
            </select>
            <button>
                Отправить
            </button>
        </div>
    </NotificationFormWrapper>
  )
}

export default SendNotificationForm

const NotificationFormWrapper = styled.div`
    width:400px;
    height:140px;
    border:1px solid #e3e3e3;
    margin-left:20px;
    background-color:white;
    margin-top:15px;
    border-radius:5px;
    padding-top:5px;
    div{
        width:350px;
        margin-left:auto;
        margin-right:auto;
        position:relative;
    }
    
    select{
        margin-left:10px;
        margin-top:10px;
        border:0;
        border-bottom:1px solid #4d4d4d;
        color:#4d4d4d;
    }

    button{
        position:absolute;
        right:0px;
        margin-top:10px;
        border:0;
        padding-top:5px;
        padding-bottom:5px;
        padding-left:10px;
        padding-right:10px;
        background-color:#0033cc;
        color:white;
        border-radius:3px;
        transition:background-color, 0.5s ease-in-out;
        :hover{
            background-color: #002699;
            cursor:pointer;
        }

    }

    span{
        font-size:13px;
        color:#4d4d4d;
        margin-left:25px;
    }

`

const TextAreaWrapper = styled.div`

    .notification__text{
        border:1px solid #a6a6a6;
        margin-top:5px;
        width:98%;
        margin-left:auto;
        margin-right:auto;
        height:50px;
        outline:none;
    }
`