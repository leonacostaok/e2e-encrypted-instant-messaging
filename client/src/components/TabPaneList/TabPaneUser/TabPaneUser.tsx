import React from 'react';
import HeaderTabPane from "../../HeaderTabPane";
import {DividerTab, TabPaneWrapper} from "../commonStyle";

const TabPaneUser = () => {
  return (
    <TabPaneWrapper>
      <HeaderTabPane title={'Profile'}/>
      <DividerTab/>
    </TabPaneWrapper>
  );
};

export default TabPaneUser;
