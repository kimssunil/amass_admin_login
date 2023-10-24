declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    [x: string]: any;
    constructor();
    validate(email: string, password: string): Promise<any>;
}
export {};
