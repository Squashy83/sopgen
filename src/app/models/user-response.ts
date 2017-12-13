import { User } from './../_interfaces/user';

export class UserResponse {
    success: boolean;
    message: string;
    user: User;
}