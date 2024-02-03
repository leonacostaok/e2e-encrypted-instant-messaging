import React from 'react';
import {ButtonPrimary, ButtonSecondary} from "../Button";
import ModalChat from "../ModalChat";
import styled from "styled-components";
import {TextLarge} from "../Typhography";
interface PropsTypeModalLogout{
  onDismiss:() => void;
  visible:boolean;
  onLogout:() => void;
}
const ModalLogout = ({onDismiss,visible,onLogout}:PropsTypeModalLogout) => {
  return (
    <ModalChat onDismiss={onDismiss} visible={visible}>
      <ModalChild>
        <Question>
          Are you sure you want to logout?
        </Question>
        <ModalFooter>
          <ButtonPrimary onClick={() => onDismiss()}>Cancel</ButtonPrimary>
          <ButtonSecondary onClick={() => onLogout()}>Logout</ButtonSecondary>
        </ModalFooter>
      </ModalChild>
    </ModalChat>
  );
};
const ModalChild = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  flex: 1;
`
const Question = styled(TextLarge)`
  color: ${({theme}) => theme.mainTextLight};
`
const ModalFooter = styled.div`
  ${({theme}) => theme.flexRowCenterVertical};
  gap: 8px;
  justify-content: flex-end;
  margin-top: auto;
`
export default ModalLogout;
