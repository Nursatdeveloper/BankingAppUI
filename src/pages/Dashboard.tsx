import axios from 'axios'
import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import API_URL from '../api_url'
import DocumentViewer from '../user_components/DocumentViewer'
import Menu from '../user_components/Menu'
import MyCards from '../user_components/MyCards'
import Overview from '../user_components/Overview'
import OverviewHeader from '../user_components/OverviewHeader'
import Transactions from '../user_components/Transactions'
import TransferHistory from '../user_components/TransferHistory'
import Account from '../models/Account'
import BankOperation from '../models/BankOperation'
import Notification from '../models/Notification'

interface DashboardProps{
    setLogout:(logout:boolean) => void
}

const Dashboard:FC<DashboardProps> = ({setLogout}) => {
    const [accountType, setAccountType] = useState<string>('');
    const [accountNames, setAccountNames] = useState<string[]>([]);
    const [operations, setOperations] = useState<BankOperation[]>([]);
    const [accountStatus, setAccountStatus] = useState<boolean>(false);
    const [menuItem, setMenuItem] = useState<string>('');
    const [userName, setUserName] = useState<string>('');

  return (
    <Container>

        <Menu setLogout={setLogout} setMenuItem={setMenuItem}/>

        <Body>
            {menuItem === 'card' ? <MyCards setUserName={setUserName} setAccountType={setAccountType} setAccountNames={setAccountNames} setAccountStatus={setAccountStatus}/> : null}
            {menuItem === 'folder' ? <DocumentViewer/> : null}
            {menuItem === 'file' ? <TransferHistory operations={operations}/> : null}
            <Wrapper>
                <OverviewHeader/>
                <Overview accountType={accountType} accountNames={accountNames} operations={operations} accountStatus={accountStatus}/>
                <Transactions setBankOperations={setOperations} accountType={accountType} userName={userName}/>
            </Wrapper>
        </Body>

    </Container>
  )
}

export default Dashboard

const Container = styled.div`
    display:flex;
    width:100%;
`

const Body = styled.div`
    display:flex;
    width:93%;
`

const Wrapper = styled.div`
    width:70%;
`