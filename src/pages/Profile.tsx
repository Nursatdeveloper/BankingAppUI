import React, { FC } from 'react'
import LeftBar from '../components/LeftBar'
import MainSection from '../components/MainSection'
import RightBar from '../components/RightBar'
import Account from '../models/Account'
import User from '../models/User'
import './Profile.css'
import Notification from '../models/Notification'

interface ProfileProps{
  user:User,
  accounts:Account[],
  notifications:Notification[],
  setLogout:(logout:boolean) => void
}

const Profile:FC<ProfileProps> = ({user, accounts, notifications, setLogout}) => {
  return (
    <div className='profile__container'>
      <LeftBar setLogout={setLogout}/>
      <MainSection userId={user.userId}/>
      <RightBar userId={user.userId} />
    </div>
  )
}

export default Profile