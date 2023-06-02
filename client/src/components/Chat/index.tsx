import React, { useContext, useEffect, useState } from "react";
import styled from 'styled-components'
import useWebSocket from "react-use-websocket";
import { userProviderContext } from "../../providers/UserProvider";
import { authMessage } from "../../messages/auth.message";
import { MessageTypes } from "../../constants/message-types";
import { ChallengeMessage } from "../../messages/challenge.message";
import NavBar from "../NavBar";
import { AuthSuccessMessage } from "../../messages/auth-success.message";
import { getMessage } from "../../messages/base.message";
import { User } from "../../entities/User";

const Chat = () => {
  const { keyPair } = useContext(userProviderContext)
  const [user, setUser] = useState<User>()
  const [messageHistory, setMessageHistory] = useState<WebSocketEventMap['message'][]>([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(process.env.SERVER_URL ?? 'ws://localhost:9876');

  useEffect(() => {
    if (lastMessage !== null && keyPair) {
      setMessageHistory((prev) => prev.concat(lastMessage));
      const message = JSON.parse(lastMessage.data)
      let parsedMessage
      switch (message.type) {
        case MessageTypes.CHALLENGE:
          parsedMessage = getMessage<ChallengeMessage>(message)
          const signature = keyPair?.sign(Buffer.from(parsedMessage.challenge, "hex"))
          sendMessage(JSON.stringify(authMessage(keyPair?.publicExtendedKey, signature)))
          break
        case MessageTypes.AUTH_SUCCESS:
          parsedMessage = getMessage<AuthSuccessMessage>(message)
          setUser(parsedMessage.user)
          break
      }
    }
  }, [lastMessage, setMessageHistory]);

  return (
    <ChatContainer>
      <NavBar readyState={readyState} user={user} />
      <ChatContent>
        <ContactsSection>
          <p>Robert</p>
        </ContactsSection>
        <ChatSection>
          <h3>Last Message</h3>
          {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
          <br />
          <br />
          <h3>Message History</h3>
          <ul>
            {messageHistory.map((message, idx) => (
              <span key={idx}>{message ? message.data : null}</span>
            ))}
          </ul>
        </ChatSection>
      </ChatContent>
    </ChatContainer>
  )
}

export default Chat

const ChatContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  flex-direction: column;
  gap: 20px;
`

const ChatContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 20px;
  height: 100%;
  width: 100%;
`

const ContactsSection = styled.div`
  width: 300px;
  height: calc(90vh - 110px);
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.aquamarine};
`

const ChatSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: calc(100% - 300px);
  height: calc(90vh - 110px);
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.aquamarine};
  padding: 20px;
  ul {
    height: auto;
    width: 100%;
    overflow-y: scroll;
    overflow-x: scroll;
    span {
      width: 100%;
      word-wrap:break-word;
    }
  }
`
