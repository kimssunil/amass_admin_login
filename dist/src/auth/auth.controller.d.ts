import { AuthService } from './auth.service';
import { LoginDto } from './loginDto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<any>;
}
