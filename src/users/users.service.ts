import { Injectable } from '@nestjs/common';
import { ConflictException } from '@nestjs/common/exceptions';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;

    const emailTaken = await this.prismaService.user.findUnique({
      where: { email }
    })

    if(emailTaken) {
      throw new ConflictException('This email is already in use');
    }

    const user = await this.prismaService.user.create({
      data: { name, email, password }
    });

    return user;
  }
}
