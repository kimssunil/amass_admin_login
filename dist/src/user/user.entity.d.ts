export declare class User {
    id: number;
    email: string;
    username: string;
    password: string;
    role: string;
}
export declare class CreateUserDto {
    email: string;
    password: string;
    username: string;
    role: string;
}
export declare class Login {
    email: string;
    password: string;
}
