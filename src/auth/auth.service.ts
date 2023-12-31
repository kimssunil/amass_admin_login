import { Injectable } from '@nestjs/common';
import fs from 'fs';
import path from 'path';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  async login(email: string, password: string): Promise<any> {
    const dbPath = path.resolve(__dirname, '../../db.json');
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    const users = data.users;
    const user: User = users.find((user) => user.email === email);
    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return null;
    }

    const payload = { email: user.email, id: user.id };
    const token = jwt.sign(payload, 'yourSecretKey', {
      expiresIn: '1h',
    });

    return {
      token,
      user,
    };
  }
}
