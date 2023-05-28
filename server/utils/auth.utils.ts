import jwt from 'jsonwebtoken';
import { AuthSuccessMessage } from '../messages/auth-success.message';

const TOKEN_SECRET = process.env.TOKEN_SECRET
  ? (process.env.TOKEN_SECRET as string)
  : '';
const EXPIRES_IN = process.env.TOKEN_EXPIRATION_TIME as string;

export const generateAuthToken = (clientId: string): AuthSuccessMessage => {
  return {
    jwtToken: jwt.sign({ clientId }, TOKEN_SECRET, {
      expiresIn: EXPIRES_IN,
    }),
    expTime: Date.now() + parseInt(EXPIRES_IN),
  };
};
