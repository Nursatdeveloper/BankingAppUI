import axios from 'axios'
import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import API_URL from '../api_url'
import Notification from '../models/Notification'
import '../App.css'

interface OverviewHeaderProps{

}

const OverviewHeader:FC<OverviewHeaderProps> = () => {
    const [notifications, setNotifications] = useState<Notification[]>([])
    const [showNotification, setShowNotification] = useState<boolean>(false);
    const [showUserInformation, setShowUserInformation] = useState<boolean>(false);
    const [showPhotoInput, setShowPhotoInput] = useState<boolean>(false);
    const [newNotifications, setNewNotifications] = useState<number>(0);
    const [userName, setUserName] = useState<string>('');
    const [telephone, setTelephone] = useState<string>('');
    const [iin, setIIN] = useState<string>('');
    const [birthDate, setBirthDate] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [role, setRole] = useState<string>('');
    const [file, setFile] = useState<FormData>();
    const [userPhotoBase64String, setUserPhotoBase64String] = useState<string>('')

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
                    newNotificationsNumber++;
                  }
              })
              setNewNotifications(newNotificationsNumber)
            })
            .catch(function (error) {console.log(error)}), 1000)
        
        const url = `${API_URL}/user/get-user-by-id/${id}`
        fetch(url, {
          method:"GET",
          headers:{
            'Accept':'application/json',
            'Authorization':`${token}`
          }
        }).then(response => response.json())
        .then(user => {
          setUserName(`${user.firstName} ${user.lastName}`)
          setTelephone(user.phoneNumber);
          setIIN(user.iin);
          setGender(user.gender);
          setRole(user.role);
          setBirthDate(user.birthDate)
        })
        .catch(error => console.log(error))

        const photoUrl = `${API_URL}/user/get-user-photo/${id}`
        setTimeout(() => fetch(photoUrl, {
          method:"GET",
          headers:{
            "Authorization":`${token}`
          }
        }).then(response => response.json())
        .then(result => {
          var base64 = `data:image/png;base64, ${result.photoBytes}`
          setUserPhotoBase64String(base64)
        })
        .catch(error => console.log(error)), 700)
    },[])



    function showNotificationViewer(){
        setShowNotification(!showNotification)
        setShowUserInformation(false);
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

    function showUserInformationViewer(){
      if(showNotification){
        setShowNotification(!showNotification);
      }
      setShowUserInformation(!showUserInformation);
    }

    function handlePhotoChange(e:ChangeEvent<HTMLInputElement>){
      e.preventDefault();
      let form = new FormData();
      if(e.target.files !== null){
        for(var i = 0; i < e.target.files?.length; i++){
          var element = e.target.files[i];
          form.append('UserPhoto', element);
        }
        form.append('UserId', `${sessionStorage.getItem('id')}`)
        setFile(form)
      }
    }

    function savePhoto(){
      const id = sessionStorage.getItem('id');
      const token = sessionStorage.getItem('token')
      const url = `${API_URL}/user/add-user-photo`
      
      fetch(url, {
        method:"POST",
        headers:{
          "Accept":"application/json",
          "Authorization":`${token}`
        },
        body:file
      }).then(response => response.json())
      .then(result => {
        alert(result);
        setShowPhotoInput(false);
      })
      .catch(error => console.log(error))
    }


  return (
    <OverviewHeaderWrapper>

        <HeaderItem>
          <NotificationButton onClick={showNotificationViewer}>        
              <div className={newNotifications > 0 ? 'bounce' : ''}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bell-fill" viewBox="0 0 16 16">
                  <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
                  </svg>
              </div>
              {newNotifications > 0 ? <div className='notification_number'>{newNotifications}</div> : null}
          </NotificationButton>

          <Profile onClick={showUserInformationViewer}>
              {userPhotoBase64String !== '' ? 
              <div className='photo__container'>
                <img src={userPhotoBase64String}/>
              </div> :
              <div className='photo__container'>
                <img src={require('../images/user.png')} />
              </div>}
              <div className='name__container'>{userName}</div>
              {showUserInformation ? 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-up" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                </svg>
              :
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                </svg>}

          </Profile>
        </HeaderItem>

        <NotificationViewer className={showNotification ? 'showNotificationViewer' : 'hideNotificationViewer'}>
            {notifications.map((notification, i) => 
                <div key={i++} className='notification'>
                    {notification.notificationText}
                    <div>{notification.notificationTime.slice(0, 10)} Время: {notification.notificationTime.slice(11, 16)}</div>
                </div>    
            ).reverse()}
        </NotificationViewer>

        <UserInformation className={showUserInformation ? 'showUserInformation' : 'hideUserInformation'}>
              {userPhotoBase64String === '' ?
              <div className='image__container'>
                <img src={require("../images/user.png")} />
              </div> :
              <div className='image__container'>
                <img src={userPhotoBase64String} />
              </div>}
              <div className='change__photo' onClick={()=> setShowPhotoInput(!showPhotoInput)}>
                Изменить фотографию
              </div>

              <div className={showPhotoInput ? "input__wrapper" : 'hide'}>
                <input name="file" type="file" id="input__file" className="input input__file"  onChange={handlePhotoChange}/>
                <label htmlFor="input__file" className="input__file-button">
                    <span className="input__file-icon-wrapper">
                      <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-download input__file-icon" viewBox="0 0 16 16">
                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                      </svg>
                    </span>
                    <span className="input__file-button-text">Выберите файл</span>
                </label>
                <button onClick={savePhoto}>Сохранить</button>
              </div>
             <div className='personal_info' >
              <div className='information'>
                  <div>Клиент:</div>
                  <div>{userName}</div>
                </div>
                <div className='information'>
                  <div>ИИН:</div>
                  <div>{iin}</div>
                </div>
                <div className='information'>
                  <div>Телефон:</div>
                  <div>{telephone}</div>
                </div>
                <div className='information'>
                  <div>Дата рождения:</div>
                  <div>{birthDate.slice(0, 10)}</div>
                </div>
                <div className='information'>
                  <div>Пол:</div>
                  <div>{gender}</div>
                </div>
                <div className='information'>
                  <div>Роль:</div>
                  <div>{role}</div>
                </div>
             </div>
        </UserInformation>

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

const HeaderItem = styled.div`
  display:flex;
  position:absolute;
  right:10px;
  width:300px;
`

const NotificationButton = styled.div`
    display:flex;
    width:41px;
    padding-left:20px;
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
    padding-top:15px;
    cursor:pointer;
    margin-left:20px;
    .photo__container{
        border-radius:50%;
        width:35px;
        height:35px;
        border:1px solid #e3e3e3;
        margin-right:10px;
        img{
          width:35px;
          height:35px;
          border-radius:50%;
        }
    }
    .name__container{
      width:145px;
      font-size:14px;
      padding-top:5px;
    }
    svg{
        color:#a6a6a6;
        margin-top:5px;
        margin-left:10px;
    }
`

const NotificationViewer = styled.div`
    width:310px;
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

const UserInformation = styled.div`
  width:267px;
  position:absolute;
  right:0;
  z-index:2;
  top:61px;
  height:360px;
  background-color:white;
  transition: height, 0.5s ease-in-out;
  padding-left:20px;
  padding-right:20px;
  .image__container{
    border:1px solid #e3e3e3;
    border-radius:50%;
    width:70px;
    height:70px;
    margin-left:auto;
    margin-right:auto;
    margin-top:10px;
    margin-bottom:10px;
    img{
      width:70px;
      height:70px;
      border-radius:50%;
    }
  }
  .change__photo{
    font-size:12px;
    color:orange;
    text-align:center;
    :hover{
      text-decoration:underline;
      cursor:pointer;
    }
  }

  .photo_input{
    color:orange;
  }
  .personal_info{
    margin-top:10px;
  }
  .information{
    display:flex;
    font-size:14px;
    padding-top:5px;
    padding-bottom:8px;
    div{
      margin-right:10px;
    }
  }

  .input__wrapper {
    width: 100%;
    position: relative;
    margin: 15px 0;
    text-align: center;
    display:flex;
    button{
      font-size:12px;
      background-color:#1bbc9b;
      color white;
      border:0;
      border-radius:3px;
    }
  }
   
  .input__file {
    opacity: 0;
    visibility: hidden;
    position: absolute;
  }
   
  .input__file-icon-wrapper {
    height: 60px;
    width: 60px;
    margin-right: 15px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    border-right: 1px solid #fff;
  }
   
  .input__file-button-text {
    line-height: 1;
    margin-top: 1px;
  }
   
  .input__file-button {
    width: 100%;
    max-width: 170px;
    height: 30px;
    background: orange;
    color: #fff;
    font-size: 12px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    -webkit-box-pack: start;
        -ms-flex-pack: start;
            justify-content: flex-start;
    border-radius: 3px;
    cursor: pointer;
    margin: 0 auto;
  }
`