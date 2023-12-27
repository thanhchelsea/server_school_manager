import { PositionInfo } from "./position";
import { RoleInfo } from "./role";
//ding nghia interface cho user

export const userTable = "User";

export enum UserType {
    TEACHER = 0,
    STUDENT = 1,
    PARENT = 2,//PHU HUYNH
}
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
    fullName: string;
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
    roleInfo: RoleInfo;
    postionInfo: PositionInfo[];
    constructor(args?: any) {
        if (!args) {
            args = {};
        }
        this.username = args.username ?? "";
        this.password = args.password ?? "";
        this.firstName = args.firstName ?? "";
        this.lastName = args.lastName ?? "";
        this.fullName = args.fullName ?? "";
        this.phoneNumber = args.phoneNumber ?? "";
        this.email = args.email ?? "";
        this.dateOfBirth = args.dateOfBirth ?? Date.now();
        this.gender = args.gender == 1 ? Gender.Male : args.gender == 2 ? Gender.Female : Gender.Other;
        this.address = args.address ?? "";
        this.createDate = args.createDate ?? Date.now();
        this.lasteUpdate = args.lasteUpdate ?? Date.now();
        this.nickName = args.nickName ?? "";
        this.avatarUrl = args.avatarUrl ?? "";
        this.roleInfo = Array.isArray(args.role) ? args.role.map((role: RoleInfo) => new RoleInfo(role)) : [];
        this.postionInfo = Array.isArray(args.positionIds) ? args.positionIds.map((position: PositionInfo) => new PositionInfo(position)) : [];
        this.status = args.status ?? StatusUser.Active;
    }

}
export const userToJson = (data: any) => {
    let jsonObject = Object.assign(data);
    jsonObject.dateOfBirth = data.dateOfBirth.getTime();
    delete jsonObject.password;
    return jsonObject;

}

