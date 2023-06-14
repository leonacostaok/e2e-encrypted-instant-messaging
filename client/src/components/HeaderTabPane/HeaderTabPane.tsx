import React from 'react';
import styled from "styled-components";
import IconArrowLeft from '../../assets/icons/icon-arrow-left.svg'
import IconPortal from "../IconPortal";
import {TextLarge} from "../Typhography";
interface PropsTypeHeaderTabPane{
  back?:boolean
  title:string
  goBack?:() => void
}
const HeaderTabPane = ({back = false,title,goBack}:PropsTypeHeaderTabPane) => {
  const handleBack = () => {
    if(!goBack){
      return
    }
    goBack()
  }
  return (
    <HeaderTabPaneWrap>
      {back && <Back onClick={() => handleBack()}>
        <IconPortal srcIcon={IconArrowLeft} widthIcon={'24px'} heightIcon={'24px'} />
      </Back>}
      <TitleTab>{title}</TitleTab>
    </HeaderTabPaneWrap>
  );
};
const HeaderTabPaneWrap = styled.div`
  padding: 16px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
`
const Back = styled.div`
  margin-right: 10px;
  cursor: pointer;
`
const TitleTab = styled(TextLarge)`
  text-transform: capitalize;
`
export default HeaderTabPane;
