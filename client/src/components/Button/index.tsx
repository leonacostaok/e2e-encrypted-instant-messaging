import styled from "styled-components";

export const ButtonPrimary = styled.button`
  color: ${({theme}) => theme.secondaryEle};
  outline: none;
  box-shadow: none;
  padding: 8px 16px;
  border: 1px solid currentColor;
  border-radius: 4px;

  font-family: ${({theme}) => theme.fontProximaNova};
  font-style: normal;
  font-weight: 700;
  font-size:  ${({theme}) => theme.fontSizeText3};
  line-height: 1.14;
  letter-spacing: 0.4px;
  cursor: pointer;
  background-color: ${({theme}) => theme.white};
`
export const ButtonSecondary = styled(ButtonPrimary)`
  color: ${({theme}) => theme.system};
  background-color: ${({theme}) => theme.mainColor};
`
