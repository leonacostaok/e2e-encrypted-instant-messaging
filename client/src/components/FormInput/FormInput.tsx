import React from 'react';
import {FormInputStyle} from "../FormGroup";
interface PropsTypeFormInput{
  placeholder:string;
  id: string;
  name:string;
  value:string;
  onChange: any;
}
const FormInput = ({onChange,...rest}:PropsTypeFormInput) => {
  return (
    <FormInputStyle type={'text'} onChange={onChange} autoComplete={'off'} {...rest}/>
  );
};

export default FormInput;
