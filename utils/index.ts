import jwt from 'jsonwebtoken';
import { RoleInfo } from '../models/role';
import { TokenData } from '../common/token_data';
import dotenv from 'dotenv';
dotenv.config();
export function jwtEndcode(userId: any, roles: RoleInfo[], exp?: string) {
    const payload: TokenData = {
        userId: userId,
        roles: roles,
        expirateDate: exp ?? "7d",
    };
    let accessToken = jwt.sign(
        payload,
        process.env.SECRET_KEY ?? "",
        { expiresIn: payload.expirateDate, }
    );
    return accessToken;
}
export function jwtDecodeToken(token: string) {
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY ?? "",);
        return decoded;
    } catch (err) {
        return null;
    }
}