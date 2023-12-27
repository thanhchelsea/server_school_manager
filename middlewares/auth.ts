import { Exception } from "../exceptions/Exceptions";
import asyncHandler from "../utils/asyncHandler";
import { Request, Response } from 'express';
import { StatusCode, ResponseStatus } from "../common/status_response";
import dotenv from "dotenv";
import { dot } from "node:test/reporters";
import { jwtDecodeToken } from "../utils";
import AuthRequest from "../common/auth_request";
import { TokenData } from "../common/token_data";
import { miliSecondInDay } from "../utils/config";
import { UserModel } from "../database/model/user";

dotenv.config();
export const verifyAccessToken = asyncHandler(async (req: AuthRequest, res: Response, next) => {
    const accessToken = req.body.accessToken;
    if (!accessToken) {//deo truyen acctoken
        throw new Exception({
            statusCode: StatusCode.unauthorized,
            message: "Token is required!",
            status: ResponseStatus.token_invalid,
        });
    }
    //co truyen vao token ===> kiem tra xem token co hop le hay khong
    const tokenData = jwtDecodeToken(accessToken) as TokenData;
    if (!tokenData) {//token bi sai dm no chu
        throw new Exception({
            statusCode: StatusCode.unauthorized,
            message: "Token invalid!",
            status: ResponseStatus.token_invalid,
        });
    }
    //kiem tra xem token co han hay khong hoạc ton tai user do khong
    const userExisting = await UserModel.findOne({ username: tokenData.userName });
    if (tokenData.exp! * 7 * 1000 < new Date().getTime() || !userExisting) {
        throw new Exception({
            statusCode: StatusCode.unauthorized,
            message: "Token exprired date or user not exists :(",
            status: ResponseStatus.token_expired_date,
        });
    }
    req.credentials = tokenData;
    next!();

})