interface Account {
    accountId:number,
    accountNumber:string,
    accountType:string,
    balance:number,
    currencyType:string,
    ownerIIN:string,
    ownerName:string,
    isActive:boolean,
    isBlocked:boolean,
    activatedDate:string
}

export default Account