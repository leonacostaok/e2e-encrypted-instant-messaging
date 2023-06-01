import { User } from '@prisma/client';
import { BaseMessage } from './base.message';
import { MessageTypes } from './message-types';

export interface AuthSuccessMessage {
  user: User;
  jwtToken: string;
  expTime: number;
}

export const authSuccessMessage = (
  user: User,
  jwtToken: string,
  expTime: number,
): BaseMessage<AuthSuccessMessage> => {
  return {
    type: MessageTypes.AUTH_SUCCESS,
    payload: { user, jwtToken, expTime },
  };
};
