import mongoose, { Document, Schema } from "mongoose";
import { TeacherModel } from "../models/teacher";
import { UserInfo, StatusUser, userTable } from "../models/user";
import { IUserActiveDB } from "./interfaces/user_interfaces";
import { roleNameTable } from "../models/role";
export class Abc {
    constructor(prosp) {

    }
}
export interface UserDoc extends Abc, Document {
    _id: string;
    roleIds: [any]
}

const UserSchema = new mongoose.Schema<UserDoc>(
    {
        //@ts-ignore
        username: { type: String, required: true, unique: true, },
        password: { type: String, required: true },
        firstName: { type: String },
        lastName: { type: String },
        phoneNumber: { type: String, required: true },
        email: { type: String, required: true },
        dateOfBirth: { type: Date, default: Date.now() },
        gender: { type: Number, required: true },
        address: { type: String, required: true },
        createDate: { type: Date, default: Date.now() },
        nickName: { type: String },
        avatarUrl: { type: String },
        status: { type: Number, default: StatusUser.Active },
        roleIds: [{ type: Schema.Types.ObjectId, ref: roleNameTable }],
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export const UserModel = mongoose.model<UserDoc>(userTable, UserSchema);



export class UserDB implements IUserActiveDB {
    async findByUserUsername(args: { username: string; }): Promise<any> {
        const { username } = args;
        const user = await UserModel.findOne({ username: username }).populate({ path: "roleIds", select: '-_id -__v ' });
        const teacher = await TeacherModel.find({ username: username })
        console.log(teacher);
        // var teacher = await TeacherModel.find();
        // return user;
    }

}