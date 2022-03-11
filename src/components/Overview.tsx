import React, { FC } from 'react'
import styled from 'styled-components'

interface OverviewProps{
  accountType:string
}

const Overview:FC<OverviewProps> = ({accountType}) => {
  return (
    <OverviewWrapper>
      <AccountType>
        {accountType}
      </AccountType>
    </OverviewWrapper>

  )
}

export default Overview

const OverviewWrapper = styled.div`

`

const AccountType = styled.div`

`