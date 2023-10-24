// user.controller.ts
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, User } from './user.entity';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('users')
  findAll(): User[] {
    return this.userService.findAll();
  }

  @Post('register')
  async create(@Body() body: CreateUserDto): Promise<User> {
    console.log('createUserDto', body);
    return await this.userService.create(body);
  }
}
