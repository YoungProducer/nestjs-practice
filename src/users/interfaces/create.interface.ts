import { User } from './user.interface';

export type CreateUser = Omit<User, 'id'>;
