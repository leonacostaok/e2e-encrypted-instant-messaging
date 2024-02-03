import React from 'react';
import styled from "styled-components";
import {BoxShadow, MenuItem,MenuList} from "../BoxShadow";
interface PropsTypeMenuMessage{
  hideMenu:() => void;
  onOpenPopupDelete:() => void;
  onReply: () => void;
  onForward: () => void;
  onCopy: () => void;
  onEdit: () => void;
  mine?:boolean;
}
const MenuOptionMessage = ({onOpenPopupDelete,hideMenu,onReply,onForward,onCopy,mine=false,onEdit}:PropsTypeMenuMessage) => {
  const onClickMenuItem = (event:React.MouseEvent<HTMLLIElement>,callbackFnc:() => void) => {
    event.preventDefault()
    event.stopPropagation()
    callbackFnc()
    hideMenu()
  }
  const handleClickDelete=(event:React.MouseEvent<HTMLLIElement>) => {
    onClickMenuItem(event,onOpenPopupDelete)
  }
  const handleClickReply = (event:React.MouseEvent<HTMLLIElement>) => {
    onClickMenuItem(event,onReply)
  }
  const handleClickForward = (event:React.MouseEvent<HTMLLIElement>) => {
    onClickMenuItem(event,onForward)
  }
  const handleClickCopy = (event:React.MouseEvent<HTMLLIElement>) => {
    onClickMenuItem(event,onCopy)
  }
  const handleClickEdit = (event:React.MouseEvent<HTMLLIElement>) => {
    onClickMenuItem(event,onEdit)
  }
  return (
    <>
      <MenuOptionBox>
        <MenuList>
          <MenuItem onClick={(event:React.MouseEvent<HTMLLIElement>) => handleClickReply(event)}>Reply</MenuItem>
          <MenuItem onClick={(event:React.MouseEvent<HTMLLIElement>) => handleClickForward(event)}>Forward</MenuItem>
          <MenuItem onClick={(event:React.MouseEvent<HTMLLIElement>) => handleClickCopy(event)}>Copy</MenuItem>
          {
            mine && <MenuItem onClick={(event:React.MouseEvent<HTMLLIElement>) => handleClickEdit(event)}>Edit</MenuItem>
          }
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
