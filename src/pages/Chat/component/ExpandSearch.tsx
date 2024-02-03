import React, {useState} from 'react';
import styled from "styled-components";
import HeaderSection from "../../../components/HeaderSection";
import {ChatExpandType} from "../../../types/chat.type";
import {DividerLight} from "../../../components/Divider";
import FormInputSearch from "../../../components/FormInputSearch";
import MessageCp from "../../../components/MessageCp";

interface PropsTypeExpandSearch {
    onChosen: (chosenValue: ChatExpandType | null) => void;
}

const ExpandSearch = ({onChosen}: PropsTypeExpandSearch) => {
    const goBack = () => {
        onChosen(null)
    }
    const [message, setMessage] = useState<string>('')
    const onChange = (valueSearch: string) => {
        setMessage(valueSearch)
    }
    return (
        <ExpandSearchBox>
            <Header>
                <HeaderSection title={'Search'} back={true} goBack={goBack}/>
            </Header>
            <DividerLight/>
            <ResultBox>
                <FormInputSearch placeholder={'Search...'} id={'search-message'} name={'search-message'} value={message}
                                 onChange={onChange}/>
                <HistoryMessage>
                    {/*<MessageCp data={{data:{message:'Message in a single line'},id:10}}/>*/}
                    {/*<MessageCp data={{data:{message:'Single'},id:12}}/>*/}
                    {/*<MessageCp data={{data:{message: 'Message in a single line'},id:14,mine:true}}/>*/}
                </HistoryMessage>
            </ResultBox>
        </ExpandSearchBox>
    );
};
const ExpandSearchBox = styled.div``
const Header = styled.div`
    height: 64px;
    ${({theme}) => theme.flexRowCenterVertical};
`
const ResultBox = styled.div`
    padding: 16px;
`
const HistoryMessage = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-top: 24px;
    padding-left: 8px;
    padding-right: 8px;
`
export default ExpandSearch;
