import jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/user';
import bcrypt from 'bcryptjs';

async function hashPassword(password: string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}


async function issueAccessToken(email: string): Promise<{ accessToken: string }> {
    return jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES || '48h',
    });
}

async function authenticate(bearerToken: string = ''): Promise<{ user: IUser, message: string }> {
    const token = bearerToken.split('Bearer ')[1];

    if (!bearerToken)
        return { user: null, message: 'Unauthorized!' };
    if (!token)
        return { user: null, message: 'Provide a token!' };

    const decoded: IUser = await jwt.verify(token, process.env.JWT_SECRET, {
        algorithms: ['HS256'],
    }, (err, decoded) => {
        if (err)
            return { user: null, message: 'Invalid token!' };
        return decoded;
    });

    return { message: "success", user: decoded };
}


export default { issueAccessToken, authenticate, hashPassword }