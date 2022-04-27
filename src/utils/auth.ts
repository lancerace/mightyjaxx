import jwt from 'jsonwebtoken';
import { IAuthenticatedUser, IUser } from '../interfaces/user';
import bcrypt from 'bcryptjs';
import UserService from '../services/user';
async function hashPassword(password: string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}


async function issueAccessToken(email: string, password: string): Promise<{ accessToken: string }> {
    return jwt.sign({ email, password }, process.env.JWT_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES || '48h',
    });
}

async function authenticate(bearerToken: string = ''): Promise<{ user: IUser, message: string, success: boolean }> {
    const token = bearerToken.split('Bearer ')[1];
    if (!bearerToken)
        return { user: null, message: 'Unauthorized!', success: false };
    if (!token)
        return { user: null, message: 'Provide a token!', success: false };




    const decoded: IAuthenticatedUser = await jwt.verify(token, process.env.JWT_SECRET, {
        algorithms: ['HS256'],
    }, (err, decoded) => {
        if (err)
            return { user: null, message: 'Invalid token!', success: false };
        return decoded;
    });

    const user: IUser = await UserService.getUser({ email: decoded.email });
    const isPasswordCorrect = await bcrypt.compare(decoded.password, user.password);
    if (!isPasswordCorrect)
        return { user, message: 'Invalid token!', success: false };

    return { message: "success", user: decoded, success: true };
}


export default { issueAccessToken, authenticate, hashPassword }