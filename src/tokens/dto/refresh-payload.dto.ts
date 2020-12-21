import { IsNotEmpty, IsString } from 'class-validator';

    export class RefreshPayloadDto {
        @IsString()
        @IsNotEmpty()
        refreshToken: string;
    }
