import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import API_URL from '../api_url';

const Header = () => {
    const [userName, setUserName] = useState<string>('');
    const [userBase64Img, setUserBase64Img] = useState<string>('');
    const [userRole, setUserRole] = useState<string>('');
    let navigate = useNavigate();
    const redirect = (url:string) =>{
        navigate(url);
    }
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

    function logout() {
        sessionStorage.removeItem('id')
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('isAdmin')
        redirect('/login')
    }
  return (
    <HeaderWrapper>
        <EmployeeInfo>
            <Logout onClick={logout}>
                <div className='svg_container'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
                        <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                    </svg>
                </div>
                <div className='logout'>
                    Выйти
                </div>
            </Logout>
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

const Logout = styled.div`
    margin-right:20px;
    color:white;
    .svg_container{
        svg{
            width:25px;
            height:25px;
        }
    }
    .logout{
        font-size:12px;
        margin-top:-5px;
    }
    :hover{
        cursor:pointer;
        color:#e3e3e3;
    }
`