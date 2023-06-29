import React, {useState} from 'react';
import styled from "styled-components";
import HeaderSection from "../../HeaderSection";
import FormInputSearch from "../../FormInputSearch";
import ContactItem from "../../ContactItem";
import {ChatTypeEnum, ScreenChatEnum} from "../../../constants/chat";
import {ScreenChatType} from "../../../types/chat.type";
import {TextSmall} from "../../Typhography";
import {ButtonSecondary} from '../../Button';
import {useCreateGroup} from "../../../hooks/useCreateGroup";
import FormCreateGroup from "./FormCreateGroup";
interface PropsTypeNewChat{
  goTo: (screen:ScreenChatType) => void;
}
const NewChat = ({goTo}:PropsTypeNewChat) => {
  const [term,setTerm] = useState<string>('')
  const [createGroup,setCreateGroup] = useState<boolean>(false)
  const {resetCountUserFnc} = useCreateGroup()
  const onChange = (valueSearch:string) => {
    setTerm(valueSearch)
  }
  const {count} = useCreateGroup()
  return (
    <NewGroupBox>
      <HeaderSection title={'New group'} back={true} goBack={() => {
        resetCountUserFnc()
        goTo(ScreenChatEnum.DEFAULT)
      }}/>
      {
        !createGroup ? <>
          <BoxSearch>
            <FormInputSearch placeholder={'Search...'} id={'newGroup'} name={'newGroup'} value={term} onChange={onChange}/>
          </BoxSearch>
          <BoxContactUser>
            {
              count !== 0 &&  <TextSelected>{count} contact(s) selected</TextSelected>
            }
            <TextContact>Contacts</TextContact>
            <ListUser>
              <ContactItem type={ChatTypeEnum.USER} checkBox={true} dataUser={{alias: 'user10'}}/>
              <ContactItem type={ChatTypeEnum.USER} checkBox={true} dataUser={{alias: 'user11'}}/>
              <ContactItem type={ChatTypeEnum.USER} checkBox={true} dataUser={{alias: 'user12'}}/>
            </ListUser>
            <CtaNext>
              <ButtonSecondary onClick={() => setCreateGroup(true)}>Next</ButtonSecondary>
            </CtaNext>
          </BoxContactUser>
        </> : <FormCreateGroup />
      }
    </NewGroupBox>
  );
};
const NewGroupBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`
const BoxSearch = styled.div`
  padding: 0 16px;
  margin-bottom: 16px;
`
const BoxContactUser = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-bottom: 16px;
`
const ListUser = styled.div``
const TextContact = styled.h6`
  ${({theme}) => theme.font1420};
  letter-spacing: 0.1px;
  color: ${({theme}) => theme.secondaryEleLight};
  padding: 16px;
  margin: 0;
`
const TextSelected = styled(TextSmall)`
  letter-spacing: 0.1px;
  color: ${({theme}) => theme.mainLightTheme};
  padding: 0 16px;
`
const CtaNext = styled.div`
  display: flex;
  justify-content: flex-end; 
  margin-top: auto;
  margin-right: 16px;
`
export default NewChat;
