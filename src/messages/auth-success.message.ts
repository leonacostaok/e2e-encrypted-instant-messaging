import {UserType} from "../entities/UserType";

export interface AuthSuccessMessage {
    user: UserType;
    jwtToken: string;
    expTime: number;
}
