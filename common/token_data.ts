import { RoleInfo } from "../models/role";

export type TokenData = {
    userName: any,
    roles: RoleInfo[],
    expirateDate: string,
}