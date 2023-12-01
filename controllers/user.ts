import { Request, Response } from 'express';
import { OutputType, print } from '../helpers/print';
import { statusResponse, } from '../utils/http_response';
import { ResponseStatus, StatusCode } from '../common/status_response';
import asyncHandler from '../utils/asyncHandler';
import { Exception } from '../exceptions/Exceptions';
const bcrypt = require('bcrypt');
import dotenv from "dotenv";
import { userRepo } from '../repositories/index';
dotenv.config();

const login = asyncHandler(async (req: Request, res: Response) => {
    statusResponse({
        status: ResponseStatus.success,
        res: res,
    });
});

const insertUser = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { users } = req.body;
        if (!users || !Array.isArray(users) || users.length === 0) {
            throw new Exception({ status: StatusCode.bad_request, message: "Users is array" });
        }
        let userRoleIds = new Map<string, string[]>();
        for (let item of users) {
            if (item.dateOfBirth) {
                const formattedDateString = item.dateOfBirth.replace(/\//g, '-');
                const password = formattedDateString;
                const hashedPassword = await bcrypt.hash(
                    password,
                    parseInt(process.env.SALT_ROUNDS as string)
                );
                item.password = hashedPassword;
                const dateOfBirth = new Date(formattedDateString);
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
        await userRepo.insertManyUser(users);
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
    insertUser,
}