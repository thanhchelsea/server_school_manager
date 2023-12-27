import jwt, { verify } from 'jsonwebtoken';
import { RoleInfo } from '../models/role';
import { TokenData } from '../common/token_data';
import dotenv from 'dotenv';
import { Exception } from '../exceptions/Exceptions';
import { StatusCode, } from '../common/status_response';
dotenv.config();
export function jwtEndcode(userId: any, roles: RoleInfo, exp?: string) {
    const payload: TokenData = {
        userName: userId,
        roles: roles,
        expirateDate: exp ?? "7d",
        exp: -1,
        iat: -1,
    };
    let accessToken = jwt.sign(
        {
            userName: userId,
            roles: roles,
            expirateDate: "7d",
        },
        process.env.SECRET_KEY ?? "",
        { expiresIn: payload.expirateDate, }
    );
    return accessToken;
}
export function jwtDecodeToken(token: string) {
    try {
        const decoded = verify(token, process.env.SECRET_KEY ?? "");
        return decoded;
    } catch (err) {
        return null;
    }
}