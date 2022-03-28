import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import API_URL from '../api_url';

const Header = () => {
    const [userName, setUserName] = useState<string>('');
    const [userBase64Img, setUserBase64Img] = useState<string>('');
    const [userRole, setUserRole] = useState<string>('');

    useEffect(() => {
        setTimeout(()=> setUserCredentials(), 200)
        setUserPhoto();
    },[])

    async function setUserCredentials() {
        const id = sessionStorage.getItem('id');
        const token = sessionStorage.getItem('token');
        const url = `${API_URL}/user/get-user-by-id/${id}`;
        await fetch(url, {
            method:'GET',
            headers: {
                'Authorization':`${token}`,
                'Accept':'application/json'
            }
        }).then(response => response.json())
        .then(result => {
            setUserName(`${result.firstName} ${result.lastName}`);
            setUserRole(result.role);
        })
        .catch(error => console.log(error));
    }

    async function setUserPhoto() {
        const id = sessionStorage.getItem('id');
        const photoUrl = `${API_URL}/user/get-user-photo/${id}`
        const token = sessionStorage.getItem('token');

        var status = 0;
        await fetch(photoUrl, {
            method:"GET",
            headers:{
              "Authorization":`${token}`
            }
          }).then(response => {
              status = response.status
              return response.json()
          })
          .then(result => {
            var base64 = `data:image/png;base64, ${result.photoBytes}`
            if(status === 404){
                setUserBase64Img('');
            } else {
                setUserBase64Img(base64)
            }
          })
          .catch(error => console.log(error))
    }
  return (
    <HeaderWrapper>
        <EmployeeInfo>
            <ImgWrapper>
                {userBase64Img === '' ? <img src={require('../images/user.png')} /> : <img src={userBase64Img} />}
            </ImgWrapper>
            <NameWrapper>
                <div className='user__name'>{userName}</div>
                <div className='user__role'>Роль: {userRole}</div>
            </NameWrapper>
        </EmployeeInfo>
    </HeaderWrapper>
  )
}

export default Header

const HeaderWrapper = styled.div`
    width:85%;
    height:180px;
    background-color:#0033cc;
    position:fixed;
    opacity:0.8;
`

const EmployeeInfo = styled.div`
    position:absolute;
    display:flex;
    right:20px;
    top:5px;
    padding:10px;
`

const ImgWrapper = styled.div`
    border:1px solid white;
    width:35px;
    height:35px;
    border-radius:50%;
    margin-right:20px;
    img{
        width:35px;
        height:35px;
        border-radius:50%;
    }
`

const NameWrapper = styled.div`
    color:white;

    .user__name{
        font-size:15px;
    }

    .user__role{
        font-size:12px;
    }
`