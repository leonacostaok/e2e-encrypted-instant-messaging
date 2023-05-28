import { BaseMessage } from './base.message';
import { MessageTypes } from './message-types';

export interface ChallengeMessage {
  challenge: string;
}

export const challengeMessage = (challenge: string): BaseMessage => {
  return {
    type: MessageTypes.CHALLENGE,
    payload: { challenge },
  };
};
