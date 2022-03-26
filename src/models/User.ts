import Account from './Account'
interface User{
    userId:number,
    firstName:string,
    lastName:string,
    iin:string,
    birthDate:string,
    gender:string,
    cardNumber:string,
    phoneNumber:string,
    role:string,
    accounts:Account[]
}

export default User