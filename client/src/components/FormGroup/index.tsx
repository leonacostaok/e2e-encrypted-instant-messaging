import styled from "styled-components";
import {LabelLarge} from "../Typhography";

export const FormLabel = styled(LabelLarge)`
  letter-spacing: 0.25px;
`
export const FormInput = styled.input`
  outline: none;
  padding: 10px 16px;
  border: 1px solid ${({theme}) => theme.incomingBg};
  border-radius: 4px;
  
  font-size: ${({theme}) => theme.fontSizeText2};
  line-height: 1.5;
  letter-spacing: 0.15px;
  color: ${({theme}) => theme.secondaryText};

  ::-webkit-input-placeholder {
    color: ${({theme}) => theme.secondaryText};
  }

  :-ms-input-placeholder { 
    color: ${({theme}) => theme.secondaryText};
  }

  ::placeholder {
    color: ${({theme}) => theme.secondaryText};
  }
`
