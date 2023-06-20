import styled from "styled-components";
import {LabelLarge} from "../Typhography";

export const FormGroup = styled.div`
  width: 100%;
`
export const FormLabel = styled(LabelLarge)`
  letter-spacing: 0.25px;
  color: ${({theme}) => theme.mainTextLight};
  margin-bottom: 8px;
`
export const FormInputStyle = styled.input`
  width: 100%;
  outline: none;
  padding: 10px 16px;
  border: 1px solid ${({theme}) => theme.incomingBg};
  border-radius: 4px;
  
  font-size: ${({theme}) => theme.fontSizeText2};
  line-height: 1.5;
  letter-spacing: 0.15px;
  color: ${({theme}) => theme.secondaryTextLight};

  ::-webkit-input-placeholder {
    color: ${({theme}) => theme.secondaryText};
    font-size: ${({theme}) => theme.fontSizeText2};
    line-height: 1.5;
  }

  :-ms-input-placeholder { 
    color: ${({theme}) => theme.secondaryText};
    font-size: ${({theme}) => theme.fontSizeText2};
    line-height: 1.5;
  }

  ::placeholder {
    color: ${({theme}) => theme.secondaryText};
    font-size: ${({theme}) => theme.fontSizeText2};
    line-height: 1.5;
  }
`

export const LabelCheckBox = styled.label`
`
export const CheckBox = styled.div`
  ${({theme}) => theme.flexRowCenter};
`
export const InputCheckBox = styled.input`
  height: 0; 
  width: 0;

  & + label{
    position: relative;
    display: flex;
    align-items: center;
    transition: color 250ms cubic-bezier(.4,.0,.23,1);
  }
  & + label > span{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 18px;
    height: 18px;
    background: transparent;
    border: 2px solid ${({theme}) => theme.secondaryEleLight};
    border-radius: 4px;
    cursor: pointer;
    transition: all 250ms cubic-bezier(.4,.0,.23,1);
  }

  &:checked + label > span{
    border: 9px solid ${({theme}) => theme.mainLightTheme};
    animation: shrink-bounce 200ms cubic-bezier(.4,.0,.23,1);
  }
  &:checked + label > span::before{
    content: "";
    position: absolute;
    top: 7px;
    left: 3px;
    border-right: 2px solid transparent;
    border-bottom: 2px solid transparent;
    transform: rotate(45deg);
    transform-origin: 0 100%;
    animation: checkbox-check 125ms 250ms cubic-bezier(.4,.0,.23,1) forwards;
  }

  @keyframes shrink-bounce{
    0%{
      transform: scale(1);
    }
    33%{
      transform: scale(.85);
    }
    100%{
      transform: scale(1);
    }
  }
  @keyframes checkbox-check{
    0%{
      width: 0;
      height: 0;
      border-color: ${({theme}) => theme.white};
      transform: translate3d(0,0,0) rotate(45deg);
    }
    33%{
      width: 4px;
      height: 0;
      transform: translate3d(0,0,0) rotate(45deg);
    }
    100%{
      width: 4px;
      height: 9px;
      border-color: ${({theme}) => theme.white};
      transform: translate3d(0,-9px,0) rotate(45deg);
    }
  }
`
export const FormTextarea = styled.textarea`
  padding: 8px;
  width: 100%;
  border: none;
  resize: none;
  font-size: ${({theme}) => theme.fontSizeText4};
  line-height: 1.1667;
  letter-spacing: 0.15px;
  color: ${({theme}) => theme.secondaryTextLight};
  outline: none;
  ::-webkit-input-placeholder {
    font-size: ${({theme}) => theme.fontSizeText4};
    line-height: 1.1667;
    letter-spacing: 0.15px;
    color: ${({theme}) => theme.tertiaryEleLight};
  }

  :-ms-input-placeholder { 
    font-size: ${({theme}) => theme.fontSizeText4};
    line-height: 1.1667;
    letter-spacing: 0.15px;
    color: ${({theme}) => theme.tertiaryEleLight};
  }

  ::placeholder {
    font-size: ${({theme}) => theme.fontSizeText4};
    line-height: 1.1667;
    letter-spacing: 0.15px;
    color: ${({theme}) => theme.tertiaryEleLight};
  }
`
