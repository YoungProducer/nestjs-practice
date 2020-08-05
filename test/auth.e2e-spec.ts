import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from 'src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('/auth/signup (POST)', () => {
    it(`should throw error if all properties don't provided in request body`, async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/signup');

      expect(res.status).toBe(400);
      expect(res.body.message).toContain('Name is missed in request body!');
      expect(res.body.message).toContain('Email is missed in request body!');
      expect(res.body.message).toContain('Password is missed in request body!');
    });

    it(`should return status 201 if all properties are valid`, () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          name: 'foo',
          email: 'bar@gmail.com',
          password: '111',
        })
        .expect(201);
    });

    it('should return error if name and email missed in request body', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          password: '1111',
        })
        .expect(400);
    });
  });

  describe('/auth/signin (POST)', () => {
    it('should return user profile if all credentials are valid', async () => {
      const name = 'foo';
      const email = 'bar@gmail.com';
      const password = '1111';

      await request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          name,
          email,
          password,
        });

      return request(app.getHttpServer())
        .post('/auth/signin')
        .send({
          name,
          email,
          password,
        })
        .expect(200)
        .expect({
          name,
          email,
        });
    });
  });
});
