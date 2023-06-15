import React from 'react';
import styled from "styled-components";
import IconPortal from "../IconPortal";
import IconChatLarge from '../../assets/icons/icon-chat-conversation.svg'
import {TextLarge} from "../Typhography";
const NoChat = () => {
  return (
    <NoChatBox>
      <NoChatContent>
        <IconPortal srcIcon={IconChatLarge} widthIcon={'184px'} heightIcon={'164px'}/>
        <Title>It’s nice to chat to someone</Title>
        <Description>Create a new chat group or select a person form left menu
          and start your converstaion</Description>
      </NoChatContent>
    </NoChatBox>
  );
};
const NoChatBox = styled.div`
  ${({theme}) => theme.flexRowCenter};
`
const NoChatContent = styled.div`
  max-width: 520px;
  width: 100%;
  margin: 0 auto;
  ${({theme}) => theme.flexColumnCenter};
`
const Title = styled.h2`
  font-size: 40px;
  line-height: 1;
  margin-top: 90px;
  text-align: center;
  letter-spacing: -1px;
  font-weight: 700;
  color: ${({theme}) => theme.mainLightTheme};
`
const Description = styled(TextLarge)`
  line-height: 1.4;
  color: ${({theme}) => theme.secondaryTextLight};
  margin-top: 20px;
  text-align: center;
`
export default NoChat;
