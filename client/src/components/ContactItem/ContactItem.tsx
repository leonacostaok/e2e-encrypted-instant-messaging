import React from 'react';
import styled from "styled-components";
import {ChatNewEnum} from "../../constants/chat";
import IconPortal from "../IconPortal";
import IconUserDefault from "../../assets/icons/icon-user-default.svg";
import IconGroupSecondary from "../../assets/icons/icon-group-secondary.svg";
import {ChatNewType} from "../../types/chat.type";
import {TextMedium} from "../Typhography";
import {useCreateGroup} from "../../hooks/useCreateGroup";
interface PropsTypeContactItem{
  type: ChatNewType
  goTo?:() => void;
  checkBox?:boolean;
  id?:number;
  dataUser?: any;
}
const ContactItem = ({type,goTo,checkBox=false,id=0,dataUser=undefined}:PropsTypeContactItem) => {
  const {updateCountUserFnc} = useCreateGroup()
  const handleClickContactItem = () => {
    if(type === ChatNewEnum.NEW_GROUP && goTo){
      goTo()
    }
  }
  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    const typeUpdate = isChecked ? 'INCREASE' : 'DECREASE'
    updateCountUserFnc({type:typeUpdate})
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
      {
        checkBox && dataUser &&  <CheckBox>
          <InputCheck hidden type="checkbox" name={`checkbox-option-${dataUser.alias}`} id={`checkbox-option-${dataUser.alias}`} onChange={(event:React.ChangeEvent<HTMLInputElement>) => handleChange(event)}/>
          <LabelOption htmlFor={`checkbox-option-${dataUser.alias}`}>
            <span></span>
          </LabelOption>
        </CheckBox>
      }
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
const LabelOption = styled.label`
`
const CheckBox = styled.div`
  ${({theme}) => theme.flexRowCenter};
  margin-left: auto;
`
const InputCheck = styled.input`
  height: 0; 
  width: 0;

  & + label{
    position: relative;
    display: flex;
    align-items: center;
    transition: color 250ms cubic-bezier(.4,.0,.23,1);
  }
  & + label > span{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 18px;
    height: 18px;
    background: transparent;
    border: 2px solid ${({theme}) => theme.secondaryEleLight};
    border-radius: 4px;
    cursor: pointer;
    transition: all 250ms cubic-bezier(.4,.0,.23,1);
  }

  &:checked + label > span{
    border: 9px solid ${({theme}) => theme.mainLightTheme};
    animation: shrink-bounce 200ms cubic-bezier(.4,.0,.23,1);
  }
  &:checked + label > span::before{
    content: "";
    position: absolute;
    top: 7px;
    left: 3px;
    border-right: 2px solid transparent;
    border-bottom: 2px solid transparent;
    transform: rotate(45deg);
    transform-origin: 0 100%;
    animation: checkbox-check 125ms 250ms cubic-bezier(.4,.0,.23,1) forwards;
  }

  @keyframes shrink-bounce{
    0%{
      transform: scale(1);
    }
    33%{
      transform: scale(.85);
    }
    100%{
      transform: scale(1);
    }
  }
  @keyframes checkbox-check{
    0%{
      width: 0;
      height: 0;
      border-color: ${({theme}) => theme.white};
      transform: translate3d(0,0,0) rotate(45deg);
    }
    33%{
      width: 4px;
      height: 0;
      transform: translate3d(0,0,0) rotate(45deg);
    }
    100%{
      width: 4px;
      height: 9px;
      border-color: ${({theme}) => theme.white};
      transform: translate3d(0,-9px,0) rotate(45deg);
    }
  }
`
export default ContactItem;
