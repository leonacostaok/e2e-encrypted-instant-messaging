import React, { useContext } from "react";
import styled from 'styled-components'
import { userProviderContext } from "../../providers/UserProvider";

const Login = () => {
  const { keyStoreExists } = useContext(userProviderContext)
  return (
    <LoginWrapper>
      <h2>{keyStoreExists ? 'Enter your password to decode existing chat history': 'Enter a password to create a new pair of keys'}</h2>
      <Password type="password" />
      <ButtonSubmit>Enter</ButtonSubmit>
    </LoginWrapper>
  )
}

export default Login

const LoginWrapper = styled.div`
  width: 400px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  border-radius: 10px;
  background: #e1fff3;
`

const Password = styled.input`
  width: 100%;
`

const ButtonSubmit = styled.button`
  width: 100%;
`
