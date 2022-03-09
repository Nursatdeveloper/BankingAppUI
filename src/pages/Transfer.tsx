import React, { FC, useState } from 'react'
import LeftBar from '../components/LeftBar'
import TransferForm from '../components/TransferForm'
import './Transfer.css'

interface TransferProps{
    setLogout:(logout:boolean) => void
}

const Transfer:FC<TransferProps> = ({setLogout}) => {
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
        <LeftBar setLogout={setLogout} />
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