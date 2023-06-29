import React, {useCallback, useRef, useState} from 'react';
import styled, {css} from "styled-components";
import {ChatType} from "../../types/chat.type";
import {ChatTypeEnum} from "../../constants/chat";
import IconPortal from "../IconPortal";
import IconUserDefault from '../../assets/icons/icon-user-default.svg'
import IconGroupDefault from '../../assets/icons/icon-group-default.svg'
import IconBell from '../../assets/icons/icon-bell-disabled.svg'
import {LabelMedium, LabelSmall} from "../Typhography";
import Badge from "../Badge";
import Menu from "./Menu";
import {useOnClickOutside} from "../../hooks/useOnClickOutside";
import {NavLink} from "react-router-dom";
import ModalDeleteChat from "../ModalChat/ModalDeleteChat";
interface ChatItemCp{
  type : ChatType
  data?:any;
  isMuted?:boolean;
}
const ChatItemCp = ({type,data,isMuted}:ChatItemCp) => {
  const {publicName} = data
  const [showMenu,setShowMenu] = useState<boolean>(false);
  const [visible,setVisible] = useState<boolean>(false);
  const handleClick = (event:React.MouseEvent<HTMLDivElement>)=>{
    event.preventDefault()
    setShowMenu(true)
  }
  const hideMenu = useCallback(() => {
    setShowMenu(false)
  },[])
  const onDismiss = useCallback(() => {
    setVisible(false)
  },[])
  const onOpen = useCallback(() => {
    setVisible(true)
  },[])
  const handleDeleteMessage = useCallback(() => {
      //update later
  },[])
  const chatItemNode = useRef<HTMLDivElement>()
  useOnClickOutside(chatItemNode, () => setShowMenu(false))
  return (
    <ChatItemCpBox ref={chatItemNode as any} onContextMenu={(event:React.MouseEvent<HTMLDivElement>) => handleClick(event)} isFocus={showMenu}>
      <NavLink to={`/${data.alias}`} activeClassName={'active'}>
        <ChatItemCpMain className={'chat-item-cp-main'}>
          <ImageBox>
            {type === ChatTypeEnum.USER && <IconPortal srcIcon={IconUserDefault} widthIcon={'56px'} heightIcon={'56px'}/>}
            {type === ChatTypeEnum.GROUP && <IconPortal srcIcon={IconGroupDefault} widthIcon={'56px'} heightIcon={'56px'}/>}
          </ImageBox>
          <ChatItemCpContent>
            <Header>
              <Title>
                {publicName && <Name>{publicName}</Name>}
                {
                  isMuted && <IconPortal srcIcon={IconBell} widthIcon={'16px'} heightIcon={'16px'}/>

                }
              </Title>
              <Time>Time</Time>
            </Header>
            <BoxMessage>
              <LastMessage>
                I'm not even going to pretend to understand what you're talking about.
              </LastMessage>
              <Badge/>
            </BoxMessage>
          </ChatItemCpContent>
        </ChatItemCpMain>
      </NavLink>
      {
        showMenu && <Menu onShow={onOpen} hideMenu={hideMenu}/>
      }
      {
        visible && <ModalDeleteChat onDismiss={onDismiss} visible={visible} onDelete={handleDeleteMessage} />
      }
    </ChatItemCpBox>
  );
};
const ChatItemCpBox = styled.div<{isFocus:boolean}>`
  position: relative;
  ${({ isFocus }) =>
    isFocus && 
    css`
      background: ${({theme}) => theme.mainLight};
  `}
  a{
    text-decoration: none;
  }
  a.active .chat-item-cp-main{
    background: ${({theme}) => theme.mainLight};
    box-shadow: inset 4px 0 0${({theme}) => theme.mainLightTheme};
  }
`
const ChatItemCpMain = styled.div`
  display: flex;
  padding: 8px 16px;
  border-bottom: 1px solid ${({theme}) => theme.mainLight};
`
const ImageBox = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 150px;
  img{
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }
`
const ChatItemCpContent = styled.div`
  flex: 0 0 calc(100% - 56px);
  max-width: calc(100% - 56px);
  padding-left: 16px;
`
const Header = styled.div`
  margin-bottom: 2px;
  ${({theme}) => theme.flexRowCenterVertical};
  justify-content: space-between;
  margin-top: 4px;
`
const Name = styled(LabelMedium)`
  color: ${({theme}) => theme.mainTextLight};
  letter-spacing: 0.5px;
  font-weight: 600;
`
const Time = styled(LabelSmall)`
  letter-spacing: 0.5px;
  font-weight: 600;
  color: ${({theme}) => theme.tertiaryEleLight};
`
const LastMessage = styled(LabelMedium)`
  letter-spacing: 0.4px;
  color: ${({theme}) => theme.secondaryTextLight};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`
const BoxMessage = styled.div`
  ${({theme}) => theme.flexRowCenterVertical};
`
const Title = styled.div`
  ${({theme}) => theme.flexRowCenterVertical};
  gap: 4px;
`
export default ChatItemCp;
