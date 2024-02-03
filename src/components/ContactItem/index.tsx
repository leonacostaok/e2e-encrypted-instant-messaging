import React from 'react';
import styled from "styled-components";
import {ChatNewEnum} from "../../constants/chat";
import {ChatType} from "../../types/chat.type";
import {useCreateGroup} from "../../hooks/useCreateGroup";
import BoxNameAvatar from "../BoxNameAvatar";
import {CheckBox, LabelCheckBox, InputCheckBox} from "../../components/FormGroup";

interface PropsTypeContactItem {
    type: ChatType
    goTo?: () => void;
    checkBox?: boolean;
    dataUser?: any;
    disable?: boolean;
}

const ContactItem = ({type, goTo, checkBox = false, dataUser = undefined, disable = false}: PropsTypeContactItem) => {
    const {updateCountUserFnc} = useCreateGroup()
    const handleClickContactItem = () => {
        if (type === ChatNewEnum.GROUP && goTo) {
            goTo()
        }
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        const typeUpdate = isChecked ? 'INCREASE' : 'DECREASE'
        updateCountUserFnc({type: typeUpdate})
    }
    return (
        <ContactItemBox onClick={handleClickContactItem}>
            <BoxNameAvatar type={type}/>
            {
                checkBox && dataUser && <CheckBoxCs aria-disabled={disable}>
                    <InputCheckBox hidden type="checkbox" name={`checkbox-option-${dataUser.alias}`}
                                   id={`checkbox-option-${dataUser.alias}`}
                                   onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event)}/>
                    <LabelCheckBox htmlFor={`checkbox-option-${dataUser.alias}`}>
                        <span></span>
                    </LabelCheckBox>
                </CheckBoxCs>
            }
        </ContactItemBox>
    );
};
const ContactItemBox = styled.div`
    border-bottom: 1px solid ${({theme}) => theme.mainLight};
    padding: 8px 16px;
    ${({theme}) => theme.flexRowCenterVertical};
    gap: 16px;

    &:first-of-type {
        border-top: 1px solid ${({theme}) => theme.mainLight};
    }
`
const CheckBoxCs = styled(CheckBox)`
    margin-left: auto;

    &[aria-disabled = 'true'] {
        input:not(:checked) {
            pointer-events: none;
            cursor: none;

            & + label {
                pointer-events: none;
                background-color: ${({theme}) => theme.incomingBgLight};
                border-radius: 4px;
                cursor: none;

                & > span {
                    border-color: ${({theme}) => theme.incomingBgLight};
                }
            }
        }
    }
`
export default ContactItem;
