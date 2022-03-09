import axios from 'axios'
import React, { FC, useEffect, useState } from 'react'
import API_URL from '../api_url'
import LeftBar from '../components/LeftBar'
import Account from '../models/Account'
import BankOperation from '../models/BankOperation'
import './Message.css'

interface MessageProps{
    setLogout:(logout:boolean) => void
}
const Message:FC<MessageProps> = ({setLogout}) => {
    const [accounts, setAccounts] = useState<Account[]>([])
    const [messages, setMessages] = useState<BankOperation[]>([])
    const [show, setShow] = useState<boolean>(false);
    useEffect(()=>{
        const id = sessionStorage.getItem("id");
        axios.get(API_URL+'/account/get-accounts/'+id)
        .then(response => {
            setAccounts(response.data)
        })
    },[])

    async function handleShowMessage(accountType:string){
        const id = sessionStorage.getItem("id");
        const response = await axios.get(API_URL+'/bankoperation/get-bank-operations/'+id);
        const bankOperations:BankOperation[] = response.data
        const filtered:BankOperation[] = bankOperations.filter(operation => operation.fromAccount == accountType);
        filtered.reverse();
        setMessages(filtered);
        setShow(true)
    }

  return (
    <div className='message__container'>
        <LeftBar setLogout={setLogout}/>
        <div className='message__accounts'>
            {accounts.map((account, i) =>
            <div key={i++} className='message__account_wrapper' onClick={()=>handleShowMessage(account.accountType)}>
                Banking App {account.accountType}
            </div>
            )}
            {show?
                <div className='message__viewer'>
                <div className='message__header'>
                    Сообщения
                </div>
                <div className='message__texts'>
                    {messages.map(function (message, i){
                        if(message.bankOperationType == 'Перевод'){
                            return (
                                <div key={i++} className="message__transfer">
                                    {message.bankOperationType} {message.bankOperationMoneyAmount}
                                    {message.bankOperationParticipant !== 'None' ? 
                                    <div className='message__participant'>{message.bankOperationParticipant}
                                        <br/>
                                        {message.bankOperationTime}
                                    </div> : null}
                                </div>
                            )
                        }
                        else{
                            return (
                                <div key={i++} className="message__deposit">
                                    {message.bankOperationType} {message.bankOperationMoneyAmount}
                                    {message.bankOperationParticipant !== 'None' ? 
                                    <div className='message__participant'>{message.bankOperationMaker}
                                        <br/>
                                        {message.bankOperationTime}
                                    </div> : null}
                                </div>
                            )
                        }
                    }

                    )}
                </div>
            </div>:null}
        </div>
    </div>
  )
}

export default Message