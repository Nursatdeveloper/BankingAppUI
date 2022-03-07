import React, { FC } from 'react'
import './RightBar.css'
import Notification from '../models/Notification'

interface RightBarProps{
  notifications:Notification[]
}

const RightBar:FC<RightBarProps> = ({notifications}) => {
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