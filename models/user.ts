import mongoose, { Document, Schema, Types } from "mongoose";
import { RoleInfo, roleNameTable } from "./role";
//ding nghia interface cho user

export const userTable = "User";

export enum Gender {
    Male = 1,
    Female = 2,
    Other = 3,
}

export enum StatusUser {
    Active = 1,
    Inactive = 0,
    Blocked = 2,
}


export class UserInfo {
    username: string;//acount
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    dateOfBirth: Date;
    gender: Gender;
    address: string;
    createDate: Date;
    lasteUpdate: number;
    nickName: string;
    avatarUrl: string;
    status: StatusUser;
    roles: RoleInfo[];
    constructor(args?: any) {
        if (!args) {
            args = {};
        }
        this.username = args.username ?? "";
        this.password = args.password ?? "";
        this.firstName = args.firstName ?? "";
        this.lastName = args.lastName ?? "";
        this.phoneNumber = args.phoneNumber ?? "";
        this.email = args.email ?? "";
        this.dateOfBirth = args.dateOfBirth ?? Date.now();
        this.gender = args.gender ?? Gender.Male;
        this.address = args.address ?? "";
        this.createDate = args.createDate ?? Date.now();
        this.lasteUpdate = args.lasteUpdate ?? Date.now();
        this.nickName = args.nickName ?? "";
        this.avatarUrl = args.avatarUrl ?? "";
        // this.roleIds=args.roleIds??[],
        this.roles = Array.isArray(args.roleIds) ? args.roleIds.map((role: RoleInfo) => new RoleInfo(role)) : [];
        this.status = args.status ?? StatusUser.Active;
    }
    toJson() {
        let jsonObject = Object.assign(this);
        jsonObject.dateOfBirth = this.dateOfBirth.getTime();
        delete jsonObject.password;
        return jsonObject;
    }
}


export interface UserDoc extends UserInfo, Document {
    _id: string;
}

const UserSchema = new mongoose.Schema<UserDoc>(
    {
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
        // @ts-ignore
        roleIds: [{ type: Schema.Types.ObjectId, ref: roleNameTable }],
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export const UserModel = mongoose.model<UserDoc>(userTable, UserSchema);
