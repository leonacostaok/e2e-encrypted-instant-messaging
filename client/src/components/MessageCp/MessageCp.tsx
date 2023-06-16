import React from 'react';
import styled, {css} from "styled-components";
import IconUserDefault from '../../assets/icons/icon-user-default.svg'
import {LabelMedium, LabelSmall} from "../Typhography";
import IconDelivered from '../../assets/icons/icon-delivered.svg';
import IconPortal from "../IconPortal";
interface PropsTypeMessageCp{
  message:string;
  mine?:boolean;
}
const MessageCp = ({message,mine=false}:PropsTypeMessageCp) => {
  return (
    <MessageCpWrapper>
      <MessageContent mine={mine}>
        {
          !mine && <AvatarUser>
            <img src={IconUserDefault} alt={'avatar-user'}/>
          </AvatarUser>
        }
        <Detail>
          {!mine && <Name>Name</Name>}
          <DetailContent dangerouslySetInnerHTML={{__html:`${message}`}} mine={mine}/>
        </Detail>
        <TimeBox>
          {mine && <IconPortal srcIcon={IconDelivered} widthIcon={'12px'} heightIcon={'7px'}/>}
          <Time>Time</Time>
        </TimeBox>
      </MessageContent>
    </MessageCpWrapper>
  );
};
const MessageCpWrapper = styled.div``
const MessageContent = styled.div<{mine:boolean}>`
  display: flex;
  align-items: flex-end;
  gap: 8px;
  ${({ mine }) =>
    mine &&
    css` 
      flex-direction: row-reverse;
      justify-content: flex-start;
    `}
`
const AvatarUser = styled.div`
  height: 36px;
  width: 36px;
  flex: 0 0 36px;
  border-radius: 100px;
  img{
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    vertical-align: middle;
  }
`
const Detail = styled.div``
const DetailContent = styled.div<{mine:boolean}>`
  padding: 8px 12px;
  background-color: ${({theme}) => theme.incomingBgLight};
  border-radius: 22px 22px 22px 0;
  ${({theme}) => theme.font1420};
  letter-spacing: 0.25px;
  ${({ mine }) =>
    mine &&
    css`
      background-color: ${({theme}) => theme.mainLight};
      border-radius: 22px 22px 0 22px;
    `}
`
const Name = styled(LabelMedium)`
  font-weight: 500;
  color: ${({theme}) => theme.tertiaryEleLight};
  margin-bottom: 2px;
`
const TimeBox = styled.div`
  ${({theme}) => theme.flexRowCenterVertical};
  gap:2px;
`
const Time = styled(LabelSmall)`
  color: ${({theme}) => theme.tertiaryEleLight};
`
export default MessageCp;
