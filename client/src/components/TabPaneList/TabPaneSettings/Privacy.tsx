import React from 'react';
import styled from "styled-components";
import {LabelOption} from "./components/LabelOption";
import {TextSmallOption} from "./components/TextSmallOption";
import ToggleSwitch from "../../ToggleSwitch";

import SelectSingleCs from "../../SelectSingleCs";
import {optionStatus, optionImages, optionName, optionEmoji, optionPhone} from "../../../constants/options";

const Privacy = () => {
  return (
    <PrivacyWrapper>
      <PrivacyList>
        <PrivacyItem>
          <DivFlexRowCenter>
            <LabelOption>Auto accept new contacts</LabelOption>
            <ToggleSwitch enable={true}/>
          </DivFlexRowCenter>
        </PrivacyItem>
        <PrivacyItem>
          <DivFlexRowCenter>
            <LabelOption>Read receipts</LabelOption>
            <ToggleSwitch />
          </DivFlexRowCenter>
          <DivChild>
            <TextSmallOption>Allow others to be notified when you have read their messages</TextSmallOption>
          </DivChild>
        </PrivacyItem>
        <PrivacyItem>
          <DivFlexRowCenter>
            <LabelOption>Searching</LabelOption>
          </DivFlexRowCenter>
          <DivChild>
            <DivFlexRowCenter>
              <TextSmallOption>Phone number</TextSmallOption>
              <ToggleSwitch />
            </DivFlexRowCenter>
            <DivFlexRowCenter>
              <TextSmallOption>Alias</TextSmallOption>
              <ToggleSwitch />
            </DivFlexRowCenter>
          </DivChild>
        </PrivacyItem>
        <PrivacyItem>
          <DivFlexRowCenter>
            <LabelOption>Sharing</LabelOption>
          </DivFlexRowCenter>
          <DivChild>
            <DivChildRow>
              <TextSmallOption>Phone number</TextSmallOption>
              <SelectSingleCs options={optionPhone}/>
            </DivChildRow>
          </DivChild>
          <DivChild>
            <DivChildRow>
              <TextSmallOption>Emoji</TextSmallOption>
              <SelectSingleCs options={optionEmoji}/>
            </DivChildRow>
          </DivChild>
          <DivChild>
            <DivChildRow>
              <TextSmallOption>Name</TextSmallOption>
              <SelectSingleCs options={optionName}/>
            </DivChildRow>
          </DivChild>
          <DivChild>
            <DivChildRow>
              <TextSmallOption>Images</TextSmallOption>
              <SelectSingleCs options={optionImages}/>
            </DivChildRow>
          </DivChild>
          <DivChild>
            <DivChildRow>
              <TextSmallOption>Status</TextSmallOption>
              <SelectSingleCs options={optionStatus}/>
            </DivChildRow>
          </DivChild>
        </PrivacyItem>
      </PrivacyList>
    </PrivacyWrapper>
  );
};
const PrivacyWrapper = styled.div``
const PrivacyList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
const PrivacyItem = styled.div``
const DivFlexRowCenter = styled.div`
  ${({theme}) => theme.flexRowCenterVertical};
  justify-content: space-between;
`
const DivChild = styled.div`
  margin-top: 8px;
  margin-left: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`
const DivChildRow = styled.div`
  ${({theme}) => theme.flexRowCenterVertical};
  justify-content: space-between;
`
export default Privacy;
