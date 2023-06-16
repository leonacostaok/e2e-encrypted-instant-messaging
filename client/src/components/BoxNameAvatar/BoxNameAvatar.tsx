import React from 'react';
import styled from "styled-components";
import {ChatTypeEnum} from "../../constants/chat";
import IconPortal from "../IconPortal";
import IconUserDefault from "../../assets/icons/icon-user-default.svg";
import IconGroupSecondary from "../../assets/icons/icon-group-secondary.svg";
import {ChatType} from "../../types/chat.type";
import {TextMedium} from "../Typhography";
interface PropsTypeBoxNameAvatar{
  type: ChatType
}
const BoxNameAvatar = ({type}:PropsTypeBoxNameAvatar) => {
  return (
    <BoxNamAvatarBox>
      <BoxNameAvatarMain>
        <ImageBox>
          {type === ChatTypeEnum.USER && <IconPortal srcIcon={IconUserDefault} widthIcon={'40px'} heightIcon={'40px'}/>}
          {type === ChatTypeEnum.GROUP && <IconPortal srcIcon={IconGroupSecondary} widthIcon={'40px'} heightIcon={'40px'}/>}
        </ImageBox>
        <Title>
          {
            type === ChatTypeEnum.GROUP && 'New Group'
          }
          {
            type === ChatTypeEnum.USER && 'Name'
          }
        </Title>
      </BoxNameAvatarMain>
    </BoxNamAvatarBox>
  );
};
const BoxNamAvatarBox = styled.div``
const BoxNameAvatarMain = styled.div`
  ${({theme}) => theme.flexRowCenterVertical};
  gap: 16px;
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
export default BoxNameAvatar;
