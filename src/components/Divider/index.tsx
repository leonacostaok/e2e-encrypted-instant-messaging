import styled from "styled-components";

export const Divider = styled.div`
  height: 2px;
  width: 100%;
  background-color: ${({theme}) => theme.divider};
`
export const DividerLight = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${({theme}) => theme.mainLight};
`
