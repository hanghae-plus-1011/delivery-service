import { Test, TestingModule } from '@nestjs/testing';
import {
  existingUser,
  invalidEmailUser,
  invalidPasswordUser,
  nonExistingUser,
  validUser,
} from '../../../fixtures/customer/signup.fixture';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CustomerService } from '../../../../src/services/customer/customer.service';

describe('CustomerService', () => {
  let service: CustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerService],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
  });

  describe('로그인(SignIn)', () => {
    it('사용자가 올바른 정보를 입력한다면 로그인이 되어야 한다.', () => {
      const res = service.signin(validUser);

      expect(res).toEqual({
        user: {
          email: validUser.email,
          nickname: validUser.nickname,
        },
        token: expect.any(String),
      });
    });

    it('사용자의 email이 비정상적으로 입력된 경우, 오류를 반환해야 한다.', () => {
      expect(service.signin(invalidEmailUser)).toThrowError(
        BadRequestException,
      );
    });

    it('사용자의 password가 8자 미만으로 입력한다면, 오류를 반환해야 한다.', () => {
      expect(
        service.signin({
          email: invalidPasswordUser.email,
          password: 'pwd',
        }),
      ).toThrowError(BadRequestException);
    });

    it('사용자의 password가 20자를 초과한다면, 오류를 반환해야 한다.', () => {
      expect(
        service.signin({
          email: invalidPasswordUser.email,
          password: 'passwordislongerthan20characters',
        }),
      ).toThrowError(BadRequestException);
    });

    it('사용자의 password가 영문/숫자/특수문자가 아닌 문자가 포함된다면, 오류를 반환해야 한다.', () => {
      expect(
        service.signin({
          email: invalidPasswordUser.email,
          password: '패스워드를 한글로 입력',
        }),
      ).toThrowError(BadRequestException);
    });

    it('사용자가 존재하지 않는 email로 로그인을 시도한다면, 오류를 반환해야 한다.', () => {
      expect(service.signin(nonExistingUser)).toThrowError(NotFoundException);
    });
  });

  describe('회원가입(SignUp)', () => {
    it('사용자가 올바른 정보를 입력한다면 회원가입이 되어야 한다.', () => {
      const res = service.signup(validUser);

      expect(res).toEqual({
        user: {
          id: expect.any(Number),
          email: validUser.email,
          nickname: validUser.nickname,
        },
        token: expect.any(String),
      });
    });

    it('사용자의 email이 비정상적으로 입력될 경우, 오류를 반환해야 한다.', () => {
      expect(service.signup(invalidEmailUser)).toThrowError(
        BadRequestException,
      );
    });

    it('사용자의 email이 이미 존재할 경우, 오류를 반환해야 한다.', () => {
      expect(service.signup(existingUser)).toThrowError(ConflictException);
    });

    it('사용자의 password가 8자 미만으로 입력한다면, 오류를 반환해야 한다.', () => {
      expect(
        service.signup({
          email: invalidPasswordUser.email,
          nickname: invalidPasswordUser.nickname,
          password: 'pwd',
        }),
      ).toThrowError(BadRequestException);
    });

    it('사용자의 password가 20자를 초과한다면, 오류를 반환해야 한다.', () => {
      expect(
        service.signup({
          email: invalidPasswordUser.email,
          nickname: invalidPasswordUser.nickname,
          password: 'passwordislongerthan20characters',
        }),
      ).toThrowError(BadRequestException);
    });

    it('사용자의 password가 영문/숫자/특수문자가 아닌 문자가 포함된다면, 오류를 반환해야 한다.', () => {
      expect(
        service.signup({
          email: invalidPasswordUser.email,
          nickname: invalidPasswordUser.nickname,
          password: '패스워드를 한글로 입력',
        }),
      ).toThrowError(BadRequestException);
    });
  });
});
