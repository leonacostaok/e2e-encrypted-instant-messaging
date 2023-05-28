import { MessageTypes } from './message-types';

export interface BaseMessage<T> {
  type: MessageTypes;
  payload: T;
}

export const getMessage = <T>(payload: object): T => {
  const message = payload as T;
  if (message) return message;
  else
    throw new Error(
      'Payload cannot be casted to this type of message. Probably wrong format.',
    );
};
