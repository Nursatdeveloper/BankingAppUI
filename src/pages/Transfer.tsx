import React, { useState } from 'react'
import LeftBar from '../components/LeftBar'
import TransferForm from '../components/TransferForm'
import './Transfer.css'

const Transfer = () => {
    const [showForm, setShowForm] = useState<boolean>(false);
    const [transferType, setTransferType] = useState<string>('');

    function betweenMyAccountsClick(){
        setTransferType("my_account")
        setShowForm(true);
    }

    function toClientsAccountClick(){
        setTransferType("to_client")
        setShowForm(true);
    }
  return (
    <div className='transfer__container'>
        <LeftBar />
        <div className='transfer__type'>
            <div className='transfer__type_row' onClick={betweenMyAccountsClick}>
                Между своими счетами
            </div>
            <div className='transfer__type_row' onClick={toClientsAccountClick}>
                Клиенту Banking App
            </div>

            {showForm ? <TransferForm transferType={transferType}/> : null}
        </div>
    </div>
  )
}

export default Transfer