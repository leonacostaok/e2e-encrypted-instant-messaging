import *as React from 'react';
import {useEffect, useMemo, useRef, useState} from 'react'
import styled from "styled-components";
interface PropsTypeToggleSwitch{
  enable?:boolean | undefined
}
const ToggleSwitch = ({enable}:PropsTypeToggleSwitch) => {
  const refInput = useRef<HTMLInputElement | null>(null)
  const statusToggle = useMemo(() => {
    return !!enable
  },[enable])
  const [isChecked,setIsChecked] = useState<boolean>(statusToggle)
  useEffect(() => {
    if(!refInput || !refInput.current){
      return
    }else{
      const domInput = refInput.current
      const domLabel = domInput?.nextElementSibling
      const handleClickLabel = () => {
        domInput?.click()
        setIsChecked(domInput?.checked)
      }
      domLabel?.addEventListener('click',handleClickLabel)
      return () => {
        domLabel?.removeEventListener('click',handleClickLabel)
      }
    }
  },[])
  return (
    <ToggleSwitchBox>
      <input type="checkbox" ref={refInput} defaultChecked={isChecked}/>
      <label>Toggle</label>
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
    background-color: ${({theme}) => theme.disabledEleLight};
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
