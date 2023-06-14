import * as React from 'react'
import styled from 'styled-components'
import Footer from '../../components/Footer'

interface PropsTypeLayoutPrimary {
  children?: React.ReactNode
}
const LayoutPrimary = (props: PropsTypeLayoutPrimary) => {
  const { children } = props
  return (
    <AppContainerFluid>
      <AppContainer>
        <AppBody>
          {
            children && <AppMain>{children}</AppMain>
          }
          <Footer />
        </AppBody>
      </AppContainer>
    </AppContainerFluid>
  )
}
const AppContainerFluid = styled.div`
  width: 100%;
  height: 100%;
`
const AppContainer = styled.div`
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 20px;
  padding-right: 20px;
`
const AppBody = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 100vh;
`
const AppMain = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 100%;
  max-width: 100%;
  min-height: calc(100vh - 30px);
`
export default LayoutPrimary
