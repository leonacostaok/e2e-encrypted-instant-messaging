import React from "react";
import styled from 'styled-components'
import { ReadyState } from "react-use-websocket";
import { User } from "../../entities/User";
import UserCard from "../UserCard";

interface NavBarProps {
  readyState: ReadyState
  user?: User
  setIsEditingProfile: (isEditingProfile: boolean) => void
}
const NavBar = ({setIsEditingProfile, user, readyState}: NavBarProps) => {

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return (
    <NavBarContainer>
      <UserCard user={user} />
      <EditProfileButton onClick={() => setIsEditingProfile(true)} >
        Edit profile
      </EditProfileButton>
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

const EditProfileButton = styled.span`
  color: ${({ theme }) => theme.colors.darkGreen};
  &:hover {
    color: ${({ theme }) => theme.colors.modalDarkGreen};
  }
`
