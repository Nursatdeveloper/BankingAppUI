import React, { FC, useState } from 'react'
import styled from 'styled-components'
import '../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'

interface MenuProps{
    setLogout:(logout:boolean) => void
}

const Menu:FC<MenuProps> = ({setLogout}) => {
    let navigate = useNavigate();
    const redirect = (url:string) =>{
        navigate(url);
    }

    const [icon, setIcon] = useState<string>('card');

    const selectedIcon = {
        color: '#000058',
        borderLeft: '4px solid #000058',
        borderRadius: '2px'
    }
    const defaultIcon = {
        color: '#a6a6a6'
    }

    function logout(){
        setLogout(false);
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('token');
        redirect('/login')
    }
  return (
    <MenuWrapper>
        <AppLogo className='logo'>

        </AppLogo>
        <ButtonWrapper>

            <MenuItem onClick={()=>setIcon('card')} style={icon === 'card'? selectedIcon:defaultIcon} >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-credit-card" viewBox="0 0 16 16">
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z"/>
                <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z"/>
                </svg>
            </MenuItem>

            <MenuItem onClick={()=>setIcon('folder')} style={icon === 'folder'? selectedIcon : defaultIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-folder" viewBox="0 0 16 16">
                    <path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z"/>
                    </svg>           
            </MenuItem>

            <MenuItem onClick={()=>setIcon('file')} style={icon === 'file'? selectedIcon : defaultIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-earmark-text-fill" viewBox="0 0 16 16">
                <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z"/>
                </svg>         
            </MenuItem>

        </ButtonWrapper>  
        <Logout onClick={logout}>
            <LogoutIcon>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
                <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                </svg>
                <div>Выйти</div>
            </LogoutIcon>
        </Logout> 
    
    
    </MenuWrapper>
  )
}

export default Menu
//#CDE9D6 - green, #D2E4FD = blue, #FFF1CB = yellow, #F8D3CF = red
const MenuWrapper = styled.div`
    width:7%;
    height:100vh;
    background-color:white;
    -webkit-box-shadow: 4px 1px 13px -2px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 4px 1px 13px -2px rgba(34, 60, 80, 0.2);
    box-shadow: 4px 1px 13px -2px rgba(34, 60, 80, 0.2);
`

const AppLogo = styled.div`
    background-size: cover;
    width:60px;
    height:50px;
    margin-right:auto;
    margin-left:auto;
    margin-top:10px;
`
const ButtonWrapper = styled.div`
    height:400px;
    width:50px;
    margin-top:100px;
    width:100px;
`

const MenuItem = styled.div`
    width:25px;
    padding-left:35px;
    margin-left:1px;
    padding-top:20px;
    padding-bottom:20px;
    padding-right:35px;
    margin-bottom:20px;
    transition:background-color, 0.4s ease-in-out;
    transition:border, 0.2s ease-out;
    :hover{
        background-color:#f2f2f2;
        cursor:pointer;
    }
    
`

const Logout = styled.button`
    color:#000058;
    margin-top:150px;
    width:fit-content;
    display:block;
    margin-left:auto;
    margin-right:auto;
    background-color:white;
    border:0;
`

const LogoutIcon = styled.div`
    width:50px;
    height:50px;
    svg{ 
        color:#a6a6a6;
        transition:color, 0.5s ease-in-out;
    }
    div{
        font-size:12px;
        color:#a6a6a6;
        transition:color, 0.5s ease-in-out;
    }


    :hover{
        div{ color:#000058; }
        svg{ color:#000058; }
        cursor:pointer;
    }
`