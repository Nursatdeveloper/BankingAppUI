import React, { FC } from 'react'
import styled from 'styled-components'
import Menu from '../components/Menu'
import MyCards from '../components/MyCards'
import Overview from '../components/Overview'
import Transactions from '../components/Transactions'

interface DashboardProps{
    setLogout:(logout:boolean) => void
    id:string,
    token:string
}

const Dashboard:FC<DashboardProps> = ({setLogout, id, token}) => {
  return (
    <Container>
        <Menu setLogout={setLogout}/>
        <Body>
            <MyCards id={id} token={token}/>
            <Wrapper>
                <Overview />
                <Transactions />
            </Wrapper>
        </Body>
    </Container>
  )
}

export default Dashboard

const Container = styled.div`
    display:flex;
`

const Body = styled.div`
    display:flex;
`

const Wrapper = styled.div`

`