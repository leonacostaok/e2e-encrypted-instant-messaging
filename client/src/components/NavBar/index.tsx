import React from "react";
import styled from 'styled-components'
import { ReadyState } from "react-use-websocket";

interface NavBarProps {
  readyState: ReadyState
}
const NavBar = ({readyState}: NavBarProps) => {

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return (
    <NavBarContainer>
      <p>Robert</p>
      <span>The WebSocket is currently {connectionStatus}</span>
    </NavBarContainer>
  )
}

export default NavBar

const NavBarContainer = styled.div`
  width: 100%;
  height: 70px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
