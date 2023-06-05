import { User } from "../entities/User";

export interface AuthSuccessMessage {
  user: User;
  jwtToken: string;
  expTime: number;
}
