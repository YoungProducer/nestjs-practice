import { UserDto } from '../dto/user.dto';

export type CreateUserData = Omit<UserDto, 'id'>;
