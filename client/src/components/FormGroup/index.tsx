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
  color: ${({theme}) => theme.mainTextLight};

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
