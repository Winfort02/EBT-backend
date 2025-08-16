import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UserModel } from 'src/models/user.model';
import { HttpMessage, KEYS } from 'src/constants';
import { compare } from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthResponseDto } from './dto/auth-response.dto';

@Injectable()
export class AuthService {

  private readonly config: ConfigService;

  /**
   * Auth Service Constructor
   * @param prismaService 
   */
  constructor(
    private readonly prismaService: PrismaService, 
    private readonly jwtService: JwtService,
    config: ConfigService) {
      this.config = config;
    }

  /**
   * Method to grant user access
   * @param loginAuthDto 
   */
  public async logoinAsync({ email, password }: LoginAuthDto): Promise<AuthResponseDto> {
    const user = await this.validateCredentialAsync({ email, password});
    const accessToken = await this.generateTokenAsync(user, this.config.get<string>(KEYS.JWT_ACCESS) as string);
    return new AuthResponseDto(user, accessToken);
  }

  /**
   * Method use to logout the current user
   * @param id 
   */
  public async logout(id: number): Promise<void> {
    
  }

  /**
   * Method to validate user credential
   * @param email 
   */
  private async validateCredentialAsync({ email, password }: LoginAuthDto) {
    const user =  await this.prismaService.user.findUnique({ where: { email }, include: { role: true}});
    if (!(user && await compare(password, user.password))) {
      throw new UnauthorizedException(HttpMessage.INVALID_CREDENTIAL);
    }
    return new UserModel(user, user.role);
  }

  /**
   * Method to generate access token
   * @param user 
   * @param secret 
   * @returns AccessToken
   */
  private async generateTokenAsync(user: UserModel, secret: string) {
  const { email, name, id } = user;
  const payload = { email, sub: { name, id }};
  return await this.jwtService.signAsync(payload, { expiresIn: '1h', secret});
  }
}
