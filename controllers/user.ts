import { Request, Response } from 'express';
import { OutputType, print } from '../helpers/print';
import { statusResponse, } from '../utils/http_response';
import { ResponseStatus, StatusCode } from '../common/status_response';
import asyncHandler from '../utils/asyncHandler';
import { Exception } from '../exceptions/Exceptions';
const bcrypt = require('bcrypt');
import dotenv from "dotenv";
import { userRepo } from '../repositories/index';
import { Gender } from '../models/user';
import moment from 'moment'
dotenv.config();

const login = asyncHandler(async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
        throw new Exception({ statusCode: StatusCode.bad_request, message: "Username or password is require" })
    }
    try {
        const user = await userRepo.login({
            username: username,
            password: password,
        });
        return statusResponse({
            res: res,
            status: ResponseStatus.success,
            data: user,

        });
    } catch (error) {
        throw error;
    }

});

const loginWithSessionId = asyncHandler(async (req: Request, res: Response) => {
    const { sessionId } = req.body;
    try {
        const user = await userRepo.loginWithSessionId({ sessionId: sessionId });
        return statusResponse({
            res: res,
            status: ResponseStatus.success,
            data: user,

        });
    } catch (error) {
        throw error;
    }
});
const insertUser = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { users, userType } = req.body;
        if (!users || !Array.isArray(users) || users.length === 0) {
            throw new Exception({ statusCode: StatusCode.bad_request, message: "Users is array" });
        }
        let userRoleIds = new Map<string, string[]>();
        for (let item of users) {
            if (item.dateOfBirth) {
                const formattedDateString = item.dateOfBirth.replace(/\//g, '-');
                const password = item.username === "admin" ? "1" : formattedDateString;
                const hashedPassword = await bcrypt.hash(
                    password,
                    parseInt(process.env.SALT_ROUNDS as string)
                );
                item.password = hashedPassword;
                const momentDate = moment.utc(formattedDateString, "DD/MM/YYYY").utcOffset(7);
                const dateOfBirth = momentDate.toDate();
                // const dateOfBirth = new Date(formattedDateString);
                item.dateOfBirth = dateOfBirth;
            } else {
                //tu gen password
            }

            if (item.roleIds) {
                // co truyen role vao trong data
                if (item.username) {
                    userRoleIds.set(item.username, item.roleIds);
                }
            }
        }
        const usernameError = await userRepo.insertManyUser({ users: users, userType: userType });
        console.log(`username insert error: ${usernameError}`);
        return statusResponse({
            status: ResponseStatus.success,
            res: res,
            message: "Insert susccess",
        });
    } catch (error) {
        throw error;
    }
});
export default {
    login,
    loginWithSessionId,
    insertUser,
}