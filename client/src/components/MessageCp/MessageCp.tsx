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
import {InputCheckBox, LabelCheckBox,CheckBox} from "../FormGroup";
import {useChatRoom} from "../../hooks/useChatRoom";
import {useCopyToClipboard} from "../../hooks/useCopyToClipboard";
interface PropsTypeMessageCp{
  data:{
    id: number | string;
    mine?:boolean;
    wrongMessage?:boolean;
    data?:{
      message?:string| undefined;
      media?:string | undefined;
    } | null;
  };
  enableOption?:boolean | undefined;
  handleStatusReply?:(status:boolean) => void;
  handleStatusForward?:(status:boolean) => void;
  handleEditMessage?:(messageEdit:string) => void;
  isForward?:boolean
}
const MessageCp = ({data,enableOption,handleStatusReply,handleStatusForward,handleEditMessage,isForward =false}:PropsTypeMessageCp) => {
  const {id,mine,wrongMessage} = data
  const detailBoxNode = useRef<any>(null)
  const [showOptionMess,setShowOptionMess] = useState<boolean>(false);
  const [popupDelete,setPopupDelete] = useState<boolean>(false);
  const [menuWrong,setMenuWrong] = useState<boolean>(false);
  const refLabel = useRef<any>(null)
  const [,copy] = useCopyToClipboard()
  const {updateContentForwardFnc} = useChatRoom()
  const handleRightClick = (e:React.MouseEvent<HTMLDivElement>) => {
    if(!enableOption || isForward){
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
  const onDismissPopupDelete = useCallback(() => {
    setPopupDelete(false)
  },[])
  const onOpenPopupDelete = useCallback(() => {
    setPopupDelete(true)
  },[])
  const onDelete = () => {
    //update later
  }
  const onReply = () => {
    if(!handleStatusReply){
      return
    }
    //update later
    handleStatusReply(true)
  }
  const onForward = () => {
    if(!handleStatusForward){
      return
    }
    handleStatusForward(true)
  }
  const onCopy = () => {
    if(data.data?.message){
      copy(data.data?.message).then()
    }else{
      return
    }
  }
  const onEdit = () => {
    if(!data || !data.data || !data.data.message || !handleEditMessage){
      return
    }
    handleEditMessage(data.data.message)
  }
  const hideMenu = useCallback(() => {
    setMenuWrong(false)
    setShowOptionMess(false)
  },[])
  const handleCheckForward = (event:React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    const typeUpdate = isChecked ? 'ADD' : 'REMOVE'
    updateContentForwardFnc({type:typeUpdate,data:data})
  }

  // hide menu when click outside
  useOnClickOutside(detailBoxNode, () => hideMenu())
  return (
    <MessageCpWrapper>
      <MessageContent mine={mine}>
        {
          !mine && !isForward && <AvatarUser>
            <img src={IconUserDefault} alt={'avatar-user'}/>
          </AvatarUser>
        }
        {
          isForward && !wrongMessage && <CheckBoxCs>
            <InputCheckBox hidden type="checkbox" name={`checkbox-option-${id}`} id={`checkbox-option-${id}`} onChange={(event:React.ChangeEvent<HTMLInputElement>) => handleCheckForward(event)}/>
            <LabelCheckBox htmlFor={`checkbox-option-${id}`} ref={refLabel}>
              <span></span>
            </LabelCheckBox>
          </CheckBoxCs>
        }
        <Detail>
          {!mine && <Name>Name</Name>}
          <DetailBox ref={detailBoxNode}
                     onContextMenu={(e:React.MouseEvent<HTMLDivElement>) => handleRightClick(e)}>
            {
              data?.data?.message && <DetailContent
                dangerouslySetInnerHTML={{__html:`${data?.data?.message}`}}
                mine={mine}
              />
            }
            {
              data?.data?.media &&  <DetailMedia
                mine={mine}
              >
                <img src={data?.data?.media} alt={'img_mess'}/>
              </DetailMedia>
            }

            {
              showOptionMess && <MenuOptionMessage hideMenu={hideMenu} onOpenPopupDelete={onOpenPopupDelete} onReply={onReply} onForward={onForward} onCopy={onCopy} onEdit={onEdit} mine={mine}/>
            }
            {
              menuWrong && <MenuWrongMessage hideMenu={hideMenu} onOpenPopupDelete={onOpenPopupDelete}/>
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
const CheckBoxCs = styled(CheckBox)`
  align-self: center;
  flex-basis: 36px;
`
export default MessageCp;
