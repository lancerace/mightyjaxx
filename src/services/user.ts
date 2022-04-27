import AuthUtil from '../utils/auth';
import mongoose from 'mongoose';
import { IUser } from '../interfaces/user';
import UserSchema from '../schema/user';

async function getUser(fields:{email: string, password?: string}): Promise<IUser> {

    const User = mongoose.model<IUser>("User", UserSchema);
    return User.findOne({ ...fields });
}


async function addUser(email: string, password: string):Promise<IUser> {
    const User = mongoose.model<IUser>("User", UserSchema);
    const hashedPassword = await AuthUtil.hashPassword(password);
    const user = new User({ email, password: hashedPassword });
    return user.save();
}


export default { getUser,addUser }