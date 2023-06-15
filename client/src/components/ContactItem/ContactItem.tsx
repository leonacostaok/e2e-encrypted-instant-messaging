import React from 'react';
import styled from "styled-components";
import {ChatNewEnum} from "../../constants/chat";
import IconPortal from "../IconPortal";
import IconUserDefault from "../../assets/icons/icon-user-default.svg";
import IconGroupSecondary from "../../assets/icons/icon-group-secondary.svg";
import {ChatNewType} from "../../types/chat.type";
import {TextMedium} from "../Typhography";
interface PropsTypeContactItem{
  type: ChatNewType
  goTo?:() => void;
}
const ContactItem = ({type,goTo}:PropsTypeContactItem) => {
  const handleClickContactItem = () => {
    if(type === ChatNewEnum.NEW_GROUP && goTo){
      goTo()
    }
  }
  return (
    <ContactItemBox onClick={handleClickContactItem}>
      <ImageBox>
        {type === ChatNewEnum.USER && <IconPortal srcIcon={IconUserDefault} widthIcon={'40px'} heightIcon={'40px'}/>}
        {type === ChatNewEnum.NEW_GROUP && <IconPortal srcIcon={IconGroupSecondary} widthIcon={'40px'} heightIcon={'40px'}/>}
      </ImageBox>
      <Title>
        {
          type === ChatNewEnum.NEW_GROUP && 'New Group'
        }
        {
          type === ChatNewEnum.USER && 'Name'
        }
      </Title>
    </ContactItemBox>
  );
};
const ContactItemBox = styled.div`
  cursor: pointer;
  border-bottom: 1px solid ${({theme}) => theme.mainLight};
  padding: 8px 16px;
  ${({theme}) => theme.flexRowCenterVertical};
  gap: 16px;
  &:first-of-type{
    border-top: 1px solid ${({theme}) => theme.mainLight};
  }
`
const ImageBox = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 100px;
  img{
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }
`
const Title = styled(TextMedium)``
export default ContactItem;
