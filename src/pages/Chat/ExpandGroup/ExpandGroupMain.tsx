import React, {useEffect, useRef, useState} from 'react';
import styled, {css} from "styled-components";
import {TextLarge, TextMedium} from "../../../components/Typhography";
import IconPortal from "../../../components/IconPortal";
import IconExit from "../../../assets/icons/icon-exit.svg";
import {DividerLight} from "../../../components/Divider";
import IconNotification from "../../../assets/icons/icon-notification.svg";
import ToggleSwitch from "../../../components/ToggleSwitch";
import {ChatExpandEnum, ChatTypeEnum} from "../../../constants/chat";
import {ChatExpandType} from "../../../types/chat.type";
import IconSearch from "../../../assets/icons/icon-search.svg";
import IconLeave from "../../../assets/icons/icon-logout.svg";
import IconGroupDefault from '../../../assets/icons/icon-group-default.svg'
import IconMembers from '../../../assets/icons/icon-members.svg'
import {ReactComponent as IconChevronRight} from '../../../assets/icons/icon-chevron-right.svg'
import {ButtonPrimary} from '../../../components/Button'
import BoxNameAvatar from "../../../components/BoxNameAvatar";

interface PropsTypeExpandGroupMain {
    onHide: () => void;
    onChosen: (chosenValue: ChatExpandType) => void;
}

const ExpandGroupMain = ({onHide, onChosen}: PropsTypeExpandGroupMain) => {
    const [showMembers, setShowMembers] = useState<boolean>(false)
    const onToggleMembers = () => {
        setShowMembers(!showMembers)
    }
    const optionMemberRef = useRef<any>(null)
    const memberRef = useRef<any>(null)
    useEffect(() => {
        if (!optionMemberRef || !memberRef || !memberRef?.current || !optionMemberRef?.current) {
            return
        }
        if (showMembers) {
            const height = memberRef.current.getBoundingClientRect().height
            console.log(height, '0')
            memberRef.current.style.cssText = `
        height:320px;
      `;
        } else {
            memberRef.current.style.cssText = `
        height: 0;
      `;
        }
    }, [showMembers])
    return (
        <ExpandGroupMainBox>
            <HeaderGroupExpand>
                <TextLarge>Group information</TextLarge>
                <DivIcon onClick={onHide}>
                    <IconPortal srcIcon={IconExit as string}/>
                </DivIcon>
            </HeaderGroupExpand>
            <DividerLight/>
            <BoxInfo>
                <Avatar>
                    <IconPortal srcIcon={IconGroupDefault as string} widthIcon={'80px'} heightIcon={'80px'}/>
                </Avatar>
                <Username>Group Name</Username>
                <DivEdit>Edit</DivEdit>
            </BoxInfo>
            <OptionList>
                <OptionItem>
                    <OptionItemMain>
                        <DivIcon>
                            <IconPortal srcIcon={IconNotification as string}/>
                        </DivIcon>
                        <Name>Notifications</Name>
                        <DivToggle>
                            <ToggleSwitch enable={true}/>
                        </DivToggle>
                    </OptionItemMain>
                </OptionItem>
                <OptionItem ref={optionMemberRef}>
                    <OptionItemMain onClick={onToggleMembers}>
                        <DivIcon>
                            <IconPortal srcIcon={IconMembers as string}/>
                        </DivIcon>
                        <Name>Members</Name>
                        <MembersGeneral open={showMembers}>
                            <MemberCount>10</MemberCount>
                            <IconChevronRight/>
                        </MembersGeneral>
                    </OptionItemMain>
                    <MemberList ref={memberRef} open={showMembers}>
                        <BoxNameAvatar type={ChatTypeEnum.USER}/>
                        <BoxNameAvatar type={ChatTypeEnum.USER}/>
                        <BoxNameAvatar type={ChatTypeEnum.USER}/>
                        <BoxNameAvatar type={ChatTypeEnum.USER}/>
                        <BoxNameAvatar type={ChatTypeEnum.USER}/>
                        <Groups>
                            <ButtonPrimary>
                                Invite members
                            </ButtonPrimary>
                            <ButtonPrimary>
                                See all members
                            </ButtonPrimary>
                        </Groups>
                    </MemberList>
                </OptionItem>

                <OptionItem onClick={() => onChosen(ChatExpandEnum.SEARCH as ChatExpandType)}>
                    <OptionItemMain>
                        <DivIcon>
                            <IconPortal srcIcon={IconSearch as string}/>
                        </DivIcon>
                        <Name>Search messages</Name>
                    </OptionItemMain>
                </OptionItem>
                <OptionItem>
                    <OptionItemMain>
                        <DivIcon>
                            <IconPortal srcIcon={IconLeave as string}/>
                        </DivIcon>
                        <Name>Leave group</Name>
                    </OptionItemMain>
                </OptionItem>
            </OptionList>
        </ExpandGroupMainBox>
    );
};
const ExpandGroupMainBox = styled.div``
const HeaderGroupExpand = styled.header`
    ${({theme}) => theme.flexRowCenterVertical};
    justify-content: space-between;
    width: 100%;
    padding: 16px;
    height: 64px;
`
const BoxInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 24px;
    gap: 10px;
    position: relative;
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
const DivEdit = styled.button`
    outline: none;
    border: none;
    background: none;
    position: absolute;
    right: 24px;
    top: 24px;
    font-size: ${({theme}) => theme.fontSizeText3};
    line-height: 1.1428;
    letter-spacing: 0.4px;
    color: ${({theme}) => theme.mainLightTheme};
    font-weight: 700;
    cursor: pointer;
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
    display: block;
    border-style: solid;
    border-color: ${({theme}) => theme.mainLight};
    border-width: 0 0 1px 0;

    &:first-of-type {
        border-top-width: 1px;
    }

`
const OptionItemMain = styled.div`
    padding: 16px;
    ${({theme}) => theme.flexRowCenterVertical};
    gap: 16px;
    cursor: pointer;
    transition: background-color 0.25s ease-in;

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
const MembersGeneral = styled.div<{ open: boolean }>`
    display: flex;
    align-items: center;
    gap: 4px;
    margin-left: auto;

    svg {
        width: 20px;
        height: 20px;
        transition: all 0.25s ease-in;

        path {
            fill: ${({theme}) => theme.secondaryEleLight};
        }
    }

    ${({open}) =>
            open &&
            css`
                svg {
                    transform: rotate(90deg);
                }
            `}
`
const MemberCount = styled.div`
    padding: 2px 6px 0;
    width: max-content;
    border-radius: 30px;
    background-color: ${({theme}) => theme.disabledEleLight};
    font-size: ${({theme}) => theme.fontSizeText4};
    line-height: 1.3333;
    color: ${({theme}) => theme.white};
`
const MemberList = styled.div<{ open: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 14px;
    height: 0;
    overflow: hidden;
    transition: all 0.25s ease-in;
    padding: 0;
    ${({open}) =>
            open &&
            css`
                padding: 16px;
            `}
`
const Groups = styled.div`
    ${({theme}) => theme.flexRowCenterVertical};
    gap: 8px;

    button {
        letter-spacing: -0.15px;
    }
`
export default ExpandGroupMain;
