import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import API_URL from '../api_url';
import Account from '../models/Account';
import User from '../models/User';


const UserList = () => {
    const [userList, setUserList] = useState<User[]>([]);
    const [userId, setUserId] = useState<number>(0);
    const [fname, setFname] = useState<string>('');
    const [lname, setLname] = useState<string>('');
    const [iin, setIIN] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [telephone, setTelephone] = useState<string>('');
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [showChangeRoleForm, setShowChangeRoleForm] = useState<boolean>(false);
    const [userRole, setUserRole] = useState<string>('');
    const [userPhotoBase64String, setUserPhotoBase64String] = useState<string>('');

    let navigate = useNavigate();
    const redirect = (url:string) =>{
        navigate(url);
    }
    
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const url = `${API_URL}/user/get-all-users`;
        fetch(url, {
            method:"GET",
            headers:{
                'Accept':'application/json',
                'Authorization': `${token}`
            }
        }).then(response => {
            if(response.status === 401){
                alert('В целях безопасности перезайдите заново!')
                redirect('/login')
            }
            return response.json();
        })
        .then(users => {
            setUserList(users)      
        })
        .catch(error => console.log(error))

    }, [])

    function handleUserClick(userId:number) {
        const userAccountsUrl = `${API_URL}/account/get-accounts/${userId}`;
        const token = sessionStorage.getItem('token');
        fetch(userAccountsUrl, {
            method:"GET",
            headers: {
                'Accept':'application/json',
                'Authorization':`${token}`
            }
        }).then(response => response.json())
        .then(accounts => {
            setAccounts(accounts)
        })
        const user:User[] = userList.filter(user => user.userId === userId);
        setUserId(user[0].userId)
        setFname(user[0].firstName)
        setLname(user[0].lastName)
        setGender(user[0].gender)
        setIIN(user[0].iin)
        setTelephone(user[0].phoneNumber)

        const photoUrl = `${API_URL}/user/get-user-photo/${userId}`
        fetch(photoUrl, {
            method:"GET",
            headers:{
              "Authorization":`${token}`
            }
          }).then(response => response.json())
          .then(result => {
            var base64 = `data:image/png;base64, ${result.photoBytes}`
            setUserPhotoBase64String(base64)
          })
          .catch(error => console.log(error))
    }

    function blockAccount(accountId:number, isBlocked:boolean){
        const token = sessionStorage.getItem('token');
        var url = `${API_URL}/account/block-account`

        if(isBlocked) {
            url = `${API_URL}/account/unblock-account`
        }
        fetch(url, {
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                'Authorization':`${token}`,
                'Accept':'application/json'
            },
            body: JSON.stringify({accountId: accountId})
        }).then(response => response.json())
        .then(result => alert(result))
    }

    function changeUserRole() {
        const token = sessionStorage.getItem('token');
        var url = `${API_URL}/user/change-user-role`
        const ChangeUserRoleCommand = {
            userId: userId,
            role: userRole
        }
        fetch(url, {
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                'Authorization':`${token}`,
                'Accept':'application/json'
            },
            body: JSON.stringify(ChangeUserRoleCommand)
        }).then(response => response.json())
        .then(result => {
            alert(result)
            setUserRole('');
        })
    }

  return (
    <UserListWrapper>

        <UserTable>
            <UserTableHeader>
                <div className='id'>
                    ID:
                </div>
                <div className='name'>
                    ФИО:
                </div>
                <div className='birth'>
                    Дата рождения:
                </div>
                <div className='gender'>
                    Пол:
                </div>
                <div className='telephone'>
                    Телефон:
                </div>
                <div className='role'>
                    Роль:
                </div>
                <div className='iin'>
                    ИИН:
                </div>

            </UserTableHeader>
            <UserTableBody>
                {userList.map((user, i) => 
                    <UserTableRow key={i++} onClick={() => handleUserClick(user.userId)}>
                        <div className='id'>
                            {user.userId}
                        </div>
                        <div className='name'>
                            {user.firstName} {user.lastName}
                        </div>
                        <div className='birth'>
                            {user.birthDate.slice(0, 10)}
                        </div>
                        <div className='gender'>
                            {user.gender}
                        </div>
                        <div className='telephone'>
                            {user.phoneNumber}
                        </div>
                        <div className='role'>
                            {user.role}
                        </div>
                        <div className='iin'>
                            {user.iin}
                        </div>
                    </UserTableRow>
                )}
            </UserTableBody>
        </UserTable>

        <SelectedUser>
            <div className='left'>
                <div className='img_wrapper'>
                    <img src={userPhotoBase64String} />
                </div>
                <div className='info'>
                    Имя: {fname}
                </div>
                <div className='info'>
                    Фамилия: {lname}
                </div>
                <div className='info'>
                    ИИН: {iin}
                </div>
                <div className='info'>
                    Телефон: {telephone}
                </div>
                <div className='info'>
                    Пол: {gender}
                </div>
            </div>
            <div className='center'>
                <div>
                    Счета:
                </div>
                {accounts.map((a, i) => 
                <div key={i++} className="account_wrapper">
                    <div>{i+1}. {a.accountType}</div>
                    <div className='account_details'>IBAN: {a.accountNumber}</div>
                    <div className='account_details'>Дата открытия: {a.activatedDate.slice(0, 10)} </div>
                    <div className='account_details'>Доступно: {a.balance} {a.currencyType}</div>
                    <div className='account_details'>Активен: {a.isActive ? 'Да' : 'Нет'}</div>
                    <div className='account_details'>Заблокирован: {a.isBlocked ? 'Да' : 'Нет'}</div>

                </div>)}
            </div>
            <div className='right'>
                {accounts.map((a, i) => 
                    <div className='block__account' onClick={() => blockAccount(a.accountId, a.isBlocked)}>{a.isBlocked ? 'Разблокировать' : 'Заблокировать'} {a.accountType}</div>
                )}
                <div className='change__role' onClick={() => setShowChangeRoleForm(!showChangeRoleForm)}>
                    Изменить роль
                </div>

                {showChangeRoleForm ? 
                    <div className='change_role_form'>
                        <select value={userRole} onChange={(e) => setUserRole(e.target.value)}>
                            <option>Выберите роль</option>
                            <option>Администратор</option>
                            <option>Сотрудник</option>
                            <option>Пользователь</option>
                        </select>
                        <button onClick={()=> changeUserRole()}>Изменить</button>
                    </div>
                    : null}
            </div>
            
        </SelectedUser>
    </UserListWrapper>
  )
}

export default UserList

const UserListWrapper = styled.div`
    width:92%;
    height:680px;
    position:absolute;
    top:90px;
    left:4%;
    right:4%;
    background-color:#f2f2f2;
    border-radius:10px;
`


const UserTable = styled.div`
    width:95%;
    margin-left:auto;
    margin-right:auto;
    border:1px solid #a6a6a6;
    margin-top:20px;
    height:300px;
    background-color:white;
`

const UserTableHeader = styled.div`
    display:flex;
    border-bottom:1px solid #a6a6a6;
    padding-bottom:5px;
    padding-top:5px;
    background-color:white;
    div{
        text-align:center;
    }
    .id{
        width:7%;
    }
    .name{
        width:20%;
    }
    .birth{
        width:20%;
    }
    .gender{
        width:10%;
    }
    .telephone{
        width:15%;
    }
    .role{
        width:15%;
    }
    .iin{
        width:12%;
    }

`

const UserTableBody = styled.div`
    background-color:white;
    color:#4d4d4d;
`
const UserTableRow = styled.div`
    display:flex;
    text-align:center;
    font-size:14px;
    padding-top:5px;
    padding-bottom:5px;
    border-bottom:1px solid #e3e3e3;
    :hover{
        background-color:#f2f2f2;
        cursor:pointer;
    }
    .id{
        width:7%;
    }
    .name{
        width:20%;
    }
    .birth{
        width:20%;
    }
    .gender{
        width:10%;
    }
    .telephone{
        width:15%;
    }
    .role{
        width:15%;
    }
    .iin{
        width:12%;
    }
`

const SelectedUser = styled.div`
    border:1px solid #a6a6a6;
    width:95%;
    margin-right:auto;
    margin-left:auto;
    margin-top:20px;
    height:300px;
    background-color:white;
    display:flex;
    .left{
        width:25%;
        .img_wrapper{
            width:100px;
            height:110px;
            margin-left:20px;
            margin-top:20px;
            img{
                width:100px;
                height:110px;
            }
        }
        .info{
            margin-top:10px;
            margin-left:20px;
            font-size:14px;
        }
        
    }
    .center{
        width:35%;
        padding-top:20px;
        font-size:14px;
        .account_details{
            margin-left:20px;
        }
        .account_wrapper{
            margin-top:10px;
        }
    }
    .right{
        width:40%;
        .block__account{
            font-size:14px;
            margin-top:15px;
            margin-left:20px;
            text-decoration:underline;
            color:blue;
            transition:color, 0.5s ease-in-out;
            :hover{
                color:red;
                cursor:pointer;
            }
        }
        .change__role{
            margin-top:15px;
            margin-left:20px;
            font-size:14px;
            text-decoration:underline;
            color:blue;
            transition:color, 0.5s ease-in-out;
            :hover{
                color:orange;
                cursor:pointer;
            }
        }
        .change_role_form{
            margin-left:20px;
            margin-top:20px;
            select{
                border:0;
                border-bottom:1px solid #4d4d4d;
                color:#666
            }
            button{
                margin-left:10px;
                border:0;
                background-color:orange;
                padding-top:4px;
                padding-bottom:4px;
                padding-left:10px;
                padding-right:10px;
                color:white;
                border-radius:3px;
                cursor:pointer;
                
            }
        }
    }

    

`