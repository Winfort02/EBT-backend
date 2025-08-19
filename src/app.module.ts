import { Module } from '@nestjs/common';
import { AuthModule } from './features/auth/auth.module';
import { UserModule } from './features/user/user.module';
import { PrismaModule } from './features/prisma/prisma.module';
import { ConfigModule, ConfigService  } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PersonModule } from './features/person/person.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('REFRESH_TOKE_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
    AuthModule, 
    UserModule, 
    PrismaModule, 
    PersonModule],
   exports: [JwtModule],
})
export class AppModule {}
