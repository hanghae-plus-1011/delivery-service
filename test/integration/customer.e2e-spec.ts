import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { validUser } from '../fixtures/customer/signup.fixture';
import { AppModule } from '../../src/app.module';

describe('[Customer] 사용자(Customer)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('회원가입(SignUp)', () => {
    it('POST /signup 사용자의 회원가입을 진행해야 한다.', async () => {
      const res = await request(app.getHttpServer())
        .post('/signup')
        .send(validUser);

      expect(res.status).toBe(201);
      expect(res.text).toEqual({
        message: '회원가입이 완료되었습니다.',
        user: {
          id: expect.any(Number),
          email: validUser.email,
          nickname: validUser.nickname,
        },
        token: expect.any(String),
      });
    });
  });

  describe('로그인(SignIn)', () => {
    it('POST /signin 사용자의 로그인을 진행해야 한다.', async () => {
      const res = await request(app.getHttpServer()).post('/signin').send({
        email: validUser.email,
        password: validUser.password,
      });

      expect(res.status).toBe(200);
      expect(res.text).toEqual({
        message: '로그인에 성공하였습니다.',
        token: expect.any(String),
      });
    });
  });
});
