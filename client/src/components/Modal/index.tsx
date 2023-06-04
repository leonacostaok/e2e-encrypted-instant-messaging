import React, { useRef } from "react";
import styled from 'styled-components'
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

interface ModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  children: React.ReactNode;
  title?: string;
}

const Modal = ({ isOpen, onDismiss, children, title }: ModalProps) => {
  const modalNode = useRef<HTMLDivElement>()

  useOnClickOutside(modalNode, onDismiss)

  return isOpen ? (
    <ModalBackground>
      <ModalContainer ref={modalNode as any}>
        <ModalHeader isTitle={!!title}>
          {title && <ModalTitle>{title}</ModalTitle>}
          <p onClick={onDismiss}>x</p>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
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
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: ${({ theme }) => theme.colors.white};
  padding: 10px;
  border-radius: 10px;
  min-width: 300px;
  min-height: 200px;
`

const ModalHeader = styled.div<{ isTitle: boolean }>`
  display: flex;
  flex-direction: row;
  background: ${({ theme }) => theme.colors.aquamarine};
  padding: 5px 10px;
  border-radius: 5px;
  justify-content: ${({ isTitle }) => isTitle ? 'space-between' : 'flex-end'};
  align-items: center;
  width: 100%;
  p {
    &:hover {
      font-size: 16px;
      font-weight: 700;
    }
  }
`;

const ModalTitle = styled.div`
  color: ${({ theme }) => theme.colors.black};
  font-size: 16px;
  font-weight: 700;
`

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.aquamarine};
  padding: 5px 10px;
  border-radius: 5px;
  gap: 10px;
`
