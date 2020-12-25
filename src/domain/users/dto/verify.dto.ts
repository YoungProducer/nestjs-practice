import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

@Exclude()
export class VerifyDto {
    @Expose()
    @IsString()
    @IsNotEmpty()
    token: string;
}
