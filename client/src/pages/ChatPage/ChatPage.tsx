import React, {useCallback, useContext, useEffect, useState} from 'react'
import useWebSocket from 'react-use-websocket'
import styled from 'styled-components'

import { MessageTypes } from '../../constants/message-types'
import { User } from '../../entities/User'
import { authMessage } from '../../messages/auth.message'
import { AuthSuccessMessage } from '../../messages/auth-success.message'
import { getMessage } from '../../messages/base.message'
import { ChallengeMessage } from '../../messages/challenge.message'
import { userProviderContext } from '../../providers/UserProvider'
import NoChat from "../../components/NoChat";
import BoxNameAvatar from "../../components/BoxNameAvatar";
import {ChatTypeEnum} from "../../constants/chat";
import IconPortal from "../../components/IconPortal";
import IconMoreInfo from '../../assets/icons/icon-more-info.svg'
import { DividerLight} from "../../components/Divider";
import Expand from "./Expand";
const ChatPage = () => {
  const { keyPair } = useContext(userProviderContext)
  const [user, setUser] = useState<User>()
  const [messageHistory, setMessageHistory] = useState<WebSocketEventMap['message'][]>([])
  const [expandChat,setExpandChat] = useState<boolean>(false)
  const { sendMessage, lastMessage, readyState } = useWebSocket(process.env.SERVER_URL ?? 'ws://localhost:9876')

  const onShowExpand = useCallback(() =>{
    setExpandChat(true)
  },[])
  const onHideExpand = useCallback(() => {
    setExpandChat(false)
  },[])
  useEffect(() => {
    if (lastMessage !== null && keyPair) {
      setMessageHistory((prev) => prev.concat(lastMessage))
      const message = JSON.parse(lastMessage.data)
      let parsedMessage
      switch (message.type) {
        case MessageTypes.CHALLENGE:
          parsedMessage = getMessage<ChallengeMessage>(message)
          const signature = keyPair?.sign(Buffer.from(parsedMessage.challenge, 'hex'))
          if(keyPair.publicExtendedKey && signature){
            sendMessage(JSON.stringify(authMessage(keyPair.publicExtendedKey, signature)))
          }
          break
        case MessageTypes.AUTH_SUCCESS:
          parsedMessage = getMessage<AuthSuccessMessage>(message)
          setUser(parsedMessage.user)
          break
      }
    }
  }, [lastMessage, setMessageHistory])

  return (
    <ChatContainer>
      <ChatBody>
        <HeaderChat>
          <BoxNameAvatar type={ChatTypeEnum.USER} />
          <DivIcon onClick={onShowExpand}>
            <IconPortal srcIcon={IconMoreInfo} widthIcon={'32px'} heightIcon={'32px'}/>
          </DivIcon>
        </HeaderChat>
        <DividerLight />
        <SectionNoChat>
          <NoChat />
        </SectionNoChat>
        <ChatContent>
          <ChatSection>
            <h3>Last Message</h3>
            {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
            <h3>Message History</h3>
            <ul>
              {messageHistory.map((message, idx) => (
                <span key={idx}>{message ? message.data : null}</span>
              ))}
            </ul>
          </ChatSection>
        </ChatContent>
      </ChatBody>
      {
        expandChat && <Expand onHide={onHideExpand}/>
      }
    </ChatContainer>
  )
}

export default ChatPage

const ChatContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`
const ChatBody = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  flex-direction: column;
  height: 100%;
  flex: 1;
`

const ChatContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 20px;
  height: 100%;
  width: 100%;
`

const ChatSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.aquamarine};
  padding: 20px;
  ul {
    height: auto;
    width: 100%;
    overflow-y: scroll;
    overflow-x: scroll;
    span {
      width: 100%;
      word-wrap: break-word;
    }
  }
`
const SectionNoChat = styled.div`
  ${({theme}) => theme.flexRowCenter};
  width: 100%;
  height: 100%;
`
const HeaderChat = styled.header`
  ${({theme}) => theme.flexRowCenterVertical};
  justify-content: space-between;
  width: 100%;
  padding: 12px 20px;
`
const DivIcon = styled.div`
  cursor: pointer;
`
