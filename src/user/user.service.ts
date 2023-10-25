import { Injectable } from '@nestjs/common';
import { CreateUserDto, User } from './user.entity';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import * as path from 'path';
import { users } from '../../db.json';

@Injectable()
export class UserService {
  private readonly dbPath = path.resolve(__dirname, '../..', 'db.json');

  async create(body: CreateUserDto): Promise<User> {
    const user = new User();

    user.username = body.username;
    user.password = await bcrypt.hash(body.password, 10);
    user.email = body.email;
    user.role = body.role;
    if (users.length === 0) {
      user.id = 1;
    } else {
      user.id = users[users.length - 1].id + 1;
    }
    console.log('dbPath', this.dbPath);
    const data = JSON.parse(fs.readFileSync(this.dbPath, 'utf8'));
    data.users.push(user);
    fs.writeFileSync(this.dbPath, JSON.stringify(data, null, 2));

    return user;
  }

  async findOne(email: string): Promise<User | undefined> {
    console.log('email', email);
    const data = JSON.parse(fs.readFileSync(this.dbPath, 'utf8'));
    return data.users.find((user) => user.email === email);
  }

  findAll(): User[] {
    const data = JSON.parse(fs.readFileSync(this.dbPath, 'utf8'));
    return data.users;
  }
}
