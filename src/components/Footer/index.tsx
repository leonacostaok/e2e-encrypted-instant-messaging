import React from 'react'
import styled from 'styled-components'

const Footer = () => {
  return (
    <FooterContainer>
      <p>
        Created by Leon Acosta (<a href="mailto:leon@dandelionlabs.io">leon@dandelionlabs.io</a>)
      </p>
    </FooterContainer>
  )
}

export default Footer

const FooterContainer = styled.div`
  width: 100%;
  height: 30px;
  border-radius: 10px;
  background: ${({ theme }) => theme.aquamarine};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: auto;
`
