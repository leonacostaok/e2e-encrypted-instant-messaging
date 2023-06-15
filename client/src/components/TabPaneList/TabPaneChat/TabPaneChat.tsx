import React, {useCallback, useState} from 'react';
import {TabPaneWrapper} from "../commonStyle";
import {ScreenChatType} from "../../../types/chat.type";
import {ScreenChatEnum} from "../../../constants/chat";
import MainChat from "./MainChat";
import NewChat from "./NewChat";
import NewGroup from "./NewGroup";
const TabPaneChat = () => {
  const [screenName,setScreenName] = useState<ScreenChatType>(ScreenChatEnum.DEFAULT)
  const onClickScreen = (screen:ScreenChatType)=>{
    setScreenName(screen)
  }
  const renderContentChat = useCallback(() => {
    switch (screenName) {
      case ScreenChatEnum.NEW_CHAT:
        return <NewChat goTo={onClickScreen}/>
      case ScreenChatEnum.NEW_GROUP:
        return <NewGroup goTo={onClickScreen} />
      default:
        return <MainChat goTo={onClickScreen} />
    }
  },[screenName])
  return (
    <TabPaneWrapper>
      {renderContentChat()}
    </TabPaneWrapper>
  );
};
export default TabPaneChat;
