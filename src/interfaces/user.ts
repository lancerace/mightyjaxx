export interface IUser 
{
    email:string;
    password:string;
}
interface JWTToken{
    iat:number;
    exp:number;
}

export interface IAuthenticatedUser extends IUser,JWTToken {}