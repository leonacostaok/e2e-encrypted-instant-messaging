import React, {useRef} from 'react';
import styled from "styled-components";
import {useOnClickOutside} from "../../hooks/useOnClickOutside";
import {TextLarge} from "../Typhography";
import {BoxShadow} from "../BoxShadow";
import {ReactComponent as IconClear} from "../../assets/icons/icon-exit.svg";

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
              <IconClear onClick={onDismiss}/>
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
  max-height: calc(100vh - 100px);
  padding: 24px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: ${({theme}) => theme.white};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({theme}) => theme.mainLightTheme};
    border: 2px solid ${({theme}) => theme.white};
    height: 20px;
  }
`
const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 24px;
  svg{
    cursor: pointer;
    width: 24px;
    height: 24px;
    margin-left: auto;
  }
`
const ModalTitle = styled(TextLarge)``
const ModalBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`
export default ModalChat;
