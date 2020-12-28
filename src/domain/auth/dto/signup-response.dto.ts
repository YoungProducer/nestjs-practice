import { Exclude, Expose, Type } from 'class-transformer';
import { UserDto } from 'src/domain/users/dto';

@Exclude()
export class SignUpResponseDto {
    @Expose()
    @Type(() => UserDto)
    user: UserDto;
}
