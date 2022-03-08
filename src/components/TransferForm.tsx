import axios from 'axios';
import React, { FC, useEffect, useState } from 'react'
import API_URL from '../api_url';
import Account from '../models/Account';
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
    useEffect(()=>{
        if(transferType == "to_client"){
            setTransfer("Перевод клиенту Banking App")
        }else{
            setTransfer("Перевод между своими счетами")
        }
        const id = sessionStorage.getItem("id");
        apiRequest(API_URL+'/account/get-accounts/'+id)

    },[])

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

    function makeTransfer(transferType:string){
        const fromaccount:Account[] = myAccounts.filter(a => a.accountType === fromAccount)
        const toaccount:Account[] = myAccounts.filter(a => a.accountType == toAccount)
        const accounts = [fromaccount[0], toaccount[0]];
        if(transferType == 'my_account'){
            const id = sessionStorage.getItem('id')
            const MakeTransferToMyAccountCommand = {
                userId: id,
                fromAccount: fromAccount,
                toAccount: toAccount,
                transferAmount: transferAmount
            }
            console.log(MakeTransferToMyAccountCommand)
            axios.post(API_URL+'/BankOperation/make-transfer-myaccount', MakeTransferToMyAccountCommand)
                .then(response => {
                    console.log(response);
                })
        }

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
                    <select onChange={(e)=>setFromAccount(e.target.value)} >
                        <option>Выберите счет</option>
                        {myAccounts.map(account => 
                            <option value={account.accountType}>
                                {account.accountType}
                                
                                {account.balance}
                                {account.currencyType}
                            </option>
                            )}
                    </select>
                </div>
                <div className='select__wrapper'>
                    <label>Куда: </label>
                    <select onChange={(e) => setToAccount(e.target.value)}>
                        <option  >Выберите счет</option>
                        {myAccounts.map(account => 
                            <option value={account.accountType}>{account.accountType} {account.balance}{account.currencyType}</option>
                            )}
                    </select>
                </div>
            </div>
            :
            null
        }
        <div className='transfer__amount'>
            <label>Сумма перевода:</label>
            <input type="text" className='transfer__input' onChange={e => setTransferAmount(e.target.value)}/>
            <span>KZT</span>
            <br/>
            <button className='transfer__btn' onClick={()=>makeTransfer(transferType)}>Перевод</button>
        </div>
    </div>
  )
}

export default TransferForm