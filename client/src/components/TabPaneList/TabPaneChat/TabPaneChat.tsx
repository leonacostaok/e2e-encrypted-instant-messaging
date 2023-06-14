import React from 'react';
import HeaderTabPane from "../../HeaderTabPane";
import {DividerTab, TabPaneWrapper} from "../commonStyle";

const TabPaneChat = () => {
  return (
    <TabPaneWrapper>
      <HeaderTabPane title={'Chat'}/>
      <DividerTab/>
    </TabPaneWrapper>
  );
};

export default TabPaneChat;
