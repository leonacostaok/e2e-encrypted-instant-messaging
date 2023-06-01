import React, { useContext, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "./styles/global";
import { userProviderContext } from "./providers/UserProvider";
import Login from "./components/Login";
import Chat from "./components/Chat";

function App() {
  const [darkMode, setDarkMode] = useState(Boolean(localStorage.getItem('darkMode')))
  const { keyPair, isBackupConfirmed } = useContext(userProviderContext)

  const changeTheme = () => {
    localStorage.setItem('darkMode', darkMode ? 'false' : 'true')
    setDarkMode(!darkMode)
  }

  return (
    <ThemeProvider theme={theme(darkMode)}>
      <AppContainer>
        <ScreenContainer>
          { keyPair && isBackupConfirmed ? <Chat /> : <Login /> }
        </ScreenContainer>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.aquamarine};
`

const ScreenContainer = styled.div`
  width: 95%;
  height: 95%;
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 20px;
  gap: 20px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.white};
`
