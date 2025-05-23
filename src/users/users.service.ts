import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user.request';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(data: CreateUserRequest) {
    try {
      return await this.prismaService.user.create({
        data: {
          ...data,
          password: await bcrypt.hash(data.password, 10),
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        // Unique constraint failed
        throw new UnprocessableEntityException(
          'User with this email already exists',
        );
      }
      throw error.message;
    }
  }
}
