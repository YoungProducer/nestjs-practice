import { UserEntity } from '../entities/user.entity';

export type CreateUserData = Partial<
    Omit<UserEntity, 'id' | 'refreshTokens' | 'confirmationTokens' | 'verified'>
>;
