import { Secret, VerifyOptions } from 'jsonwebtoken';
import { UserDto } from 'src/users/dto/user.dto';

export type VerifyType = <R = UserDto>(
    token: string,
    secret: Secret,
    options?: VerifyOptions,
) => Promise<R>;
