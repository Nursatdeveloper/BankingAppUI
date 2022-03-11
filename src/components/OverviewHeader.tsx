import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import API_URL from '../api_url'
import Notification from '../models/Notification'
import '../App.css'

const OverviewHeader = () => {
    const [notifications, setNotifications] = useState<Notification[]>([])
    const [showNotification, setShowNotification] = useState<boolean>(false);
    const [newNotifications, setNewNotifications] = useState<number>(0);
    useEffect(()=>{
        const id = sessionStorage.getItem('id');
        const token = sessionStorage.getItem('token')
        const path = `${API_URL}/user/get-notifications-by-userid/${id}`;
        setTimeout(() => fetch(path, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Authorization': `${token}`
            },
          }).then (function (response) {return response.json()})
            .then(function (json) {
              setNotifications(json)
              var newNotificationsNumber:number = 0;
              json.map(function(n:Notification){
                  if(n.isSeen == false){
                      console.log(n)
                    newNotificationsNumber++;
                  }
              })
              setNewNotifications(newNotificationsNumber)
            })
            .catch(function (error) {console.log(error)}), 1000)
    },[])



    function showNotificationViewer(){
        setShowNotification(!showNotification)

        const userId = sessionStorage.getItem('id')
        const token = sessionStorage.getItem('token')
        const changeUserNotificationStatusCommand = {
            userId: userId
        }
        fetch(API_URL+'/user/change-notification-status', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'Authorization': `${token}`
            },
            body: JSON.stringify(changeUserNotificationStatusCommand)
          }).then (function (response) {return response.json()})
            .then(function (json) {
              setNewNotifications(0)
            })
            .catch(function (error) {console.log(error)})

    }

  return (
    <OverviewHeaderWrapper>

        <NotificationButton onClick={showNotificationViewer}>        
            <div className={newNotifications > 0 ? 'bounce' : ''}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bell-fill" viewBox="0 0 16 16">
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
                </svg>
            </div>
            {newNotifications > 0 ? <div className='notification_number'>{newNotifications}</div> : null}
        </NotificationButton>

        <Profile>
            <div></div>
            Nursat Zeinolla
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
            </svg>
        </Profile>

        <NotificationViewer className={showNotification ? 'showNotificationViewer' : 'hideNotificationViewer'}>
            {notifications.map((notification, i) => 
                <div key={i++} className='notification'>
                    {notification.notificationText}
                    <div>{notification.notificationTime.slice(0, 10)} Время: {notification.notificationTime.slice(11, 16)}</div>
                </div>    
            ).reverse()}
        </NotificationViewer>

    </OverviewHeaderWrapper>
  )
}

export default OverviewHeader

const OverviewHeaderWrapper = styled.div`
    font-size:22px;
    color:#4d4d4d;
    height:59px;
    padding-top:0.5px;
    border-bottom:2px solid #f2f2f2;
    display:flex;
    position:relative;
    background-color:white;
    z-index:3;
`

const NotificationButton = styled.div`
    display:flex;
    width:41px;
    padding-left:20px;
    position:absolute;
    right:230px;
    border-left:2px solid #f2f2f2;
    border-right:2px solid #f2f2f2;
    padding-top:15px;
    height:45px;
    .notification_number{
        font-size:9px;
        border-radius:50%;
        background-color:red;
        color:white;
        width:12px;
        height:13px;
        text-align:center;
    }
    svg{
        color:#a6a6a6;
        margin-top:10px;
        transition:color, 0.5s ease-in-out;
    }
    :hover{
        cursor:pointer;
        svg{
            color:#000058;
        }
    }
    .bounce {
        -moz-animation: bounce 3s infinite;
        -webkit-animation: bounce 3s infinite;
        animation: bounce 3s infinite;
    }
    @-moz-keyframes bounce {
      0%, 20%, 50%, 80%, 100% {
        -moz-transform: translateY(0);
        transform: translateY(0);
      }
      40% {
        -moz-transform: translateY(-10px);
        transform: translateY(-10px);
      }
      60% {
        -moz-transform: translateY(-5px);
        transform: translateY(-5px);
      }
    }
    @-webkit-keyframes bounce {
      0%, 20%, 50%, 80%, 100% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
      }
      40% {
        -webkit-transform: translateY(-10px);
        transform: translateY(-10px);
      }
      60% {
        -webkit-transform: translateY(-5px);
        transform: translateY(-5px);
      }
    }
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% {
        -moz-transform: translateY(0);
        -ms-transform: translateY(0);
        -webkit-transform: translateY(0);
        transform: translateY(0);
      }
      40% {
        -moz-transform: translateY(-7px);
        -ms-transform: translateY(-7px);
        -webkit-transform: translateY(-7px);
        transform: translateY(-7px);
      }
      60% {
        -moz-transform: translateY(-5px);
        -ms-transform: translateY(-5px);
        -webkit-transform: translateY(-5px);
        transform: translateY(-5px);
      }
    }
`

const Profile = styled.div`
    display:flex;
    font-size:16px;
    position:absolute;
    right:40px;
    padding-top:15px;
    div{
        border-radius:50%;
        width:30px;
        height:30px;
        border:1px solid #e3e3e3;
        margin-right:10px;
    }
    svg{
        color:#a6a6a6;
        margin-top:5px;
        margin-left:10px;
    }
`

const NotificationViewer = styled.div`
    width:292px;
    position:absolute;
    right:0;
    z-index:2;
    top:61px;
    height:300px;
    background-color:white;
    transition: height, 0.5s ease-in-out;
    overflow-y:scroll;
    .notification{
        font-size:12px;
        margin-top:10px;
        margin-bottom:5px;
        padding:5px;
        margin-left:10px;
        margin-right:10px;
        background-color:#F5F7F9;
        div{
            font-size:10px;
        }
    }
`