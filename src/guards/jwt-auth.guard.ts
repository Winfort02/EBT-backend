import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { KEYS } from 'src/constants';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    private readonly config: ConfigService;
  constructor(private jwtService: JwtService, config: ConfigService) {
    this.config = config;
  }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies['access-token'];

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      const payload = this.jwtService.verify(token, { secret: this.config.get<string>(KEYS.JWT_ACCESS) as string});
      request['user'] = payload;
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}