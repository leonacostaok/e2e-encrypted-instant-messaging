import React, {useState} from 'react';
import styled from "styled-components";
import HeaderTabPane from "../../HeaderTabPane";
import FormInputSearch from "../../FormInputSearch";
import ContactItem from "../../ContactItem";
import {ChatNewEnum, ScreenChatEnum} from "../../../constants/chat";
import {ScreenChatType} from "../../../types/chat.type";
import {TextSmall} from "../../Typhography";
import {ButtonSecondary} from '../../Button';
interface PropsTypeNewChat{
  goTo: (screen:ScreenChatType) => void;
}
const NewChat = ({goTo}:PropsTypeNewChat) => {
  const [term,setTerm] = useState<string>('')
  const onChange = (valueSearch:string) => {
    setTerm(valueSearch)
  }
  return (
    <NewGroupBox>
      <HeaderTabPane title={'New group'} back={true} goBack={() => goTo(ScreenChatEnum.DEFAULT)}/>
      <BoxSearch>
        <FormInputSearch placeholder={'Search...'} id={'newGroup'} name={'newGroup'} value={term} onChange={onChange}/>
      </BoxSearch>
      <BoxContactUser>
        <TextSelected>3 contact(s) selected</TextSelected>
        <TextContact>Contacts</TextContact>
        <ListUser>
          <ContactItem type={ChatNewEnum.USER} checkBox={true}/>
          <ContactItem type={ChatNewEnum.USER} checkBox={true} />
          <ContactItem type={ChatNewEnum.USER} checkBox={true}/>
        </ListUser>
        <CtaNext>
          <ButtonSecondary>Next</ButtonSecondary>
        </CtaNext>
      </BoxContactUser>
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
