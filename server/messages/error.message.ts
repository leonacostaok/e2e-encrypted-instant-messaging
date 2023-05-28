import { BaseMessage } from './base.message';
import { MessageTypes } from './message-types';

export interface ErrorMessage {
  message: string;
  code: number;
}

export const errorMessage = (
  message: string,
  code: number,
): BaseMessage<ErrorMessage> => {
  return {
    type: MessageTypes.ERROR,
    payload: { message, code },
  };
};
