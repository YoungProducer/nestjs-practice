import { User } from './user.interface';

export type UserProfile = Omit<User, 'password'>;
