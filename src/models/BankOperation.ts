interface BankOperation{
    bankOperationId:number,
    bankOperationType:string,
    bankOperationMaker:string,
    bankOperationParticipant:string,
    bankOperationTime:string,
    bankOperationMoneyAmount:number,
    bankOperationMakerId:number,
    fromAccount:string,
    toAccount:string,
    currencyType:string
}

export default BankOperation