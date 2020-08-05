import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { PasswordHasherService } from 'src/password-hasher/password-hasher.service';

describe('Auth Controller', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [PasswordHasherService, UsersService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
