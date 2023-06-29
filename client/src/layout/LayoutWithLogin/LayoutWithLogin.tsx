import * as React from "react";
import LayoutPrimary from "../LayoutPrimary";
import styled from "styled-components";
import Aside from "../../components/Aside";
interface PropsTypeLayoutWithLogin{
  children?: React.ReactNode
}
const LayoutWithLogin = ({children}:PropsTypeLayoutWithLogin) => {
  return (
    <LayoutPrimary>
      <AppContentWrapper>
        <AppAside>
          <Aside />
        </AppAside>
        {
          children && <AppContent>
            {children}
          </AppContent>
        }
      </AppContentWrapper>
    </LayoutPrimary>
  );
};
const AppContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`
const AppAside = styled.div`
  height: 100%;
  flex: 0 0 400px;
  max-width: 400px;
`
const AppContent = styled.div`
  height: 100%;
  flex: 0 0 calc(100% - 400px);
  max-width:  calc(100% - 400px);
`
export default LayoutWithLogin;
