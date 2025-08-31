import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Module({
  providers: [ProjectService, PrismaService, JwtService, JwtAuthGuard ],
  controllers: [ProjectController]
})
export class ProjectModule {}
