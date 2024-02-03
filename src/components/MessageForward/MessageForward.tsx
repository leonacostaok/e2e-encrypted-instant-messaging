import React from 'react';
import styled from "styled-components";
import IconPortal from "../IconPortal";
import IconSend from '../../assets/icons/icon-send.svg';
import IconClear from '../../assets/icons/icon-exit.svg';
import {TextMedium} from "../Typhography";
import {useChatRoom} from "../../hooks/useChatRoom";
interface PropsTypeMessageForward{
  onDeleteForward?: (status:boolean) => void;
  onOpenForward:() => void;
}
const MessageForward = ({onDeleteForward,onOpenForward}:PropsTypeMessageForward) => {
  const {data:dataForward,resetContentForwardFnc} = useChatRoom()
  const handleCancel = () => {
    if(!onDeleteForward){
      return
    }
    resetContentForwardFnc()
    onDeleteForward(false)
  }
  return (
    <MessageForwardBox>
      <Detail>
        <DivCancel onClick={handleCancel}>
          <IconPortal srcIcon={IconClear} />
        </DivCancel>
        <TextMedium>
          {dataForward.length} message selected
        </TextMedium>
      </Detail>
      <DivIcon onClick={onOpenForward}>
        <IconPortal srcIcon={IconSend} />
      </DivIcon>
    </MessageForwardBox>
  );
};
const MessageForwardBox = styled.div`
  padding: 12px 18px;
  background-color: ${({theme}) => theme.mainLight};
  display: flex;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
`
const DivCancel = styled.div`
  cursor: pointer;
`
const Detail = styled.div`
  ${({theme}) => theme.flexRowCenterVertical};
  gap: 8px;
  p{
    color: ${({theme}) => theme.caption};
  }
`
const DivIcon = styled.div`
  cursor: pointer;
`
export default MessageForward;
