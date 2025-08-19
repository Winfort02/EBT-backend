import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ENDPOINT, HttpMessage } from 'src/constants';
import { SuccessHttpResponse } from 'src/models/success-response.model';
import { UserModel } from 'src/models/user.model';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller(ENDPOINT.USER)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createAsync(createUserDto);
    return new SuccessHttpResponse<UserModel>(user, HttpMessage.CREATED);
  }

  @Get()
  public async GetAllUsers() {
    const users = await this.userService.getUsersAsync();
    return new SuccessHttpResponse<UserModel[]>(users, HttpMessage.SUCCESS);
  }

  @Get(':id')
  public async getUserById(@Param('id') id: string) {
    return this.userService.getUserByIdAsync(+id);
  }

  @Put(':id')
  public async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.update(+id, updateUserDto);
    return new SuccessHttpResponse<UserModel>(user as unknown as UserModel, HttpMessage.UPDATED);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    const user = await this.userService.remove(+id);
    return new SuccessHttpResponse<UserModel>(user as unknown as UserModel, HttpMessage.DELETED);
  }
}
