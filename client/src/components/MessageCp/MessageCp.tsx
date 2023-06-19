import React, {useCallback, useRef, useState} from 'react';
import styled, {css} from "styled-components";
import IconUserDefault from '../../assets/icons/icon-user-default.svg'
import {LabelMedium, LabelSmall} from "../Typhography";
import IconDelivered from '../../assets/icons/icon-delivered.svg';
import IconWrongMessage from '../../assets/icons/icon-wrong-message.svg';
import IconPortal from "../IconPortal";
import {useOnClickOutside} from "../../hooks/useOnClickOutside";
import MenuOptionMessage from "../MenuOptionMessage";
import ModalDeleteChat from "../ModalChat/ModalDeleteChat";
import MenuWrongMessage from "../MenuWrongMessage";
interface PropsTypeMessageCp{
  message?:string;
  mine?:boolean;
  enableOption?:boolean | undefined;
  media?:string;
  wrongMessage?:boolean;
}
const MessageCp = ({message,mine=false,enableOption,media,wrongMessage=false}:PropsTypeMessageCp) => {
  const detailBoxNode = useRef<any>(null)
  const [showOptionMess,setShowOptionMess] = useState<boolean>(false);
  const [popupDelete,setPopupDelete] = useState<boolean>(false);
  const [menuWrong,setMenuWrong] = useState<boolean>(false);
  const handleRightClick = (e:React.MouseEvent<HTMLDivElement>) => {
    if(!enableOption){
      return
    }
    e.preventDefault()
    e.stopPropagation()
    if(!wrongMessage){
      setShowOptionMess(true)
    }else{
      setMenuWrong(true)
    }
  }
  const hideOptionMess = useCallback(() => {
    setShowOptionMess(false)
  },[])

  const onDismissPopupDelete = useCallback(() => {
    setPopupDelete(false)
  },[])
  const onOpenPopupDelete = useCallback(() => {
    setPopupDelete(true)
  },[])
  const onDelete = () => {
    //update later
  }
  const hideMenuWrong = useCallback(() => {
    setMenuWrong(false)
  },[])
  useOnClickOutside(detailBoxNode, () => setShowOptionMess(false))
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
          <DetailBox ref={detailBoxNode}
                     onContextMenu={(e:React.MouseEvent<HTMLDivElement>) => handleRightClick(e)}>
            {
              message && <DetailContent
                dangerouslySetInnerHTML={{__html:`${message}`}}
                mine={mine}
              />
            }
            {
              media &&  <DetailMedia
                mine={mine}
              >
                <img src={media} alt={'img_mess'}/>
              </DetailMedia>
            }

            {
              showOptionMess && <MenuOptionMessage hideMenu={hideOptionMess} onOpenPopupDelete={onOpenPopupDelete}/>
            }
            {
              menuWrong && <MenuWrongMessage hideMenu={hideMenuWrong} onOpenPopupDelete={onOpenPopupDelete}/>
            }
          </DetailBox>
        </Detail>
        {
          !wrongMessage ? <TimeBox>
            {mine && <IconPortal srcIcon={IconDelivered} widthIcon={'12px'} heightIcon={'7px'}/>}
            <Time>Time</Time>
          </TimeBox> : <StatusMess mine={mine}>
            <IconPortal srcIcon={IconWrongMessage} widthIcon={'14px'} heightIcon={'14px'}/>
            <Time>Time</Time>
          </StatusMess>
        }
      </MessageContent>
      {
        popupDelete && <ModalDeleteChat onDismiss={onDismissPopupDelete} visible={popupDelete} onDelete={onDelete} />
      }
    </MessageCpWrapper>
  );
};
const MessageCpWrapper = styled.div``
const MessageContent = styled.div<{mine:boolean | undefined}>`
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
const DetailBox = styled.div`
  position: relative;
`
const DetailMedia = styled.div<{mine:boolean | undefined}>`
  img{
    display: block;
    max-width: 240px;
    max-height: 160px;
    object-fit: cover;
  }
  ${({ mine }) =>
          mine &&
          css`
      border-radius: 8px 8px 0 8px;
    `}
`
const DetailContent = styled.div<{mine:boolean | undefined}>`
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
const StatusMess = styled.div<{mine:boolean| undefined}>`
  display: flex;
  justify-content: flex-end;
  gap: 6px;
  ${({ mine }) =>
    mine &&
    css`
      flex-direction: row-reverse;
    `}
`
export default MessageCp;
