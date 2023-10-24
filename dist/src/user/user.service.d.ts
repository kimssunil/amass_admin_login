import { CreateUserDto, User } from './user.entity';
export declare class UserService {
    private readonly dbPath;
    create(body: CreateUserDto): Promise<User>;
    findOne(email: string): Promise<User | undefined>;
    findAll(): User[];
}
