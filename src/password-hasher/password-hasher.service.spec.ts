import { Test, TestingModule } from '@nestjs/testing';

import { PasswordHasherService } from './password-hasher.service';

describe('PasswordHasherService', () => {
  let service: PasswordHasherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordHasherService],
    }).compile();

    service = module.get<PasswordHasherService>(PasswordHasherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should hash password', async () => {
    const initialPassword = '1234';
    const hashedPassword = await service.hashPassword(initialPassword);

    expect(initialPassword).not.toBe(hashedPassword);
  });

  it('password should matches if provided password is correct', async () => {
    const initialPassword = '1234';
    const hashedPassword = await service.hashPassword(initialPassword);
    const isMatched = await service.comparePasswords({
      providedPass: '1234',
      storedPass: hashedPassword,
    });

    expect(isMatched).toBeTruthy();
  });

  it (`password shouldn't mastches if provided password is incorrect`, async () => {
    const initialPassword = '1234';
    const hashedPassword = await service.hashPassword(initialPassword);
    const isMatched = await service.comparePasswords({
      providedPass: '12345',
      storedPass: hashedPassword,
    });

    expect(isMatched).toBeFalsy();
  });
});
