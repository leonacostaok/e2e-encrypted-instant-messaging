import styled from "styled-components";

export const BoxShadow = styled.div`
  background-color: ${({theme}) => theme.white};
  box-shadow: 0 8px 10px rgba(0, 0, 0, 0.12), 0 3px 14px rgba(0, 0, 0, 0.08), 0 3px 5px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
`
export const MenuList = styled.ul`
  list-style: none;
  padding-left: 0;
  margin: 8px 0;
`
export const MenuItem = styled.li`
  cursor: pointer;
  ${({theme}) => theme.font1420};
  letter-spacing: 0.25px;
  color: ${({theme}) => theme.mainTextLight};
  padding: 6px 16px;
  transition: background-color 0.25s ease-in;
  &:hover{
    background-color: ${({theme}) => theme.mainLight};
  }
`
