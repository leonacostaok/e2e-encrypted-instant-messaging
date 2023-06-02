import { MessageTypes } from '../constants/message-types';
export interface BaseMessage<T> {
  type: MessageTypes;
  payload: T;
  authToken?: string;
}

export const getMessage = <T>(baseMessage:{ payload: object }): T => {
  const message = baseMessage.payload as T;
  if (message) return message;
  else
    throw new Error(
      'Payload cannot be casted to this type of message. Probably wrong format.',
    );
};
