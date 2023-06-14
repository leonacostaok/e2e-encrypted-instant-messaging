import React, {useCallback, useState} from 'react';
import HeaderTabPane from "../../HeaderTabPane";
import {DividerTab, TabPaneContent, TabPaneWrapper} from "../commonStyle";
import {TabSettingsEnum} from "../../../constants/tabItem";
import IconNotification from '../../../assets/icons/icon-notification.svg'
import IconSecurity from '../../../assets/icons/icon-defense.svg'
import IconPrivacy from '../../../assets/icons/icon-lock.svg'
import IconSupport from '../../../assets/icons/icon-questions.svg'
import {TabSettingsType} from "../../../types/tabItem.type";
import Notifications from "./Notifications";
import Privacy from "./Privacy";
import Security from "./Security";
import Support from "./Support";
import SettingItem from "../../SettingItem";

const optionSettings = [
  {
    key: TabSettingsEnum.NOTIFICATION,
    icon: IconNotification,
    title: 'Notification'
  },
  {
    key: TabSettingsEnum.PRIVACY,
    icon: IconPrivacy,
    title: 'Privacy'
  },
  {
    key: TabSettingsEnum.SECURITY,
    icon: IconSecurity,
    title: 'Security'
  },
  {
    key: TabSettingsEnum.SUPPORT,
    icon: IconSupport,
    title: 'Support'
  }
]
const TabPaneSettings = () => {
  const [optionSetting,setOptionSetting] = useState<TabSettingsType>(TabSettingsEnum.SETTINGS)
  const onBackSetting = useCallback(() =>{
    setOptionSetting(TabSettingsEnum.SETTINGS)
  },[])
  const onClickSetting = useCallback((itemKey:TabSettingsType) => {
    setOptionSetting(itemKey)
  },[])
  const renderContentOption = useCallback(() => {
    if(optionSetting === TabSettingsEnum.SETTINGS){
      return <></>
    }
    switch (optionSetting) {
      case TabSettingsEnum.PRIVACY:
        return <Privacy />
      case TabSettingsEnum.SECURITY:
        return <Security />
      case TabSettingsEnum.SUPPORT:
        return <Support />
      default:
        return <Notifications />
    }
  },[optionSetting])
  return (
    <TabPaneWrapper>
      <HeaderTabPane title={optionSetting} back={optionSetting !== TabSettingsEnum.SETTINGS} goBack={onBackSetting}/>
      <DividerTab/>
      {
        optionSetting === TabSettingsEnum.SETTINGS ? optionSettings.map(item => {
          return <SettingItem data = {item} key={item.key} choose={item.key !== TabSettingsEnum.SUPPORT} onClick={onClickSetting}/>
        }) : <TabPaneContent>
          {renderContentOption()}
        </TabPaneContent>
      }
    </TabPaneWrapper>
  );
};
export default TabPaneSettings;
