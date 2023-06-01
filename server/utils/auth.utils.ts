import jwt from 'jsonwebtoken';

const TOKEN_SECRET = process.env.TOKEN_SECRET
  ? (process.env.TOKEN_SECRET as string)
  : '';
const EXPIRES_IN = parseInt(process.env.TOKEN_EXPIRATION_TIME ?? '900');

export const generateAuthToken = (clientId: string) => {
  return {
    jwtToken: jwt.sign({ clientId }, TOKEN_SECRET, {
      expiresIn: EXPIRES_IN,
    }),
    expTime: Math.floor(Date.now() / 1000) + EXPIRES_IN,
  };
};
