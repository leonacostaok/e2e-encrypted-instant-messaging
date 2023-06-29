import styled from "styled-components";

export const TabPaneWrapper = styled.div`
  height: 100%;
`
export const DividerTab = styled.div`
  height: 1px;
  background-color: ${({theme}) => theme.mainLight};
  width: 100%;
`
export const TabPaneContent = styled.div`
  padding: 28px 16px 0;
`
