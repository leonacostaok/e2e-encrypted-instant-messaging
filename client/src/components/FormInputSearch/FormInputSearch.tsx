import React from 'react';
import {FormInputStyle} from "../FormGroup";
import styled from "styled-components";
import {ReactComponent as IconSearch} from '../../assets/icons/icon-search-base.svg'
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
      <FormInputSearchCs type={'search'} onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleChange(e)} autoComplete={'off'} {...rest}/>
      <DivSearch>
        <IconSearch />
      </DivSearch>
    </FormInputSearchBox>
  );
};
const FormInputSearchBox = styled.div`
  position: relative;
`
const FormInputSearchCs = styled(FormInputStyle)`
  padding-left: 42px;
`
const DivSearch = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(calc(-50% + 2px));
`
export default FormInputSearch;
