import styled from "styled-components";

import React, {useState} from 'react';
import Select, {SingleValue} from "react-select";
import {OptionType} from "../../types/optionSelect.type";
interface PropsTypeSelectSingleCs{
  options:OptionType[]
  initialSelected?:OptionType
  setFieldValue?: any
  nameField?:string
}
const SelectSingleCs = ({options,initialSelected,setFieldValue,nameField}:PropsTypeSelectSingleCs) => {
  const [selectedOptions, setSelectedOptions] = useState<SingleValue<OptionType>>(() =>initialSelected ? initialSelected : options[0])
  const handleChangeSelectedOption = (option:SingleValue<OptionType>)=> {
    setSelectedOptions(option)
    if(setFieldValue){
      setFieldValue(nameField,option)
    }
  }
  return (
    <SelectSingleBox>
      <Select
        classNamePrefix={'select-cs2-pre'}
        className={'select-cs2'}
        onChange={handleChangeSelectedOption}
        value={options ? options.find(option => option.value === initialSelected?.value) : selectedOptions}
        isSearchable={false}
        closeMenuOnSelect={true}
        hideSelectedOptions={false}
        options={options}
      />
    </SelectSingleBox>
  );
};

export default SelectSingleCs;
const SelectSingleBox = styled.div`
  .select-cs2{
    ::-webkit-scrollbar {
      width: 4px;
    }
    ::-webkit-scrollbar-track {
      background-color: black;
      width: 4px;
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb {
      background-color: black;
      width: 4px;
      border-radius: 4px;
    }
  }
  .select-cs2-pre{
    &__input-container{
      margin: 0;
    }
    &__option{
      padding: 6px 16px;
      color: ${({theme}) => theme.mainTextLight};
      &:active{
        background-color: transparent;
      }
    }
    &__menu{
      box-shadow: none;
      margin: 0;
      width: 188px;
      right: 0;
    }
    &__menu-list{
      border-radius: 8px;
      background-color:white;
      margin-top: 8px;
      margin-bottom: 8px;
      box-shadow: 0 8px 10px rgba(0, 0, 0, 0.12), 0 3px 14px rgba(0, 0, 0, 0.08), 0 3px 5px rgba(0, 0, 0, 0.04);
    }
    &__control {
      cursor: pointer !important;
      border: none;
      box-shadow: none;
      min-height: 24px;
      height: 24px;
      border-radius: 0;
      &--is-focused{
        box-shadow: none;
      }
    }

    &__value-container {
      display: flex !important;
      justify-content: flex-end;
      padding-left: 4px;
      padding-right: 4px;
      &--has-value{
        color: ${({theme}) => theme.mainDark};
        padding: 0;
      }
    }

    &__clear-indicator {
      display: none !important;
    }

    &__single-value{
      color:${({theme}) =>theme.caption};
      font-size: ${({theme}) => theme.fontSizeText3};
      line-height: 1.428;
      input{
        display: none;
      }
    }
    &__option{
      color: ${({theme}) => theme.mainTextLight};
      background-color: transparent;
      font-size: ${({theme}) => theme.fontSizeText3};
      line-height: 1.428;
      cursor: pointer;
    }
    &__option--is-focused{
      background-color: ${({theme}) => theme.mainLight};
    }
    &__option--is-selected{
      background-color: ${({theme}) => theme.mainLight};
      color: ${({theme}) => theme.mainDark};
    }
    &__indicator-separator{
      display: none;
    }
    &__dropdown-indicator{
      padding:4px;
    }
  }
`
