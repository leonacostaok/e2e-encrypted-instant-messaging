import React from 'react';
import styled from "styled-components";
import {TextLarge, TextMedium} from "../../../components/Typhography";
import IconPortal from "../../../components/IconPortal";
import IconExit from "../../../assets/icons/icon-exit.svg";
import {DividerLight} from "../../../components/Divider";
import IconUserDefault from "../../../assets/icons/icon-user-default.svg";
import IconMedia from "../../../assets/icons/icon-media.svg";
import IconNotification from "../../../assets/icons/icon-notification.svg";
import ToggleSwitch from "../../../components/ToggleSwitch";
import {ChatExpandEnum} from "../../../constants/chat";
import {ChatExpandType} from "../../../types/chat.type";
import IconSearch from "../../../assets/icons/icon-search.svg";
import IconLeave from "../../../assets/icons/icon-logout.svg";

interface PropsTypeExpandMain {
    onHide: () => void;
    onChosen: (chosenValue: ChatExpandType) => void;
}

const ExpandMain = ({onHide, onChosen}: PropsTypeExpandMain) => {
    return (
        <ExpandMainBox>
            <HeaderExpand>
                <TextLarge>Contact information</TextLarge>
                <DivIcon onClick={onHide}>
                    <IconPortal srcIcon={IconExit as string}/>
                </DivIcon>
            </HeaderExpand>
            <DividerLight/>
            <BoxInfo>
                <Avatar>
                    <IconPortal srcIcon={IconUserDefault as string} widthIcon={'80px'} heightIcon={'80px'}/>
                </Avatar>
                <Username>Username</Username>
                <Introduce>Status user previously setup</Introduce>
            </BoxInfo>
            <OptionList>
                <OptionItem>
                    <DivIcon>
                        <IconPortal srcIcon={IconMedia as string}/>
                    </DivIcon>
                    <Name>Media</Name>
                </OptionItem>
                <OptionItem>
                    <DivIcon>
                        <IconPortal srcIcon={IconNotification as string}/>
                    </DivIcon>
                    <Name>Notifications</Name>
                    <DivToggle>
                        <ToggleSwitch enable={true}/>
                    </DivToggle>
                </OptionItem>
                <OptionItem onClick={() => onChosen(ChatExpandEnum.SEARCH as ChatExpandType)}>
                    <DivIcon>
                        <IconPortal srcIcon={IconSearch as string}/>
                    </DivIcon>
                    <Name>Search</Name>
                </OptionItem>
                <OptionItem>
                    <DivIcon>
                        <IconPortal srcIcon={IconLeave as string}/>
                    </DivIcon>
                    <Name>Leave</Name>
                </OptionItem>
            </OptionList>
        </ExpandMainBox>
    );
};
const ExpandMainBox = styled.div``
const HeaderExpand = styled.header`
    ${({theme}) => theme.flexRowCenterVertical};
    justify-content: space-between;
    width: 100%;
    padding: 16px;
    height: 64px;
`
const DivIcon = styled.div`
    cursor: pointer;
    height: 24px;
    width: 24px;
`
const OptionList = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
`
const OptionItem = styled.li`
    padding: 16px;
    border-style: solid;
    border-color: ${({theme}) => theme.mainLight};
    border-width: 0 0 1px 0;
    ${({theme}) => theme.flexRowCenterVertical};
    gap: 16px;
    cursor: pointer;
    transition: background-color 0.25s ease-in;

    &:first-of-type {
        border-top-width: 1px;
    }

    &:hover {
        background-color: ${({theme}) => theme.mainLight};
    }
`
const Name = styled(TextMedium)`
    color: ${({theme}) => theme.mainTextLight};
`
const DivToggle = styled.div`
    margin-left: auto;
`
const BoxInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 16px;
    gap: 10px;
`
const Avatar = styled.div`
    width: 80px;
    height: 80px;
    border-radius: 200px;
`
const Username = styled.p`
    margin: 0;
    font-size: ${({theme}) => theme.fontSizeBody2};
    font-weight: 700;
    color: ${({theme}) => theme.mainTextLight};
`
const Introduce = styled(TextMedium)`
    color: ${({theme}) => theme.tertiaryEleLight};
`
export default ExpandMain;
