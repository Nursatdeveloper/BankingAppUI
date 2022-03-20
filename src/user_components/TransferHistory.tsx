import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import API_URL from '../api_url';
import BankOperation from '../models/BankOperation'

interface TransferHistryProps{
    operations:BankOperation[]
}

const TransferHistory:FC<TransferHistryProps> = ({operations}) => {
    const [transfers, setTransfers] = useState<BankOperation[]>([]);

    useEffect(() => {
        const transferOperations:BankOperation[] = [];
        operations.map(operation => {
            if(operation.bankOperationType === 'Перевод'){
                transferOperations.push(operation);
            }
        })
        setTransfers(transferOperations);
    }, [operations])

    function handleDownload(id:number){
        const token = sessionStorage.getItem('token');
        const url = `${API_URL}/document/get-transfer-invoice/${id}`;
        fetch(url, {
            method:"GET",
            headers:{
                'Accept':'application/pdf',
                'Authorization':`${token}`
            }
        }).then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href=url;
            link.setAttribute('download', 'Квитанция.pdf');
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);
        }).catch(error => console.log(error));
    }

  return (
    <TransferHistoryWrapper>
        <TransferHistoryHeader>
            История переводов
        </TransferHistoryHeader>
        <TransferHistoryBody>
            {transfers.map((transfer, i) => 
                <div key={i++} className='transfer__item'>
                    <div className='transfer__info'>
                        <div className='transfer__account'>
                            {transfer.toAccount}
                        </div>
                        <div className='transfer__receiver'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
                            </svg>
                            <div>{transfer.bankOperationParticipant}</div>
                        </div>
                        <div className='transfer__date'>
                            {transfer.bankOperationTime.slice(0, 10)} в {transfer.bankOperationTime.slice(11, 16)}
                        </div>
                    </div>
                    <div className='transfer__money'>
                        <div>-{transfer.bankOperationMoneyAmount} {transfer.currencyType}</div>
                        <div className='download__link' onClick={()=> handleDownload(transfer.bankOperationId)}>Скачать квитанцию</div>
                    </div>
                </div>
            ).reverse()}
        </TransferHistoryBody>
    </TransferHistoryWrapper>
  )
}

export default TransferHistory

const TransferHistoryWrapper = styled.div`
    width:30%;
    background-color:#F5F7F9;
    z-index:4;
    position:relative;
`

const TransferHistoryHeader = styled.div`
    font-size:22px;
    color:#4d4d4d;
    text-align:center;
    padding-top:15px;
    padding-bottom:15px;
    border-bottom:2px solid #f2f2f2;
    position:relative;
    z-index:3;
    background-color:#F5F7F9;
    margin-bottom:10px;
`

const TransferHistoryBody = styled.div`
    overflow-y:scroll;
    height:90vh;
    .transfer__item{
        border:1px solid #e3e3e3;
        margin-top:10px;
        margin-bottom:10px;
        margin-left:10px;
        margin-right:10px;
        padding-left:20px;
        padding-top:5px;
        padding-bottom:5px;
        display:flex;
        position:relative;
        background-color:white;
        border-radius:5px;
    }

    .transfer__info{

    }
    .transfer__receiver{
        display:flex;
        font-size:14px;
        svg{
            color:red;
            width:20px;
            height:20px;
        }
    }
    .transfer__date{
        font-size:11px;
    }
    .transfer__money{
        position:absolute;
        right:20px;
        font-size:14px;
        color:#e65c4d;
    }

    .download__link{
        color:#666;
        margin-top:10px;
        text-decoration:underline;
        :hover{
            color:#000058;
            cursor:pointer;
        }
    }
`
