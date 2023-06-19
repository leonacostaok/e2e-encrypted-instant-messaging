import React from 'react';
import styled from "styled-components";
import {BoxShadow,MenuItem,MenuList} from "../BoxShadow";
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
export default Menu;
