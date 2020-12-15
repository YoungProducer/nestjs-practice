import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as request from 'supertest';

import { AppModule } from 'src/app.module';
import { UserEntity } from 'src/entities/user.entity';

describe('AuthController (e2e)', () => {
    let app: INestApplication;
    let usersRepo: Repository<UserEntity>;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        usersRepo = moduleFixture.get<Repository<UserEntity>>(
            getRepositoryToken(UserEntity),
        );
        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();
    });

    afterEach(async () => {
        await usersRepo.query('DELETE FROM users');
    });

    describe('/auth/signup (POST)', () => {
        it(`should throw error if all properties don't provided in request body`, async () => {
            const res = await request(app.getHttpServer()).post('/auth/signup');

            expect(res.status).toBe(400);
            expect(res.body.message).toContain(
                'Name is missed in request body!',
            );
            expect(res.body.message).toContain(
                'Email is missed in request body!',
            );
            expect(res.body.message).toContain(
                'Password is missed in request body!',
            );
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

            const response = await request(app.getHttpServer())
                .post('/auth/signin')
                .send({
                    name,
                    email,
                    password,
                });

            expect(response.status).toBe(200);

            expect(response.body.user).toHaveProperty('id');
            expect(response.body).toEqual({
                user: expect.objectContaining({
                    name,
                    email,
                }),
                accessToken: expect.stringContaining('Bearer '),
            });
        });

        it('should return user without private props', async () => {
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

            const response = await request(app.getHttpServer())
                .post('/auth/signin')
                .send({
                    name,
                    email,
                    password,
                });

            const user = response.body.user;

            expect(response.status).toBe(200);

            expect(user).toHaveProperty('id');
            expect(user).toHaveProperty('email');
            expect(user).toHaveProperty('name');

            expect(user).not.toHaveProperty('hash');
            expect(user).not.toHaveProperty('salt');
        });
    });
});
