import React from 'react';
import {FormInputStyle} from "../FormGroup";
import styled from "styled-components";
import {ReactComponent as IconSearch} from '../../assets/icons/icon-search-base.svg'
import IconClearSearch from '../../assets/icons/icon-clear-search.svg';
interface PropsTypeFormInput{
  placeholder:string;
  id: string;
  name:string;
  value:string;
  onChange?: (valueSearch:string) => void;
}
const FormInputSearch = ({onChange,...rest}:PropsTypeFormInput) => {
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    e.preventDefault();
    if(onChange){
      onChange(e.currentTarget.value)
    }
  }
  return (
    <FormInputSearchBox>
      <FormInputSearchCs type={'search'} onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleChange(e)} autoComplete={'off'} {...rest} iconClear={IconClearSearch}/>
      <DivSearch>
        <IconSearch />
      </DivSearch>
    </FormInputSearchBox>
  );
};
const FormInputSearchBox = styled.div`
  position: relative;
`
const FormInputSearchCs = styled(FormInputStyle)<{iconClear:string}>`
  padding-left: 42px;
  ::-webkit-search-cancel-button {
    -webkit-appearance: none;
    height: 20px;
    width: 20px;
    background-repeat: no-repeat;
    background-size: contain;
    background-image: url(${(props) => props.iconClear});
    cursor: pointer;
  }
`
const DivSearch = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(calc(-50% + 2px));
`
export default FormInputSearch;
