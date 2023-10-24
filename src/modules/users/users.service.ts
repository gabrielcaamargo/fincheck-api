import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getUserById(userId: string) {
    console.log({ meUserId: userId })
    return { userId };
  }
}
