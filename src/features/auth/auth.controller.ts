import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SuccessHttpResponse } from 'src/models/success-response.model';
import { ENDPOINT, HttpMessage } from 'src/constants';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { Response } from 'express';

@Controller(ENDPOINT.AUTH)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(ENDPOINT.LOGIN)
  public async login(@Body() loginAuthDto: LoginAuthDto, @Res({ passthrough: true}) res: Response) {
    const user = await this.authService.logoinAsync(loginAuthDto);
    res.cookie('access-token', user.accessToken, {
      httpOnly: true,
      secure: true, // override with production mode to true
      sameSite: 'none',
      path: '/'
    });
    return new SuccessHttpResponse<AuthResponseDto>(user, HttpMessage.SUCCESS);
  }

  @Post(ENDPOINT.LOGOUT)
  public async logout(@Res({ passthrough: true}) res: Response) {
    res.clearCookie('access-token');
    return { message: 'Logged out' };
  }

}
