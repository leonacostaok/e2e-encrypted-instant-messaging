import React from "react";
import styled from 'styled-components'
import { User } from "../../entities/User";

interface UserCardProps {
  user?: User
}

const UserCard = ({user}: UserCardProps) => {
  return (
    <UserCardContainer>
      <img src={user?.image ?? undefined} alt={user?.alias ?? ''} />
      <p>@{user?.alias}</p>
      <p>{user?.phoneNumber}</p>
    </UserCardContainer>
  )
}

export default UserCard

const UserCardContainer = styled.div`
  width: 100%;
  height: 30px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.aquamarine};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
