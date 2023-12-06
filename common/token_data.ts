import { RoleInfo } from "../models/role";

export type TokenData = {
    userId: any,
    roles: RoleInfo[],
    expirateDate: string,
}