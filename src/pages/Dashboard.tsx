import React from 'react'
import styled from 'styled-components'
import Menu from '../components/Menu'
import MyCards from '../components/MyCards'
import Overview from '../components/Overview'
import Transactions from '../components/Transactions'

const Dashboard = () => {
  return (
    <Container>
        <Menu />
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