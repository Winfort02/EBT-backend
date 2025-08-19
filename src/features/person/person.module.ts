import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [PersonService, PrismaService, JwtAuthGuard, JwtService],
  controllers: [PersonController]
})
export class PersonModule {}
