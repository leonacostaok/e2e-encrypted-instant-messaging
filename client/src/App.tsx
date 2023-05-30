import React, { useContext, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "./styles/global";
import { useCookies } from "react-cookie";
import { userProviderContext } from "./providers/UserProvider";
import Login from "./components/Login";

function App() {
  const [cookie, setCookie] = useCookies(['darkMode'])
  const [darkMode, setDarkMode] = useState(Boolean(cookie.darkMode))
  const { keyPair, isBackupConfirmed } = useContext(userProviderContext)

  const changeTheme = () => {
    setCookie('darkMode', !darkMode)
    setDarkMode(!darkMode)
  }

  return (
    <ThemeProvider theme={theme(darkMode)}>
      <AppContainer>
        <ScreenContainer>
          { keyPair && isBackupConfirmed ? (
            <>
              <ContactsSection>
                <p>Robert</p>
              </ContactsSection>
              <ChatSection>
                <p>Robert</p>
              </ChatSection>
            </>
          ) : (
            <Login />
          )}
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

const ContactsSection = styled.div`
  width: 300px;
  height: 100%;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.aquamarine};
`

const ChatSection = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.aquamarine};
`
