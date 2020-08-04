import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from 'src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/signup (POST) should return error if name and email missed in request body', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        password: '1111',
      })
      .expect(400);
  });

  it ('/auth/signin (POST) with correct data should return 200', async () => {
    await request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        name: 'foo',
        email: 'bar',
        password: '1111',
      });

    return request(app.getHttpServer())
      .post('/auth/signin')
      .send({
        email: 'bar',
        password: '1111',
      })
      .expect(200)
      .expect('Successfully logged in!');
  });

  it ('/auth/signin (POST) with invalid password should return 401', async () => {
    await request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        name: 'foo',
        email: 'bar',
        password: '1111',
      });

    return request(app.getHttpServer())
      .post('/auth/signin')
      .send({
        email: 'bar',
        password: '111',
      })
      .expect({
        statusCode: 401,
        message: "Wrong password!",
        error: "Unauthorized",
      });
  });
});
