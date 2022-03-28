import React, { useState } from 'react'
import styled from 'styled-components'
import API_URL from '../api_url';

const CreateEmployeeForm = () => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [iin, setIIN] = useState<string>('');
    const [birth, setBirth] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [telephone, setTelephone] = useState<string>('');
    const [role, setRole] = useState<string>('');
    const [password, setPassword] = useState<string>('1234');

    function handleSubmit(event:React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const id = sessionStorage.getItem('id');
        const token = sessionStorage.getItem('token');
        const url = `${API_URL}/user/create-employee`;
        const CreateEmployeeCommand = {
            firstName: firstName,
            lastName: lastName,
            iin: iin,
            birthDate:birth,
            gender:gender,
            phoneNumber:telephone,
            role: role,
            password:password
        }
        fetch(url, {
            method:"POST",
            headers:{
                'Authorization':`${token}`,
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
            body: JSON.stringify(CreateEmployeeCommand)
        }).then(response => response.json())
        .then(result => {
            alert(result)
            setFirstName('')
            setLastName('')
            setGender('')
            setIIN('')
            setTelephone('')
            setPassword('1234')
            setBirth('')
            setRole('')
        })
        .catch(error => console.log(error))
    }

  return (
    <CreateEmployeeWrapper>
        <form onSubmit={handleSubmit}>
            <div className='title'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
                <div>Добавить сотрудника</div>
            </div>
            <div>
                <input type='text' placeholder='Имя' value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                <input type='text' placeholder='Фамилия' value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div>
                <span>ИИН: </span>
                <input type='text' value={iin} onChange={(e) => setIIN(e.target.value)} />
            </div>
            <div>
                <span>День рождения: </span>
                <input type='date' value={birth} onChange={(e) => setBirth(e.target.value)} />
            </div>
            <div>
                <span>Пол: </span>
                <select value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option>Выберите пол</option>
                    <option>Мужской</option>
                    <option>Женский</option>
                </select>
            </div>
            <div>
                <span>Телефон: </span>
                <input type='text' value={telephone} onChange={(e) => setTelephone(e.target.value)} />
            </div>
            <div>
                <span>Роль: </span>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option>Выберите роль</option>
                    <option>Администратор</option>
                    <option>Сотрудник</option>
                </select>
            </div>
            <div>
                <span>Пароль:</span>
                <input type='text' value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <CreateAdminButton type='submit'>
                Добавить
            </CreateAdminButton>
        </form>
    </CreateEmployeeWrapper>
  )
}

export default CreateEmployeeForm

const CreateEmployeeWrapper = styled.div`
    width:400px;
    height:350px;
    background-color:white;
    border:1px solid #e3e3e3;
    margin-left:20px;
    margin-top:20px;
    border-radius:5px;
    color:#4d4d4d;
    .title{
        font-size:13px;
        display:flex;
        padding-top:10px;
        margin-left:10px;
        svg{
            width:20px;
            height:20px;
        }
    }
    div{
        padding-bottom:5px;
    }
    input{
        margin-left:20px;
        margin-top:10px;
        border:1px solid #a6a6a6;
        height:20px;
        outline:none;
    }
    input::placeholder{
        padding-left:10px;
    }
    span{
        margin-left:20px;
        font-size:14px;
    }
    select{
        margin-left:10px;
        outline:none;
        border:0;
        border-bottom:1px solid #666;
    }
`

const CreateAdminButton = styled.button`
    border:0;
    padding-top:5px;
    padding-bottom:5px;
    padding-left:10px;
    padding-right:10px;
    margin-top:10px;
    margin-left:20px;
    background-color:#0033cc;
    color:white;
    border-radius:3px;
    display:flex;
    transition:background-color, 0.5s ease-in-out;
    svg{
        margin-right:10px;
    }
    :hover{
        background-color: #002699;
        cursor:pointer;
    }
`
