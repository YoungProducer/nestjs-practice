import { Exclude, Expose, Type } from 'class-transformer';
import { UserDto } from 'src/users/dto/user.dto';

@Exclude()
export class LoginResponseDto {
    @Expose()
    @Type(() => UserDto)
    user: UserDto;
}
