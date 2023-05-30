import React, { useContext, useState } from "react";
import styled from 'styled-components'
import { userProviderContext } from "../../providers/UserProvider";

enum LoginScreen {
  NORMAL,
  RECOVERING,
  SHOW_MNEMONIC,
  CONFIRM_MNEMONIC
}

const Login = () => {
  const {
    keyStoreExists,
    loginWithPassword,
    loginWithMnemonicAndPassword,
    error,
    resetError,
    isBackupConfirmed,
    confirmBackup
  } = useContext(userProviderContext)
  const [loginPassword, setLoginPassword] = useState('');
  const [loginMnemonic, setLoginMnemonic] = useState('');
  const [confirmMnemonic, setConfirmMnemonic] = useState('');
  const [loginScreen, setLoginScreen] = useState<LoginScreen>(LoginScreen.NORMAL);

  const handleChange = (event: any) => {
    setLoginPassword(event.target.value);
  };

  const handleMnemonicChange = (event: any) => {
    setLoginMnemonic(event.target.value);
  }

  const handleConfirmMnemonicChange = (event: any) => {
    setConfirmMnemonic(event.target.value);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const {result, mnemonic} = await loginWithPassword(loginPassword)
    if (result && mnemonic && !isBackupConfirmed) {
      setLoginMnemonic(mnemonic)
      setLoginScreen(LoginScreen.SHOW_MNEMONIC);
    }
  };

  const handleRecoverSubmit = async (e: any) => {
    e.preventDefault()
    await loginWithMnemonicAndPassword(loginMnemonic, loginPassword)
  };

  const handleContinueToConfirmation = (e:any) => {
    e.preventDefault()
    setLoginScreen(LoginScreen.CONFIRM_MNEMONIC)
  }

  const handleConfirmMnemonic = (e:any) => {
    e.preventDefault()
    if (loginMnemonic === confirmMnemonic) confirmBackup()
  }

  return (
    <LoginWrapper>
      {loginScreen === LoginScreen.NORMAL ? (
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <p>
            {keyStoreExists
              ? 'Enter your password to decode existing chat history'
              : 'Enter a password to create a new pair of keys'}
          </p>
          <Password placeholder='Password...' type="password" onChange={handleChange} />
          <ButtonSubmit type={'submit'}>Login</ButtonSubmit>
          <p>
            Or{' '}
            <span
              onClick={() => {
                setLoginScreen(LoginScreen.RECOVERING);
                resetError();
              }}
            >
              recover
            </span>{' '}
            from mnemonic backup.
          </p>

          {error && <ErrorMessage>{error}</ErrorMessage>}
        </form>
      ) : loginScreen === LoginScreen.RECOVERING ? (
        <form onSubmit={handleRecoverSubmit}>
          <h1>Recover from seed</h1>
          <p>
            Enter your 12 mnemonic words to recover your access and chat
            history.
          </p>
          <MnemonicInput placeholder='Mnemonic...' type="text" onChange={handleMnemonicChange} />
          <Password placeholder='Password...' type="password" onChange={handleChange} />
          <ButtonSubmit type={'submit'}>Recover</ButtonSubmit>
          <p>
            <span
              onClick={() => {
                setLoginScreen(LoginScreen.NORMAL);
                resetError();
              }}
            >
              Back to login
            </span>
          </p>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </form>
      ) : loginScreen === LoginScreen.SHOW_MNEMONIC ? (
        <form onSubmit={handleContinueToConfirmation}>
          <h1>Back-up your mnemonic</h1>
          <p>Please make sure you back up your mnemonic key so you can recover your account in the future.</p>
          <MnemonicInput id={'show-mnemonic'} value={loginMnemonic} type="text" readOnly={true} />
          <ButtonSubmit>Continue</ButtonSubmit>
        </form>
      ) : loginScreen === LoginScreen.CONFIRM_MNEMONIC && (
        <form onSubmit={handleConfirmMnemonic}>
          <h1>Confirm your mnemonic</h1>
          <p>Enter the 12 words you backed up to confirm your mnemonic.</p>
          <MnemonicInput id={'confirm-mnemonic'} type="text" defaultValue="" value={confirmMnemonic} onChange={handleConfirmMnemonicChange} />
          <ButtonSubmit>Confirm</ButtonSubmit>
          <p>
            <span onClick={() => setLoginScreen(LoginScreen.SHOW_MNEMONIC)}>
              Go back
            </span>{' '}
            to check again
          </p>
        </form>
      )}
    </LoginWrapper>
  );
}

export default Login

const LoginWrapper = styled.div`
  width: 400px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: auto;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.aquamarine};
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    p {
      text-align: center;
      padding: 0 15%;
      span {
        color: ${({ theme }) => theme.colors.darkGreen};
        &:hover {
          color: ${({ theme }) => theme.colors.lightGreen};
        }
      }
    }
  }
`

const Password = styled.input`
  width: 100%;
`

const MnemonicInput = styled.input`
  width: 100%;
`

const ButtonSubmit = styled.button`
  width: 100%;
`

const ErrorMessage = styled.p`
  color: red;
`
