import React from 'react'
import { Link as LinkRouter } from 'react-router-dom'
import styled from 'styled-components/macro'

import { ButtonPrimary } from '../../components/Button'
import { Heading1, TextLarge } from "../../components/Typhography";
const NotFoundPage = () => {
  return (
    <NotFoundWrapper>
      <NotFoundContainer>
        <SectionNotFound>
          <Heading1>404</Heading1>
          <TextNotification>
            <Heading1>Ooops! Page Not Found</Heading1>
            <TextLarge>The requested page is not available</TextLarge>
          </TextNotification>
          <BoxCta>
            <LinkRouter to={'/'}>
              <BackToHome>Back to Home</BackToHome>
            </LinkRouter>
          </BoxCta>
        </SectionNotFound>
      </NotFoundContainer>
    </NotFoundWrapper>
  )
}
const BackToHome = styled(ButtonPrimary)` 
  width: 210px;
  margin: 0 auto;
`
const NotFoundWrapper = styled.div`
  width: 100%;
`
const NotFoundContainer = styled.div`
  width: 100%;
`
const SectionNotFound = styled.div`
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
  padding: 100px 0;
`
const TextNotification = styled.div`
  margin-bottom: 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`

const BoxCta = styled.div`
  text-align: center;
  a {
    text-decoration: none;
  }
`
export default NotFoundPage
