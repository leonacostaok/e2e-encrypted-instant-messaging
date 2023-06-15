import React, {useRef} from 'react';
import styled from "styled-components";
import {useOnClickOutside} from "../../hooks/useOnClickOutside";
import {Heading1} from "../Typhography";
import {BoxShadow} from "../BoxShadow";
interface PropsTypeModalActionChat{
  title?:string;
  onDismiss:() => void;
  visible:boolean;
  children:React.ReactNode;
}
const ModalChat = ({title,onDismiss,visible,children}:PropsTypeModalActionChat) => {
  const modalDialogNode = useRef<HTMLDivElement>()
  useOnClickOutside(modalDialogNode,onDismiss)
  return (
    <ModalBox>
      <ModalDialog ref={modalDialogNode as any}>
        <ModalContent>
          {
            title && <ModalHeader>
              <ModalTitle>{title}</ModalTitle>
            </ModalHeader>
          }
          <ModalBody>
            {children}
          </ModalBody>
        </ModalContent>
      </ModalDialog>
    </ModalBox>
  );
};
const ModalBox = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.bgModal};
  ${({theme}) => theme.flexRowCenter};
  z-index: 99;
`
const ModalDialog = styled(BoxShadow)`
  
`
const ModalContent = styled.div`
  min-width: 380px;
  min-height: 180px;
  padding: 24px;
  display: flex;
  flex-direction: column;
`
const ModalHeader = styled.div``
const ModalTitle = styled(Heading1)``
const ModalBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`
export default ModalChat;
