import mongoose, { Document, Schema } from "mongoose";
//ding nghia interface cho user

export const userTable = "User";

export enum Gender {
    Male = 1,//trai 
    Female = 2,//gai
    Other = 3,//deo xac dinh
}

export enum StatusUser {
    Active = 'active',
    Inactive = 'inactive',
    Blocked = 'blocked',
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
        this.status = args.status ?? StatusUser.Active;
    }
}


export interface UserDoc extends UserInfo, Document {
    _id: string;
}

const UserSchema = new Schema<UserDoc>(
    {
        username: { type: String, required: true, unique: true, },
        password: { type: String, required: true },
        firstName: { type: String },
        lastName: { type: String },
        phoneNumber: { type: String, required: true },
        email: { type: String, required: true },
        dateOfBirth: { type: Date, default: Date.now() },
        gender: { type: Number, enum: Object.keys(Gender), required: true },
        address: { type: String, required: true },
        createDate: { type: Date, default: Date.now() },
        nickName: { type: String },
        avatarUrl: { type: String },
        status: { type: String, enum: Object.values(StatusUser), default: StatusUser.Active },
    },
    { timestamps: true }
);

export const UserModel = mongoose.model<UserDoc>(userTable, UserSchema);
