import React, {useState} from 'react';
import styled from "styled-components";
import HeaderTabPane from "../../HeaderTabPane";
import FormInputSearch from "../../FormInputSearch";
import ContactItem from "../../ContactItem";
import {ChatNewEnum, ScreenChatEnum} from "../../../constants/chat";
import {ScreenChatType} from "../../../types/chat.type";
import {TextSmall} from "../../Typhography";
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
          <ContactItem type={ChatNewEnum.USER} />
          <ContactItem type={ChatNewEnum.USER} />
          <ContactItem type={ChatNewEnum.USER} />
        </ListUser>
      </BoxContactUser>
    </NewGroupBox>
  );
};
const NewGroupBox = styled.div``
const BoxSearch = styled.div`
  padding: 0 16px;
  margin-bottom: 16px;
`
const BoxContactUser = styled.div``
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
export default NewChat;