import { StatusCode, ResponseStatus } from "../common/status_response";
import { Exception } from "../exceptions/Exceptions";
import { UserDoc, UserInfo, UserModel } from "../models/user";
import { MongoClient, MongoError } from 'mongodb';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import { statusResponse } from "../utils/http_response";
import bcrypt from 'bcrypt';
import { jwtDecodeToken, jwtEndcode } from "../utils";

dotenv.config();
const insertManyUser: (users: UserDoc[]) => Promise<string[]> = async (users: UserDoc[]) => {
    //tra ve mang username neu insert username nay bi loi
    let usernameError: string[] = [];
    for (const user of users) {
        try {
            //viết insert one vào đây
            await UserModel.create(user);
        } catch (error) {
            usernameError.push(user.username);
        }
    }
    return usernameError;
}

const login = async (args: { username: string, password: string }): Promise<UserInfo> => {
    const { username, password } = args;
    try {
        const existingUser = await UserModel.findOne({ username: username }).populate({ path: "roleIds", select: '-_id -__v ' });
        if (!existingUser) {
            throw new Exception({
                statusCode: StatusCode.success,
                status: ResponseStatus.login_account_not_exists,
                message: "Account does not exists",
            });
        }
        let isMatch = await bcrypt.compare(password, existingUser.password);
        if (isMatch) {
            const user = new UserInfo(existingUser);
            const accessToken = jwtEndcode(user.username, user.roles,);
            return Object.assign(user.toJson(), { sessionId: accessToken });
        } else {
            throw new Exception({
                statusCode: StatusCode.success,
                status: ResponseStatus.login_wrong_password,
                message: "Wrong password",
            });
        }
    } catch (error) {
        const errorMessage: string = (error as Exception).message;
        throw new Exception({ statusCode: (error as Exception).statusCode, message: errorMessage });
    }
}
export default {
    insertManyUser,
    login,
} 