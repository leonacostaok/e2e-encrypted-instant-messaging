import React, { useContext, useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "./styles/global";
import { useCookies } from "react-cookie";
import UserProvider, { userProviderContext } from "./providers/UserProvider";
import Login from "./components/Login";

function App() {
  const [cookie, setCookie] = useCookies(['darkMode'])
  const [darkMode, setDarkMode] = useState(Boolean(cookie.darkMode))
  const { keyPair } = useContext(userProviderContext)

  const changeTheme = () => {
    setCookie('darkMode', !darkMode)
    setDarkMode(!darkMode)
  }

  useEffect(() => {
    console.log('keypair is changing to', keyPair);
  }, [keyPair])

  return (
    <ThemeProvider theme={theme(darkMode)}>
      <UserProvider>
        <AppContainer>
          <ScreenContainer>
            { keyPair ? (
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
      </UserProvider>
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
  background: #e1fff3;
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
  background: white;
`

const ContactsSection = styled.div`
  width: 300px;
  height: 100%;
  border-radius: 10px;
  background: #e1fff3;
`

const ChatSection = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background: #e1fff3;
`