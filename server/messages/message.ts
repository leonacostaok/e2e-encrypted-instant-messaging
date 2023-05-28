import * as crypto from 'crypto';

export interface Message {
  id: string;
  senderPublicKey: string;
  recipientPublicKey: string;
  encryptedMessage: string;
  creationTime: number;
  signature: string;
}

export const hashMessage = (message: Message) => {
  const hash = crypto.createHash('sha256');
  hash.update(
    message.id +
      message.senderPublicKey +
      message.recipientPublicKey +
      message.encryptedMessage +
      message.creationTime,
  );
  return hash.digest('hex');
};
