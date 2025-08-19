import { User } from '.prisma/client';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpMessage } from 'src/constants';
import { hash } from 'bcrypt';
import { UserModel } from 'src/models/user.model';

@Injectable()
export class UserService {

  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Method to create new user
   * @param createUserDto 
   * @returns User
   */
  async createAsync(createUserDto: CreateUserDto): Promise<UserModel> {
    const { email, password } = createUserDto;
    const user = await this.prismaService.user.findUnique({ where: { email }});
    if (user) {
      throw new ConflictException(HttpMessage.USER_EXIST)
    }
    const data = { ...createUserDto, password: await hash(password, 10)};
    const currentUser  = await this.prismaService.user.create({ data });
    return new UserModel(currentUser);
  }

  /**
   * Method to get all users
   * @returns User[]
   */
  public async getUsersAsync(): Promise<UserModel[]> {
    const users = await this.prismaService.user.findMany({ include: { role: true}});
    return users.map((user: any) => ({ ...new UserModel(user, user?.role)}));
  }

  /**
   * Method to get user information by id
   * @param id 
   * @returns User
   */
  public async getUserByIdAsync(id: number): Promise<UserModel> {
    const user = await this.prismaService.user.findUnique({ 
      where: { id}, 
      include: { role: { include: { permissions: true }} } 
    });
    if (!user) {
      throw new NotFoundException(HttpMessage.NOT_FOUND);
    }
    return { ...new UserModel(user), role: user.role };
  }

  public async update(id: number, updateUserDto: UpdateUserDto) {
    const { email, displayName } = updateUserDto;
    return await this.prismaService.user.update({
      where: { id },
      data: { email, displayName }
    });
  }

  public async remove(id: number) {
    return await this.prismaService.user.delete({ where: { id }});
  }
}
