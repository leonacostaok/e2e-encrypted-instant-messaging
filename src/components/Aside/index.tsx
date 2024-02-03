import React, {useCallback, useState} from "react";
import styled, {css} from "styled-components";
import {Link as LinkRouter} from 'react-router-dom'
import IconPortal from "../IconPortal";
import Logo from '../../assets/icons/icon-logo.svg'
import IconLogout from '../../assets/icons/icon-logout.svg'
import IconChat from '../../assets/icons/icon-message.svg'
import IconUser from '../../assets/icons/icon-user.svg'
import IconSettings from '../../assets/icons/icon-settings.svg'
import {TabItemEnum} from "../../constants/tabItem";
import {TabItemType} from "../../types/tabItem.type";
import TabPaneSettings from "../TabPaneList/TabPaneSettings";
import TabPaneUser from "../TabPaneList/TabPaneUser";
import TabPaneChat from "../TabPaneList/TabPaneChat";
import ModalLogout from "../ModalLogout";

const tabItemList = [
    {
        key: TabItemEnum.CHAT,
        icon: IconChat,
    },
    {
        key: TabItemEnum.USER,
        icon: IconUser,
    },
    {
        key: TabItemEnum.SETTINGS,
        icon: IconSettings,
    }
]
const Aside = () => {
    const [tabActive, setTabActive] = useState<TabItemType>(TabItemEnum.CHAT)
    const [visibleLogout, setVisibleLogout] = useState<boolean>(false)
    const renderTabPaneContent = useCallback((tabKey: TabItemType) => {
        switch (tabKey) {
            case TabItemEnum.USER:
                return <TabPaneUser/>
            case TabItemEnum.SETTINGS:
                return <TabPaneSettings/>
            default:
                return <TabPaneChat/>
        }
    }, [])
    const handleChangeTab = (tabKey: TabItemType) => {
        setTabActive(tabKey)
    }
    const onOpenLogout = useCallback(() => {
        setVisibleLogout(true)
    }, [])
    const onDismiss = useCallback(() => {
        setVisibleLogout(false)
    }, [])
    return (
        <AsideWrapper>
            <AsideBar>
                <LogoWrap>
                    <LinkRouter to='/'>
                        <IconPortal srcIcon={Logo} heightIcon={'46px'} widthIcon={'46px'}/>
                    </LinkRouter>
                </LogoWrap>
                <AsideTabs>
                    {
                        tabItemList.map(item => {
                            return <TabItem key={item.key} active={item.key === tabActive}
                                            onClick={() => handleChangeTab(item.key)}>
                                <IconPortal srcIcon={item.icon} widthIcon={'24px'} heightIcon={'24px'}/>
                            </TabItem>
                        })
                    }
                </AsideTabs>
                <Logout onClick={onOpenLogout}>
                    <IconPortal srcIcon={IconLogout} heightIcon={'24px'} widthIcon={'24px'}/>
                </Logout>
            </AsideBar>
            <AsideTabPaneList>
                {renderTabPaneContent(tabActive)}
            </AsideTabPaneList>
            {
                visibleLogout && <ModalLogout onDismiss={onDismiss} visible={visibleLogout} onLogout={onDismiss}/>
            }
        </AsideWrapper>
    );
};
const AsideWrapper = styled.div`
    display: flex;
    height: 100%;
`
const AsideBar = styled.div`
    width: 80px;
    flex: 0 0 80px;
    box-shadow: inset 1px 0 0 ${({theme}) => theme.mainLight};
`
const LogoWrap = styled.div`
    width: 100%;
    height: 80px;
    border-bottom: 1px solid ${({theme}) => theme.mainLight};

    a {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }
`
const Logout = styled.div`
    ${({theme}) => theme.flexRowCenter};
    padding: 16px;
    border-bottom: 1px solid ${({theme}) => theme.mainLight};
    transition: background-color 0.25s ease-in;
    cursor: pointer;

    &:hover {
        background-color: ${({theme}) => theme.mainLight};
    }
`
const AsideTabs = styled.div`

`
const TabItem = styled.div<{ active: boolean }>`
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid ${({theme}) => theme.mainLight};
    transition: background-color 0.25s ease-in;

    &:hover {
        background-color: ${({theme}) => theme.mainLight};
    }

    ${({active}) =>
            active &&
            css`
                background-color: ${({theme}) => theme.mainLight};
                box-shadow: inset 4px 0 0 #FFAA66;
            `}
`
const AsideTabPaneList = styled.div`
    flex: 0 0 calc(100% - 80px);
    max-width: calc(100% - 80px);
    border-width: 0 1px 0 1px;
    border-color: ${({theme}) => theme.mainLight};
    border-style: solid;
`
export default Aside;
