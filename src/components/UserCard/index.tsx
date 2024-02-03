import React from 'react'
import styled from 'styled-components'
import {UserType} from '../../entities/UserType'

interface UserCardProps {
    user?: UserType
}

const UserCard = ({user}: UserCardProps) => {
    return (
        <UserCardContainer>
            <div>
                <img src={user?.image ?? undefined} alt={user?.alias ?? ''}/>
            </div>
            <div>
                <p>@{user?.alias}</p>
                <p>{user?.phoneNumber}</p>
            </div>
        </UserCardContainer>
    )
}

export default UserCard

const UserCardContainer = styled.div`
  width: 100%;
  height: 30px;
  border-radius: 10px;
  background: ${({theme}) => theme.aquamarine};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
