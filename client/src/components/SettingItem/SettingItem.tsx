import React from 'react';
import styled from "styled-components";
import IconPortal from "../IconPortal";
import {TextMedium} from "../Typhography";
import IconChevronRight from '../../assets/icons/icon-chevron-right.svg'
import {TabSettingsType} from "../../types/tabItem.type";

interface PropsTypeSettingItem{
  data:any;
  choose?:boolean;
  onClick?:(itemKey:TabSettingsType) => void;
}
const SettingItem = ({data,choose=true,onClick}:PropsTypeSettingItem) => {
  const handleClick = (itemKey:TabSettingsType | undefined) => {
    if(!itemKey || !onClick){
      return
    }
    onClick(itemKey)
  }
  return (
    <SettingItemBox onClick={() => handleClick(data?.key)}>
      {
        data.icon && <IconPortal srcIcon={data.icon} widthIcon={'24px'} heightIcon={'24px'} />
      }
      {
        data.title && <SettingName>{data.title}</SettingName>
      }
      {
        choose &&  <IconChoose>
          <IconPortal srcIcon={IconChevronRight} widthIcon={'24px'} heightIcon={'24px'} />
        </IconChoose>
      }
    </SettingItemBox>
  );
};
const SettingItemBox = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  gap: 16px;
  cursor: pointer;
`
const SettingName = styled(TextMedium)`
  flex: 1;
`
const IconChoose = styled.div`
  flex: 0 0 24px;
  max-width: 24px;
`
export default SettingItem;
