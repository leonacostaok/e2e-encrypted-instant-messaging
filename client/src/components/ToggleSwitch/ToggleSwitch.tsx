import *as React from 'react';
import {ChangeEvent} from 'react'
import styled from "styled-components";
interface PropsTypeToggleSwitch{
  enable:boolean
  name?:string
  setFieldValue?:  any;
}
const ToggleSwitch = ({enable,name,setFieldValue}:PropsTypeToggleSwitch) => {
  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    if(setFieldValue){
      setFieldValue(name,checked)
    }
  }
  return (
    <ToggleSwitchBox>
      <input type="checkbox" checked={enable} name={name} id={name} onChange={(e) => handleChange(e)}/>
      <label htmlFor={name} />
    </ToggleSwitchBox>
  );
};
const ToggleSwitchBox = styled.div`
  input[type=checkbox]{
    height: 0;
    width: 0;
    visibility: hidden;
    display: none;
  }
  label {
    cursor: pointer;
    text-indent: -9999px;
    width: 40px;
    height: 18px;
    background-color: ${({theme}) => theme.white};
    display: block;
    border-radius: 40px;
    position: relative;
    border: 1px solid ${({theme}) => theme.incomingBg};
    transition: all 0.3s ease-in;
  }

  label::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 12px;
    height: 12px;
    background-color: ${({theme}) => theme.disabledEleDark};
    border-radius: 20px;
    transition: all 0.3s ease-in;
  }

  input:checked + label {
    background-color: ${({theme}) => theme.mainLightTheme};
    border-color: ${({theme}) => theme.mainLightTheme};
  }

  input:checked + label::after {
    left: calc(100% - 2px);
    transform: translateX(-100%);
    background-color: ${({theme}) => theme.white};
  }
`
export default ToggleSwitch;
