import React, { FC } from 'react'
import LeftBar from '../components/LeftBar'
import MainSection from '../components/MainSection'
import Account from '../models/Account'
import User from '../models/User'
import './Profile.css'

interface ProfileProps{
  user:User,
  accounts:Account[]
}

const Profile:FC<ProfileProps> = ({user, accounts}) => {
  return (
    <div className='profile__container'>
      <LeftBar />
      <div>Firstname: {user.firstName}</div>
      <MainSection />
    </div>
  )
}

export default Profile