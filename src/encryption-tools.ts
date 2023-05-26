import { AES, SHA1, enc } from 'crypto-js';

export const sha1 = (content: string): string => {
  return SHA1(content).toString();
};

// Namespace encode
export const aes = {
  decrypt: (message: string, key: string) => {
    return AES.decrypt(message, key).toString(enc.Utf8);
  },
  encrypt: (message: string, key: string) => {
    return AES.encrypt(message, key).toString();
  },
};

// createChannel - creates private key for a channel, receiving a list of public keys as recipients, encrypts the private key for all recipients and returns that in a list
// createMessage - receives channel and message as parameter, encrypts message with channel public key
// readMessage - receives channel and encrypted message as parameter, decrypts message with channel private key
