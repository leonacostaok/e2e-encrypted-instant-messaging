import React from 'react';
import styled from "styled-components";
import {BoxShadow} from "../BoxShadow";
interface PropsTypeMenu{
  onShow: () => void;
  hideMenu: () => void;
}
const Menu = ({onShow,hideMenu}:PropsTypeMenu) => {
  const handleClickDelete=(event:React.MouseEvent<HTMLLIElement>) => {
    event.preventDefault()
    event.stopPropagation()
    onShow()
    hideMenu()
  }
  return (
    <MenuBox>
      <MenuList>
        <MenuItem>Mute</MenuItem>
        <MenuItem onClick={(event:React.MouseEvent<HTMLLIElement>) => handleClickDelete(event)}>Delete</MenuItem>
      </MenuList>
    </MenuBox>
  );
}
const MenuBox = styled(BoxShadow)`
  position: absolute;
  top: 20px;
  right: 12px;
  z-index: 10;
  width: 135px;
`
const MenuList = styled.ul`
  list-style: none;
  padding-left: 0;
  margin: 8px 0;
`
const MenuItem = styled.li`
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
export default Menu;
