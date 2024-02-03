import React from 'react';
import styled from "styled-components";
import IconPortal from "../IconPortal";
import IconExit from '../../assets/icons/icon-exit.svg'
import IconReply from '../../assets/icons/icon-reply.svg'
import ImageFile from '../../assets/images/img_file.png'
import {LabelMedium} from "../Typhography";
interface PropsTypeMessageReply{
  onDeleteReply?:(status:boolean) => void
}
const MessageReply = ({onDeleteReply}:PropsTypeMessageReply) => {
  const handleDeleteReply = () => {
    if(!onDeleteReply){
      return
    }
    onDeleteReply(false)
  }
  return (
    <MessageReplyBox>
      <MessageReplyContent>
        <ImageFileBox src={ImageFile} alt={'img-file'}/>
        <Content>
          <UserReply>
            <IconPortal srcIcon={IconReply} widthIcon={'16px'} heightIcon={'16px'}/>
            <LabelMedium>Replied to Name</LabelMedium>
          </UserReply>
          <Detail></Detail>
        </Content>
      </MessageReplyContent>
      <DeleteReply onClick={handleDeleteReply}>
        <IconPortal srcIcon={IconExit} widthIcon={'20px'} heightIcon={'20px'}/>
      </DeleteReply>
    </MessageReplyBox>
  );
};
const MessageReplyBox = styled.div`
  padding: 10px 12px;
  ${({theme}) => theme.flexRowCenterVertical};
  gap: 12px;
  width: 100%;
`
const MessageReplyContent= styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 8px;
`
const ImageFileBox= styled.img`
  width: 44px;
  height: 44px;
  display: block;
  border-radius: 8px;
  object-fit: cover;
`
const Content= styled.div``
const Detail= styled.div``
const UserReply= styled.div`
  ${({theme}) => theme.flexRowCenterVertical};
  gap: 4px;
  p{
    color: ${({theme}) => theme.tertiaryEleLight};
    font-weight: 600;
  }
`
const DeleteReply = styled.div`
  margin-left: auto;
  cursor: pointer;
`
export default MessageReply;
