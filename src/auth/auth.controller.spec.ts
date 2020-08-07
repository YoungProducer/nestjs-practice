import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PasswordHasherModule } from 'src/password-hasher/password-hasher.module';
import { UsersModule } from 'src/users/users.module';

describe('Auth Controller', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      imports: [PasswordHasherModule, UsersModule],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
