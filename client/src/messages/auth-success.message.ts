import { User } from '@prisma/client';

export interface AuthSuccessMessage {
  user: User;
  jwtToken: string;
  expTime: number;
}
