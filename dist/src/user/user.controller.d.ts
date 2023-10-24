import { UserService } from './user.service';
import { CreateUserDto, User } from './user.entity';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): User[];
    create(body: CreateUserDto): Promise<User>;
}
