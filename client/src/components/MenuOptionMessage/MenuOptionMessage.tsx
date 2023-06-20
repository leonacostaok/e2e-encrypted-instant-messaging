import React from 'react';
import styled from "styled-components";
import {BoxShadow, MenuItem,MenuList} from "../BoxShadow";
interface PropsTypeMenuMessage{
  hideMenu:() => void;
  onOpenPopupDelete:() => void;
  onReply: () => void;
  onForward: () => void;
  onCopy: () => void;
}
const MenuOptionMessage = ({onOpenPopupDelete,hideMenu,onReply,onForward,onCopy}:PropsTypeMenuMessage) => {

  const handleClickDelete=(event:React.MouseEvent<HTMLLIElement>) => {
    event.preventDefault()
    event.stopPropagation()
    onOpenPopupDelete()
    hideMenu()
  }
  const handleClickReply = (event:React.MouseEvent<HTMLLIElement>) => {
    event.preventDefault()
    event.stopPropagation()
    onReply()
    hideMenu()
  }
  const handleClickForward = (event:React.MouseEvent<HTMLLIElement>) => {
    event.preventDefault()
    event.stopPropagation()
    onForward()
    hideMenu()
  }
  const handleClickCopy = (event:React.MouseEvent<HTMLLIElement>) => {
    event.preventDefault()
    event.stopPropagation()
    onCopy()
    hideMenu()
  }
  return (
    <>
      <MenuOptionBox>
        <MenuList>
          <MenuItem onClick={(event:React.MouseEvent<HTMLLIElement>) => handleClickReply(event)}>Reply</MenuItem>
          <MenuItem onClick={(event:React.MouseEvent<HTMLLIElement>) => handleClickForward(event)}>Forward</MenuItem>
          <MenuItem onClick={(event:React.MouseEvent<HTMLLIElement>) => handleClickCopy(event)}>Copy</MenuItem>
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
