import React, { FC, useEffect, useState } from 'react'
import './RightBar.css'
import Notification from '../models/Notification'
import axios from 'axios';
import API_URL from '../api_url';

interface RightBarProps{
  userId:number
}

const RightBar:FC<RightBarProps> = ({userId}) => {
  const [notifications,setNotifications] = useState<Notification[]>([]);
  useEffect( ()=>{
    apiRequest();
  },[])

  async function apiRequest(){
    const id = sessionStorage.getItem("id");
    const response = await fetch(API_URL+'/user/get-notifications-by-userid/'+id, {
      method: "GET",
      /*headers: {
          "Accept": "application/json",
          "Authorization": "Bearer " + token  
      }*/
    });
    if (response.ok === true) {     
        const data = await response.json();
        setNotifications(data);
    }
    else
        apiRequest()
  }

  return (
    <div className='rightbar__container'>
      <div className="notification__header">Уведомления</div>
      <div className='notification__container'>
        {notifications.map((notification, i) =>
          <div key={i++} className="notification__row" >
            <div>{notification.notificationText}</div>
            <div className='notification__time'>{notification.notificationTime}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default RightBar