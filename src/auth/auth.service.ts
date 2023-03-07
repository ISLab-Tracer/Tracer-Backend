import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { isBoolean, isObject } from 'class-validator';
import {
  AuthDuplicationRequestException,
  AuthNotFoundRequestException,
  AuthSigninDuplicationRequestException,
  AuthSignupDuplicationRequestException,
  AuthSignupFailureException,
  EntityBadRequestException,
} from 'src/config/service.exception';
import { Repository } from 'typeorm';
import { SignUp, SIGNUP_STATUS } from './../entity/signup.entity';
import { UpdateLoginDto } from './../login/dto/update-login.dto';
import { LoginService } from './../login/login.service';
import { CreateUserDto } from './../user/dto/create-user.dto';
import { UserService } from './../user/user.service';
import { VerificationService } from './../verification/verification.service';
import { CreateSignInDto } from './dto/create-signin.dto';
import { CreateSignupDto } from './dto/create-signup.dto';
import { RequestSigninDto } from './dto/request-signin.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(SignUp)
    private signupRepository: Repository<SignUp>,
    private readonly userService: UserService,
    private readonly loginService: LoginService,
    private readonly verificationService: VerificationService,
    private jwt: JwtService,
    private config: ConfigService
  ) {}

  /**
   * 회원가입 이메일 전송
   * --
   * @param signupInfo
   */
  async createSignup(signupInfo: CreateSignupDto) {
    try {
      const { user_email, user_nm } = signupInfo;
      const check = await this.userService.checkEmail(user_email);
      if (isObject(check)) {
        throw EntityBadRequestException();
      }

      const check2 = await this.signupRepository.findOne({
        where: { signup_mail: user_email },
      });
      if (check2) {
        throw AuthDuplicationRequestException();
      }

      const signup = await this.signupRepository.save({
        signup_mail: user_email,
        signup_nm: user_nm,
      });

      if (!signup) {
        throw AuthSignupDuplicationRequestException();
      }

      const { signup_id } = signup;

      const result = await this.verificationService.signup(
        user_email,
        user_nm,
        signup_id
      );

      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 로그인 이메일 전송
   * --
   * @param signinInfo
   */
  async createSignin(signinInfo: CreateSignInDto) {
    try {
      const { user_email } = signinInfo;
      const user = await this.userService.checkEmail(user_email);
      if (isBoolean(user)) {
        throw AuthNotFoundRequestException();
      }

      const { user_id } = user;

      const check2 = await this.loginService.checkLogin(user_id);
      if (check2) {
        throw AuthSigninDuplicationRequestException();
      }

      const login = await this.loginService.createLogin(user);

      const { login_id } = login;
      const { user_nm, user_rank } = user;
      const _user = user_nm + ' ' + this.userService.getUserRank(user_rank);
      const result = await this.verificationService.signin(
        user_email,
        login_id,
        _user
      );

      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 회원가입 정보 요청
   * --
   * @param signup_id
   * @returns
   */
  async getSignup(signup_id: string) {
    try {
      const result = await this.signupRepository.findOneByOrFail({ signup_id });
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 로그인 정보 요청
   * --
   * @param signin_id
   * @returns
   */
  async getSignin(signin_id: string) {
    try {
      const result = await this.loginService.getLoginInfo(signin_id);
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 회원가입 요청
   * --
   * @param userInfo
   * @returns
   */
  async requestSignup(userInfo: CreateUserDto) {
    try {
      const user = await this.userService.createUser(userInfo);
      if (!user) {
        throw AuthSignupFailureException();
      }

      await this.signupRepository.update(
        { signup_mail: userInfo.user_email },
        { signup_status: SIGNUP_STATUS.DONE }
      );

      delete user.user_password;
      const access_token = await this.generateToken(user.user_id, 'NORMAL');
      const login_data = {
        ...user,
        ...access_token,
      };
      return login_data;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 로그인 요청
   * --
   * @param userInfo
   */
  async requestSignin(signin: RequestSigninDto) {
    try {
      const { login_id } = signin;
      const login = await this.loginService.getLoginInfo(login_id);

      // date 비교
      // const date = new Date();
      const { user_id, login_duration } = login;

      const lData: UpdateLoginDto = {
        login_id,
        login_status: true,
      };

      await this.loginService.updateLogin(lData);

      const user = await this.userService.getUserInfo(user_id);
      delete user.user_password;

      const access_token = await this.generateToken(user.user_id, 'NORMAL');
      const login_data = {
        ...user,
        ...access_token,
      };
      return login_data;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 토큰 생성
   * --
   * @param id
   * @param type
   * @returns
   */
  async generateToken(
    id: string,
    type: string = 'ADMIN'
  ): Promise<{ access_token: string }> {
    const payload = {
      id: id,
      type: type,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '24h',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }

  /**
   * 토큰 인증
   * --
   * @param authorization
   * @returns
   */
  async verify(authorization: string) {
    try {
      const token = authorization.replace('Bearer ', '');
      const result = this.jwt.decode(token);
      return result;
    } catch (e) {
      throw e;
    }
  }
}
