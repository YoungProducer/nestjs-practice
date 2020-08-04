import { Module } from '@nestjs/common';

import { PasswordHasherService } from './password-hasher.service';

@Module({
    providers: [PasswordHasherService],
    exports: [PasswordHasherService],
})
export class PasswordHasherModule {}
