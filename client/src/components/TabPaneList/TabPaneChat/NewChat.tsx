import React, {useState} from 'react';
import styled from "styled-components";
import HeaderTabPane from "../../HeaderTabPane";
import FormInputSearch from "../../FormInputSearch";
import ContactItem from "../../ContactItem";
import {ChatNewEnum, ScreenChatEnum} from "../../../constants/chat";
import {ScreenChatType} from "../../../types/chat.type";
interface PropsTypeNewChat{
  goTo: (screen:ScreenChatType) => void;
}
const NewChat = ({goTo}:PropsTypeNewChat) => {
  const [term,setTerm] = useState<string>('')
  const onChange = (valueSearch:string) => {
    setTerm(valueSearch)
  }
  return (
    <NewChatBox>
      <HeaderTabPane title={'New chat'} back={true} goBack={() => goTo(ScreenChatEnum.DEFAULT)}/>
      <BoxSearch>
        <FormInputSearch placeholder={'Search...'} id={'newChat'} name={'newChat'} value={term} onChange={onChange}/>
      </BoxSearch>
      <BoxAddGroup>
        <ContactItem type={ChatNewEnum.NEW_GROUP} goTo={() =>goTo(ScreenChatEnum.NEW_GROUP)}/>
      </BoxAddGroup>
      <BoxContactUser>
        <TextContact>Contacts</TextContact>
        <ListUser>
          <ContactItem type={ChatNewEnum.USER} />
        </ListUser>
      </BoxContactUser>
    </NewChatBox>
  );
};
const NewChatBox = styled.div`
  height: 100%;
`
const BoxSearch = styled.div`
  padding: 0 16px;
  margin-bottom: 16px;
`
const BoxAddGroup = styled.div``
const BoxContactUser = styled.div``
const ListUser = styled.div``
const TextContact = styled.h6`
  ${({theme}) => theme.font1420};
  letter-spacing: 0.1px;
  color: ${({theme}) => theme.secondaryEleLight};
  padding: 16px;
  margin: 0;
`
export default NewChat;
