import { v4 } from 'uuid'
import { MessageTypes } from './messages/message-types'
import { BaseMessage, getMessage } from './messages/base.message'
import { AuthMessage } from './messages/auth.message'
import { challengeMessage } from './messages/challenge.message'
import { errorMessage } from './messages/error.message'
import * as crypto from 'crypto'
import { hashMessage, Message } from './messages/message'
import prisma from './common/prisma.service'
import { generateAuthToken } from './utils/auth.utils'
import { authSuccessMessage } from './messages/auth-success.message'
import { WebSocket } from 'ws'
import userRouter from './routes/user.routes'
import mediasRouters from './routes/medias.routers'
import * as path from 'path'
const express = require('express')
const ws = require('ws')

// eslint-disable-next-line @typescript-eslint/no-var-requires
const HDNode = require('hdkey')

const secret = v4()

const app = express()

//serve static folder
const wss = new ws.Server({ noServer: true })

app.use(express.json())
app.use('/user', userRouter)
app.use('/medias', mediasRouters)
//tao static url upload
app.use('/medias', express.static(path.resolve('upload/temp')))
// `server` is a vanilla Node.js HTTP server, so use
// the same ws upgrade process described here:
// https://www.npmjs.com/package/ws#multiple-servers-sharing-a-single-https-server
const server = app.listen(process.env.PORT ?? 9876, () => {
  console.log(`server listening...`)
})
//initial folder upload
//initFolder()
server.on('upgrade', (request: any, socket: any, head: any) => {
  wss.handleUpgrade(request, socket, head, (socket: any) => {
    wss.emit('connection', socket, request)
  })
})
const publicKeyToClient = new Map<string, WebSocket>()
const clientToPublicKey = new Map<WebSocket, string>()

wss.on('connection', (client: WebSocket) => {
  const uniqueID = v4()
  let publicKey: string

  const challenge = crypto.createHmac('sha256', secret).update(uniqueID).digest('hex')

  client.on('message', (jsonString: any) => {
    let message: BaseMessage<object>

    try {
      message = JSON.parse(jsonString)
    } catch (e) {
      sendError(client, 'Wrong format', 404)

      return
    }

    switch (message.type) {
      case MessageTypes.AUTH: {
        const authMessage = getMessage<AuthMessage>(message.payload)
        const HDKey = HDNode.fromExtendedKey(authMessage.publicKey)
        // const verificationResult = HDKey.verify(
        //   Buffer.from(challenge, 'hex'),
        //   (authMessage.signature as any).data as Uint8Array
        // )
        const verificationResult = HDKey.verify(Buffer.from(challenge, 'hex'), (authMessage.signature as any).data)
        if (verificationResult) {
          publicKey = authMessage.publicKey
          publicKeyToClient.set(publicKey, client)
          clientToPublicKey.set(client, publicKey)
          prisma.user.findFirst({ where: { publicKey } }).then((user) => {
            const { jwtToken, expTime } = generateAuthToken(uniqueID)
            if (user) {
              client.send(JSON.stringify(authSuccessMessage(user, jwtToken, expTime)))
            } else {
              prisma.user
                .create({
                  data: {
                    publicKey
                  }
                })
                .then((user) => {
                  client.send(JSON.stringify(authSuccessMessage(user, jwtToken, expTime)))
                })
            }
          })
        } else {
          client.close()
        }
        break
      }
      case MessageTypes.MESSAGE: {
        const normalMessage = getMessage<Message>(message.payload)

        if (publicKey !== normalMessage.senderPublicKey) {
          publicKeyToClient.delete(publicKey)
          client.close()
          break
        }
        const verificationResult = HDNode.verify(hashMessage(normalMessage), normalMessage.signature)
        if (verificationResult) {
          // if client is connected, send message todo: check on channels, as they will have multiple recipients
          const client = publicKeyToClient.get(normalMessage.recipientPublicKey)
          if (client) client.send(JSON.stringify(normalMessage))
          // TODO save in database
        } else {
          client.close()
        }
        break
      }
    }
  })

  client.on('close', () => {
    publicKeyToClient.delete('publicKey')
    clientToPublicKey.delete(client)
  })

  client.send(JSON.stringify(challengeMessage(challenge)))
})

const sendError = (ws: any, message: string, code: number) => {
  ws.send(JSON.stringify(errorMessage(message, code)))
}

setInterval(() => {
  wss.clients.forEach((ws: WebSocket) => {
    ws.ping(null, false, (err: any) => {
      if (err) {
        ws.terminate()
        publicKeyToClient.delete(clientToPublicKey.get(ws))
        clientToPublicKey.delete(ws)
      }
    })
  })
}, 10000)

// const createCategory = await prisma.post.create({
//   data: {
//     title: 'How to be Bob',
//     categories: {
//       create: [
//         {
//           assignedBy: 'Bob',
//           assignedAt: new Date(),
//           category: {
//             create: {
//               name: 'New category',
//             },
//           },
//         },
//       ],
//     },
//   },
// })
