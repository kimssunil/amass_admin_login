export class User {
  id: number;
  email: string;
  username: string;
  password: string;
  role: string;
}

export class CreateUserDto {
  email: string;
  password: string;
  username: string;
  role: string;
}

export class Login {
  email: string;
  password: string;
}
