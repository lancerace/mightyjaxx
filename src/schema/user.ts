import { Schema } from 'mongoose';
import { IUser } from '../interfaces/user';


const UserSchema = new Schema<IUser>({
    email: String,
    password: String
});


export default UserSchema;