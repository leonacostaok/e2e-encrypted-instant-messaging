import React from 'react';
import styled from "styled-components";
import {BoxShadow, MenuItem,MenuList} from "../BoxShadow";
interface PropsTypeMenuMessage{
  hideMenu:() => void;
  onOpenPopupDelete:() => void;
}
const MenuOptionMessage = ({onOpenPopupDelete,hideMenu}:PropsTypeMenuMessage) => {

  const handleClickDelete=(event:React.MouseEvent<HTMLLIElement>) => {
    event.preventDefault()
    event.stopPropagation()
    onOpenPopupDelete()
    hideMenu()
  }
  return (
    <>
      <MenuOptionBox>
        <MenuList>
          <MenuItem>Reply</MenuItem>
          <MenuItem>Forward</MenuItem>
          <MenuItem>Copy</MenuItem>
          <MenuItem>Edit</MenuItem>
          <MenuItem onClick={(event:React.MouseEvent<HTMLLIElement>) => handleClickDelete(event)}>Delete</MenuItem>
        </MenuList>
      </MenuOptionBox>

    </>
  );
};
const MenuOptionBox = styled(BoxShadow)`
  position: absolute;
  top: 20px;
  right: 12px;
  z-index: 20;
  width: 135px;
`
export default MenuOptionMessage;
