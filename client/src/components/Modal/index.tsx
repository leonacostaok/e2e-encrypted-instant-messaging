import React, { useRef } from "react";
import styled from 'styled-components'
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

interface ModalProps { isOpen: boolean; onDismiss: () => void;children: React.ReactNode }

const Modal = ({ isOpen, onDismiss, children }: ModalProps) => {
  const modalNode = useRef<HTMLDivElement>()

  useOnClickOutside(modalNode, onDismiss)

  return isOpen ? (
    <ModalBackground>
      <ModalContainer ref={modalNode as any}>
        {children}
      </ModalContainer>
    </ModalBackground>
  ) : <></>
};

export default Modal

const ModalBackground = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.colors.modalDarkGreen};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const ModalContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.aquamarine};
  padding: 20px;
  border-radius: 10px;
`
