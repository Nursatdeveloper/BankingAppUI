import React, { useState } from 'react'
import styled from 'styled-components'
import API_URL from '../api_url';


const SendNotificationForm = () => {
    const [notification, setNotification] = useState<string>('');
    const [notificationReceiver, setNotificationReceiver] = useState<string>('');

    async function sendNotification() {
        const token = sessionStorage.getItem('token');
        const url = `${API_URL}/user/send-notification`
        const SendNotificationCommand = {
            notificationText : notification,
            notificationReceiver : notificationReceiver
        }
        await fetch(url, {
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                'Authorization':`${token}`,
                'Accept':'application/json'
            },
            body: JSON.stringify(SendNotificationCommand)
        }).then(response => response.json())
        .then(result => alert(result))
        .catch(error => console.log(error));
        setNotification('');
        setNotificationReceiver('');
    }

  return (
    <NotificationFormWrapper>
        <span>Отправить уведомление</span>
        <TextAreaWrapper>
            <textarea className='notification__text' value={notification} onChange={(e) => setNotification(e.target.value)}>
            </textarea>
        </TextAreaWrapper>
        <div>
            <select value={notificationReceiver} onChange={(e) => setNotificationReceiver(e.target.value)}>
                <option>Кому</option>
                <option>Всем</option>
                <option>Клиентам</option>
                <option>Сотрудникам</option>
            </select>
            <button onClick={sendNotification}>
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