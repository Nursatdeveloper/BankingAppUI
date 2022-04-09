import React, { useState } from 'react'
import styled from 'styled-components'
import AccountList from '../admin_components/AccountList'
import Header from '../admin_components/Header'
import LeftBar from '../admin_components/LeftBar'
import MainSection from '../admin_components/MainSection'
import TransactionList from '../admin_components/TransactionList'
import UserList from '../admin_components/UserList'

const AdminProfile = () => {
    const [currentPage, setCurrentPage] = useState<string>('bank')


  return (
    <AdminProfileWrapper>
        <LeftBar setCurrentPage={setCurrentPage}/>
        <MainSectionWrapper>
            <Header />
            {currentPage === 'bank' ? <MainSection /> : null}
            {currentPage === 'userList' ? <UserList /> : null}
            {currentPage === 'current' ? <AccountList account={currentPage}/> : null}
            {currentPage === 'deposit' ? <AccountList account={currentPage}/> : null}
            {currentPage === 'transaction' ? <TransactionList /> : null}
        </MainSectionWrapper>
    </AdminProfileWrapper>
  )
}

export default AdminProfile
const AdminProfileWrapper = styled.div`
    width:100%;
    position:relative;
    height:100vh;
    display:flex;
`

const MainSectionWrapper = styled.div`
    position:absolute;
    left:15.1%;
    top:0;
    right:0px;
`