import React from 'react';
import styled, {css} from "styled-components";
import {LabelMedium} from "../Typhography";
interface PropsTypeBadge{
  isMuted?:boolean
}
const Badge = ({isMuted = false}:PropsTypeBadge) => {
  return (
    <BadgeBox isMuted={isMuted}>
       <CountMessage>9</CountMessage>
    </BadgeBox>
  );
};
const BadgeBox = styled.div<{isMuted?:boolean}>`
  height: 20px;
  border-radius: 30px;
  width: max-content;
  ${({theme}) => theme.flexRowCenter};
  background-color: ${({theme}) => theme.mainLightTheme};
  ${({ isMuted }) =>
    isMuted &&
    css`
      background-color: ${({theme}) => theme.disabledEleLight};
    `}
`
const CountMessage = styled(LabelMedium)`
  color: ${({theme}) => theme.white};
  letter-spacing: 0.5px;
  text-align: center;
  padding: 2px 6.5px 0;

`
export default Badge;
