import { BaseMessage } from "./base.message";
import { MessageTypes } from "../constants/message-types";

export interface AuthMessage {
  publicKey: string;
  signature: Buffer;
}

export const authMessage = (
  publicKey: string,
  signature: Buffer
): BaseMessage<AuthMessage> => {
  return {
    type: MessageTypes.AUTH,
    payload: { publicKey, signature },
  };
};
