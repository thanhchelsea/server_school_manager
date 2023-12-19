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

    constructor(args: any) {
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

