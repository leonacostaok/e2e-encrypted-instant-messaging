import React, { useContext, useEffect, useState } from "react";
import styled from 'styled-components'
import useWebSocket, { ReadyState } from "react-use-websocket";
import { userProviderContext } from "../../providers/UserProvider";
import { authMessage } from "../../messages/auth.message";
import { MessageTypes } from "../../constants/message-types";
import { ChallengeMessage } from "../../../../server/messages/challenge.message";

const Chat = () => {
  const { keyPair } = useContext(userProviderContext)
  const [messageHistory, setMessageHistory] = useState<WebSocketEventMap['message'][]>([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(process.env.SERVER_URL ?? 'ws://localhost:9876');

  useEffect(() => {
    if (lastMessage !== null && keyPair) {
      setMessageHistory((prev) => prev.concat(lastMessage));
      const message = JSON.parse(lastMessage.data)
      if (message.type === MessageTypes.CHALLENGE) {
        const parsedMessage = message.payload as ChallengeMessage
        const signature = keyPair?.sign(Buffer.from(parsedMessage.challenge, "hex"))
        sendMessage(JSON.stringify(authMessage(keyPair?.publicExtendedKey, signature)))
      }
    }
  }, [lastMessage, setMessageHistory]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return (
    <>
      <ContactsSection>
        <p>Robert</p>
      </ContactsSection>
      <ChatSection>
        <div>
          <span>The WebSocket is currently {connectionStatus}</span>
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
        </div>
      </ChatSection>
    </>
  )
}

export default Chat

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
