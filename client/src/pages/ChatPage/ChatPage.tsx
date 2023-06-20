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
import ExpandGroup from "./ExpandGroup";
import {useSpring, animated, config} from "@react-spring/web";
import useMeasure from "react-use-measure";
import MessageCp from "../../components/MessageCp";
import ImageMessage from '../../assets/images/img_message_default.png';
import {ReactComponent as IconChevronDown} from "../../assets/icons/icon-chevron-down.svg";
import {LabelSmall} from "../../components/Typhography";
import MessageReply from "../../components/MessageReply";
import MessageForward from "../../components/MessageForward";
import ModalForward from "../../components/ModalForward";
const mockMessage = [
  {
    id: 1,
    mine:false,
    data:{
      message:'Message in a single line. Message in a single line. Message in a single line. Message in a single line',
    }
  },
  {
    id: 2,
    mine:false,
    data:{
      message:'Single',
    }
  },
  {
    id: 3,
    mine:false,
    data:{
      message:'Message in a single line. Message in a single line. Message in a single line. Message in a single line',
    }
  },
  {
    id: 4,
    mine:true,
    data:{
      message:'Message in a single line',
    }
  },
  {
    id: 5,
    wrongMessage:true,
    mine:true,
    data:{
      message:'Message in a single line',
    }
  },
  {
    id: 6,
    mine:false,
    data:{
      media:ImageMessage,
    }
  }
]
const ChatPage = () => {
  const { keyPair } = useContext(userProviderContext)
  const [user, setUser] = useState<User>()
  const [messageHistory, setMessageHistory] = useState<WebSocketEventMap['message'][]>([])
  const [expandChat,setExpandChat] = useState<boolean>(false)
  const [expandGroup,setExpandGroup] = useState<boolean>(false)
  const [visibleForward,setVisibleForward] = useState<boolean>(false)
  const { sendMessage, lastMessage, readyState } = useWebSocket(process.env.SERVER_URL ?? 'ws://localhost:9876')
  const [measureRef, { width }] = useMeasure();
  const [isReply,setIsReply] = useState<boolean>(false);
  const [isForward,setIsForward] = useState<boolean>(false);
  const styles = useSpring({
    config: config.stiff,
    from: {
      width: 0
    },
    to: {
      width: expandGroup ? width : 0
    }
  });
  const stylesChat= useSpring({
    config: config.stiff,
    from: {
      width: 0
    },
    to: {
      width: expandChat ? width : 0
    }
  });
  const onShowExpand = useCallback(() =>{
    setExpandChat(true)
  },[])
  const onHideExpand = useCallback(() => {
    setExpandChat(false)
  },[])
  const onShowExpandGroup = useCallback(() => {
    setExpandGroup(true)
  },[])
  const onHideExpandGroup = useCallback(() => {
    setExpandGroup(false)
  },[])

  const handleStatusReply = (status:boolean) => {
    setIsReply(status)
  }
  const handleStatusForward = (status:boolean) => {
    setIsForward(status)
  }
  const onDismissForward = useCallback(() => {
    setVisibleForward(false)
  },[])
  const onOpenForward = useCallback(() => {
    setVisibleForward(true)
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
        {
          false ? <HeaderChat>
            <BoxNameAvatar type={ChatTypeEnum.USER} />
            <DivIcon onClick={onShowExpand}>
              <IconPortal srcIcon={IconMoreInfo} widthIcon={'32px'} heightIcon={'32px'}/>
            </DivIcon>
          </HeaderChat> : <HeaderChat>
            <BoxNameAvatar type={ChatTypeEnum.GROUP} />
            <DivIcon onClick={onShowExpandGroup}>
              <IconPortal srcIcon={IconMoreInfo} widthIcon={'32px'} heightIcon={'32px'}/>
            </DivIcon>
          </HeaderChat>
        }
        <DividerLight />
        {
          false && <SectionNoChat>
            <NoChat />
          </SectionNoChat>
        }
        <ChatContent>
          <NotificationNewMessage><LabelSmall>3 new messages</LabelSmall> <IconChevronDown/> </NotificationNewMessage>
          <ChatSection>
            <LastMessage>
              <h3>Last Message</h3>
              {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
            </LastMessage>
            <MessageHistory>
              <h3>Message History</h3>
              <ul>
                {messageHistory.map((message, idx) => (
                  <span key={idx}>{message ? message.data : null}</span>
                ))}
              </ul>
            </MessageHistory>
            <HistoryMessage>
              {
                mockMessage.map((item) => {
                  const {wrongMessage} = item || {wrongMessage: null}
                  return !wrongMessage ? <MessageCp enableOption={true} data={item} handleStatusReply={handleStatusReply} handleStatusForward={handleStatusForward} isForward={isForward} key={item.id}/>
                    : <MessageCp enableOption={true} data={item} key={item.id}/>
                })
              }
            </HistoryMessage>
          </ChatSection>
        </ChatContent>
        {
          isReply && <MessageReply onDeleteReply={handleStatusReply}/>
        }
        {
          isForward && <MessageForward onDeleteForward={handleStatusForward} onOpenForward={onOpenForward}/>
        }
        {/*div contentedit lam input*/}
      </ChatBody>
      {
        expandChat && <animated.div style={{...stylesChat}} className={'div-animate'}>
          <SectionExpand ref={measureRef}>
            <Expand onHide={onHideExpand}/>
          </SectionExpand>
        </animated.div>
      }
      {
        expandGroup && <animated.div style={{...styles}} className={'div-animate'}>
          <SectionExpand ref={measureRef}>
            <ExpandGroup onHide = {onHideExpandGroup} />
          </SectionExpand>
        </animated.div>
      }
      {
        visibleForward && <ModalForward onDismiss={onDismissForward} visible={visibleForward} />
      }
    </ChatContainer>
  )
}

export default ChatPage

const ChatContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  .div-animate{
    overflow: hidden;
  }
`
const ChatBody = styled.section`
  display: flex;
  width: 100%;
  align-items: flex-start;
  flex-direction: column;
  height: calc(100vh - 30px);
  flex: 1;
`

const ChatContent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 16px 20px;
  flex: 1;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    width: 14px;
  }

  &::-webkit-scrollbar-track {
    background: ${({theme}) => theme.white};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({theme}) => theme.mainLightTheme};
    border: 4px solid ${({theme}) => theme.white};
    height: 20px;
  }
`

const ChatSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  width: 100%;
  height: max-content;
  ul {
    height: auto;
    width: 100%;
    span {
      width: 100%;
      word-wrap: break-word;
    }
  }
`
const LastMessage = styled.div`
  background: ${({ theme }) => theme.aquamarine};
  padding: 20px;
  width: 100%;
`
const MessageHistory = styled.div`
  background: ${({ theme }) => theme.aquamarine};
  padding: 20px;
  width: 100%;
`
const HistoryMessage = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
  margin-top: 10px;
  padding-left: 8px;
  padding-right: 8px;
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
const SectionExpand = styled.section`
  flex: 0 0 320px;
  max-width: 320px;
  width: 320px;
  height: 100%;
  border-style: solid;
  border-color: ${({theme}) => theme.mainLight};;
  border-width: 0 1px;
`
const NotificationNewMessage = styled.div`
  border-radius: 4px;
  width: 100%;
  background-color: ${({theme}) => theme.mainLightTheme};
  padding: 4px 16px;
  ${({theme}) => theme.flexRowCenter};
  gap: 12px;
  cursor: pointer;
  margin-bottom: 12px;
  p{
    color: ${({theme}) => theme.white};
  }
  svg{
    width: 8px;
    height: 6px;
    path{
      fill: ${({theme}) => theme.white};
    }
  }
`
