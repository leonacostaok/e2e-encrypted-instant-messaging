import { createServer } from 'http';
import staticHandler from 'serve-handler';
import * as ws from 'ws';
import { v4 } from 'uuid';
import { MessageTypes } from './messages/message-types';
import { BaseMessage, getMessage } from './messages/base.message';
import { AuthMessage } from './messages/auth.message';
import { challengeMessage } from './messages/challenge.message';
import { errorMessage } from './messages/error.message';
import * as crypto from 'crypto';
import { hashMessage, Message } from './messages/message';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const HDNode = require('hdkey');

const secret = v4();

//serve static folder
const server = createServer((req, res) => {
  // (1)
  return staticHandler(req, res, { public: 'public' });
});

const publicKeyToClient = new Map<string, ws.WebSocket>();

const wss = new ws.WebSocketServer({ server });

wss.on('connection', (client) => {
  const uniqueID = v4();
  let publicKey: string;

  const challenge = crypto
    .createHmac('sha256', secret)
    .update(uniqueID)
    .digest('hex');

  client.on('message', (jsonString) => {
    let message: BaseMessage<object>;

    try {
      message = JSON.parse(jsonString.toString());
    } catch (e) {
      sendError(ws, 'Wrong format', 404);

      return;
    }

    switch (message.type) {
      case MessageTypes.AUTH: {
        const authMessage = getMessage<AuthMessage>(message.payload);
        const verificationResult = HDNode.verify(
          authMessage.publicKey + challenge,
          authMessage.signature,
        );
        if (verificationResult) {
          publicKey = authMessage.publicKey;
          publicKeyToClient.set(publicKey, client);
        } else {
          client.close();
        }
        break;
      }
      case MessageTypes.MESSAGE: {
        const normalMessage = getMessage<Message>(message.payload);

        if (publicKey !== normalMessage.senderPublicKey) {
          publicKeyToClient.delete(publicKey);
          client.close();
          break;
        }
        const verificationResult = HDNode.verify(
          hashMessage(normalMessage),
          normalMessage.signature,
        );
        if (verificationResult) {
          // if client is connected, send message todo: check on channels, as they will have multiple recipients
          const client = publicKeyToClient.get(
            normalMessage.recipientPublicKey,
          );
          if (client) client.send(JSON.stringify(normalMessage));
          // TODO save in database
        } else {
          client.close();
        }
        break;
      }
    }
  });

  client.send(JSON.stringify(challengeMessage(challenge)));
});

server.listen(process.env.PORT ?? 9876, () => {
  console.log(`server listening...`);
});

const sendError = (ws, message, code) => {
  ws.send(JSON.stringify(errorMessage(message, code)));
};

setInterval(() => {
  wss.clients.forEach((ws) => {
    ws.ping(null, false, (err) => {
      if (err) ws.terminate();
    });
  });
}, 10000);
