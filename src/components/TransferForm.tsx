import axios from 'axios';
import React, { FC, useEffect, useState } from 'react'
import { json } from 'stream/consumers';
import API_URL from '../api_url';
import Account from '../models/Account';
import User from '../models/User';
import '../pages/Transfer.css'

interface TransferFormProps{
    transferType:string
}

const TransferForm:FC<TransferFormProps> = ({transferType}) => {
    const [transfer, setTransfer] = useState<string>();
    const [myAccounts, setMyAccounts] = useState<Account[]>([]);
    const [fromAccount, setFromAccount] = useState<string>('');
    const [toAccount, setToAccount] = useState<string>('');
    const [transferAmount, setTransferAmount] = useState<string>('');
    const [receiverTel, setReceiverTel] = useState<string>('');
    const [receiver, setReceiver] = useState<User>({
        userId:0,
        firstName:"",
        lastName:"",
        iin:"",
        birthdate:"",
        phoneNumber:"",
        gender:"",
        cardNumber:"",
        role:"",
        accounts:[]
      });
    const [showReceiver, setShowReceiver] = useState<boolean>(false);


    useEffect(()=>{
        if(transferType == "to_client"){
            setTransfer("Перевод клиенту Banking App")
        }else{
            setTransfer("Перевод между своими счетами")
        }
        const id = sessionStorage.getItem("id");
        apiRequest(API_URL+'/account/get-accounts/'+id)

    },[transferType])

    async function apiRequest(url:string){
        const response = await fetch(url, {
          method: "GET",
          /*headers: {
              "Accept": "application/json",
              "Authorization": "Bearer " + token  
          }*/
        });
        if (response.ok === true) {     
            const data = await response.json();
            setMyAccounts(data);
        }
        else
            apiRequest(url)
    }

    async function makeTransfer(transferType:string){
        const id = sessionStorage.getItem('id')
        if(transferType === 'my_account'){    
            if(fromAccount == toAccount){
                return alert(`Невозможно сделать перевод! Выберите другой счет для перевода!`)
            }
            const MakeTransferToMyAccountCommand = {
                userId: id,
                fromAccount: fromAccount,
                toAccount: toAccount,
                transferAmount: transferAmount
            }
            console.log(MakeTransferToMyAccountCommand)
            axios.post(API_URL+'/BankOperation/make-transfer-myaccount', MakeTransferToMyAccountCommand)
                .then(response => {
                    alert(response.data.message);
                    setTransferAmount('');
                    setFromAccount('');
                    setToAccount('');
                })
        }
        else{
            if(fromAccount === ''){
                return alert("Выберите счет для перевода!")
            }
            else if(toAccount === ''){
                return alert("Выберите счет получателя!");
            }
            const response = await axios.get(API_URL+'/user/get-user-by-id/'+id);
            const senderTelephone = JSON.parse(response.data.phoneNumber)
            const MakeTransferCommand = {
                transferMaker: myAccounts[0].ownerName,
                transferAmount:transferAmount,
                transferFromAccountType: fromAccount,
                transferMakerCardNumber:null,
                transferMakerTelephone: `${senderTelephone}`,
                transferToAccountType:toAccount,
                receiverCardNumber:null,
                receiverTelephone:receiver.phoneNumber
            }
            console.log(MakeTransferCommand)
            const bankOperationResponse = await axios.post(API_URL+'/bankoperation/make-transfer', MakeTransferCommand)
            alert(JSON.stringify(bankOperationResponse.data.message))
            setReceiverTel('')
            setFromAccount('');
            setToAccount('')
            setTransferAmount('')
            setShowReceiver(false)
        }

    }

    function handleTelephoneChange(telephone:string){
        setReceiverTel(telephone);
        console.log(telephone)
        axios.get(API_URL+'/user/get-user-by-telephone/'+telephone)
            .then(response => {
                setReceiver(response.data);
                console.log(response.data)
            })
        setShowReceiver(true);
    }

  return (
    <div className='transferfrom__container'>
        <div className='transferform__header'>
            {transfer}
        </div>
        {transferType === 'my_account' ?
            <div style={{display:'flex'}}>
                <div className='select__wrapper'>
                    <label>Откуда: </label>
                    <select value={fromAccount} onChange={(e)=>setFromAccount(e.target.value)} >
                        <option>Выберите счет</option>
                        {myAccounts.map((account, i) => 
                            <option key={i++} value={account.accountType}>
                                {account.accountType} {account.balance}
                                {account.currencyType}
                            </option>
                            )}
                    </select>
                </div>
                <div className='select__wrapper'>
                    <label>Куда: </label>
                    <select value={toAccount} onChange={(e) => setToAccount(e.target.value)}>
                        <option  >Выберите счет</option>
                        {myAccounts.map((account, i) => 
                            <option key={i++} value={account.accountType}>{account.accountType} {account.balance}{account.currencyType}</option>
                            )}
                    </select>
                </div>
            </div>

            :

            <div style={{display:'flex'}}>
                <div className='client__transfer_item'>
                    <div>
                        <span>Телефон получателя</span>
                        <input type="text" className='transfer__input' value={receiverTel} onChange={(e)=>handleTelephoneChange(e.target.value)} />
                    </div>
                    {showReceiver ?
                    <div className='receiver__name'>
                        <span>{receiver.firstName} {receiver.lastName}</span>
                        <select className='receiver__accounttype_select' value={toAccount} onChange={(e) => setToAccount(e.target.value)}> 
                            <option>Счет клиента</option>
                            {receiver.accounts.map((acc, i) =>
                                <option key={i++} value={acc.accountType}>{acc.accountType}</option> )}
                        </select>
                    </div>
                    :null}
                </div>
                <div className='client__transfer_item'>
                    <span>Счет для перевода: </span>
                    <select value={fromAccount} onChange={(e)=>setFromAccount(e.target.value)} >
                        <option>Счет</option>
                        {myAccounts.map((account, i) => 
                            <option key={i++} value={account.accountType}>{account.accountType} {account.balance}{account.currencyType}</option>
                        )}
                    </select>
                </div>
            </div>
        }
        <div className='transfer__amount'>
            <label>Сумма перевода:</label>
            <input type="text" className='transfer__input' value={transferAmount} onChange={e => setTransferAmount(e.target.value)}/>
            <span>KZT</span>
            <br/>
            <button className='transfer__btn' onClick={()=>makeTransfer(transferType)}>Перевод</button>
        </div>
    </div>
  )
}

export default TransferForm