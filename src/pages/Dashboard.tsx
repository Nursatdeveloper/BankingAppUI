import React, { FC } from 'react'
import styled from 'styled-components'
import Menu from '../components/Menu'
import MyCards from '../components/MyCards'
import Overview from '../components/Overview'
import Transactions from '../components/Transactions'

interface DashboardProps{
    setLogout:(logout:boolean) => void
}

const Dashboard:FC<DashboardProps> = ({setLogout}) => {
  return (
    <Container>
        <Menu setLogout={setLogout}/>
        <MyCards />
        <Wrapper>
            <Overview />
            <Transactions />
        </Wrapper>
    </Container>
  )
}

export default Dashboard

const Container = styled.div`
    display:flex;
`

const Wrapper = styled.div`

`