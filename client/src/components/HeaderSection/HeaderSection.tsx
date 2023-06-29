import React from 'react';
import styled from "styled-components";
import IconArrowLeft from '../../assets/icons/icon-arrow-left.svg'
import IconPortal from "../IconPortal";
import {TextLarge} from "../Typhography";
interface PropsTypeHeaderSection{
  back?:boolean
  title:string
  goBack?:() => void
}
const HeaderSection = ({back = false,title,goBack}:PropsTypeHeaderSection) => {
  const handleBack = () => {
    if(!goBack){
      return
    }
    goBack()
  }
  return (
    <HeaderSectionWrap>
      {back && <Back onClick={() => handleBack()}>
        <IconPortal srcIcon={IconArrowLeft} widthIcon={'24px'} heightIcon={'24px'} />
      </Back>}
      <TitleTab>{title}</TitleTab>
    </HeaderSectionWrap>
  );
};
const HeaderSectionWrap = styled.div`
  padding: 16px;
  display: flex;
  align-items: center;
  height: 64px;
`
const Back = styled.div`
  margin-right: 10px;
  cursor: pointer;
`
const TitleTab = styled(TextLarge)`
  text-transform: capitalize;
`
export default HeaderSection;
