import React, {useState} from 'react';
import ModalChat from "../ModalChat";
import {ButtonPrimary, ButtonSecondary} from "../Button";
import styled from "styled-components";
import FormInputSearch from "../FormInputSearch";
import {TextSmall} from "../Typhography";
import ContactItem from "../ContactItem";
import {ChatTypeEnum} from "../../constants/chat";
import {useCreateGroup} from "../../hooks/useCreateGroup";
import {FormTextarea} from "../FormGroup";
import ImageDefault from '../../assets/images/img_message_default.png';

interface PropsTypeModalForward {
    onDismiss: () => void;
    visible: boolean;
}

const ModalForward = ({onDismiss, visible}: PropsTypeModalForward) => {
    const [term, setTerm] = useState<string>('')
    const onChange = (valueSearch: string) => {
        setTerm(valueSearch)
    }
    const {count} = useCreateGroup()
    return (
        <ModalChat onDismiss={onDismiss} visible={visible} title={'Forward Message'}>
            <ModalChild>
                {
                    // check message hasn't text (update after)
                    true && <MediaOnly>
                        <img alt={'media'} src={ImageDefault}/>
                        <DivTextarea>
                            <FormTextarea placeholder={'Add a message...'} rows={5}/>
                        </DivTextarea>
                    </MediaOnly>
                }
                <ModalSearch>
                    <FormInputSearch placeholder={'Search'} id={'search-user'} name={'search-user'} value={term}
                                     onChange={onChange}/>
                </ModalSearch>
                <ModalRecent>
                    <TextRecent>Recent</TextRecent>
                    <ListUser>
                        <ContactItem type={ChatTypeEnum.USER} checkBox={true} dataUser={{alias: 'user100'}}
                                     disable={count >= 5}/>
                        <ContactItem type={ChatTypeEnum.USER} checkBox={true} dataUser={{alias: 'user101'}}
                                     disable={count >= 5}/>
                        <ContactItem type={ChatTypeEnum.USER} checkBox={true} dataUser={{alias: 'user102'}}
                                     disable={count >= 5}/>
                        <ContactItem type={ChatTypeEnum.USER} checkBox={true} dataUser={{alias: 'user103'}}
                                     disable={count >= 5}/>
                        <ContactItem type={ChatTypeEnum.USER} checkBox={true} dataUser={{alias: 'user104'}}
                                     disable={count >= 5}/>
                        <ContactItem type={ChatTypeEnum.GROUP} checkBox={true} dataUser={{alias: 'user105'}}
                                     disable={count >= 5}/>
                    </ListUser>
                    {
                        count >= 5 &&
                        <TextWarning>You can forward up to <span>5</span> people or groups at a time</TextWarning>
                    }
                </ModalRecent>
                <ModalFooter>
                    <ButtonPrimary onClick={() => onDismiss()}>Cancel</ButtonPrimary>
                    <ButtonSecondary>Forward</ButtonSecondary>
                </ModalFooter>
            </ModalChild>
        </ModalChat>
    );
};
const ModalChild = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`
const MediaOnly = styled.div`
    ${({theme}) => theme.flexRowCenterVertical};
    gap: 10px;
    background-color: ${({theme}) => theme.inputBgLight};
    margin-left: -24px;
    margin-right: -24px;
    padding: 20px 24px;

    img {
        width: 80px;
        height: 80px;
        flex-basis: 80px;
        display: block;
        border-radius: 4px;
    }
`
const DivTextarea = styled.div`
    flex: 0 0 calc(100% - 90px);
    max-width: calc(100% - 90px);
`
const ModalSearch = styled.div``
const ModalRecent = styled.div``
const TextRecent = styled(TextSmall)`
    color: ${({theme}) => theme.tertiaryEleLight};
    margin-bottom: 8px;
`
const ModalFooter = styled.div`
    ${({theme}) => theme.flexRowCenterVertical};
    justify-content: flex-end;
    gap: 8px;
`
const ListUser = styled.div``
const TextWarning = styled.p`
    ${({theme}) => theme.font1420};
    margin: 8px 0 0 0;
    color: ${({theme}) => theme.caption};

    span {
        color: ${({theme}) => theme.mainDark};
    }
`
export default ModalForward;
