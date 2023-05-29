import React, { useContext, useState } from "react";
import styled from 'styled-components'
import { userProviderContext } from "../../providers/UserProvider";

const Login = () => {
  const { keyStoreExists, setPassword } = useContext(userProviderContext)
  const [loginPassword, setLoginPassword] = useState('');

  const handleChange = (event: any) => {
    setLoginPassword(event.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setPassword(loginPassword)
  };
  return (
    <LoginWrapper>
      <form onSubmit={handleSubmit}>
        <h1>Login Form</h1>
        <p>{keyStoreExists ? 'Enter your password to decode existing chat history': 'Enter a password to create a new pair of keys'}</p>
        <Password type="password" onChange={handleChange} />
        <ButtonSubmit type={"submit"}>Enter</ButtonSubmit>
      </form>
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
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
`

const Password = styled.input`
  width: 100%;
`

const ButtonSubmit = styled.button`
  width: 100%;
`
