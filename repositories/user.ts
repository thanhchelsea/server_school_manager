import { StatusCode, ResponseStatus } from "../common/status_response";
import { Exception } from "../exceptions/Exceptions";
import { UserInfo, UserType, userToJson } from "../models/user";
import { MongoClient, MongoError } from 'mongodb';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import { statusResponse } from "../utils/http_response";
import bcrypt from 'bcrypt';
import { jwtDecodeToken, jwtEndcode } from "../utils";
import { TokenData } from "../common/token_data";
import { TeacherInfo } from "../models/teacher";
import { UserDB, UserModel } from "../database/model/user";
import { TeacherModel } from "../database/model/teacher";
dotenv.config();
const insertManyUser: (agrs: { users: any[], userType: UserType }) => Promise<string[]> = async (agrs: { users: any[], userType: UserType }) => {
    //tra ve mang username neu insert username nay bi loi
    const { users, userType } = agrs;
    let usernameError: string[] = [];
    for (const user of users) {
        try {
            const createdUser = await UserModel.create(user);
            // console.log(createdUser);
            if (userType == UserType.TEACHER) {//giao vien
                const teacherModel = new TeacherModel({ "userId": createdUser._id, ...user });
                // console.log(teacherModel);
                await teacherModel.save();
            }
            if (userType == UserType.STUDENT) {//hoc sinh

            }
            if (userType == UserType.PARENT) {//phu huynh

            }
        } catch (error) {
            // console.log(error);
            usernameError.push(user.username);
        }
    }
    return usernameError;
}

const login = async (args: { username: string, password: string }): Promise<UserInfo> => {
    const { username, password } = args;
    try {
        const existingUser = await new UserDB().findByUserUsername({ username: username });
        if (!existingUser) {
            throw new Exception({
                statusCode: StatusCode.success,
                status: ResponseStatus.login_account_not_exists,
                message: "Account does not exists",
            });
        }
        let isMatch = await bcrypt.compare(password, existingUser.password);
        if (isMatch) {

            const accessToken = jwtEndcode(existingUser.username, existingUser.roleInfo,);
            return Object.assign(userToJson(existingUser), { sessionId: accessToken });
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

const loginWithSessionId = async (args: { sessionId: string }): Promise<UserInfo | null> => {
    const { sessionId } = args;
    let payload = jwtDecodeToken(sessionId);
    const _tokenData = (payload as any) as TokenData;
    try {
        if (!payload) {
            //payload null
            throw new Exception({
                statusCode: StatusCode.unauthorized,
                status: ResponseStatus.token_invalid,
                message: "JWT verification failed",
            });
        } else {
            if (_tokenData.exp * 7 * 1000 < new Date().getTime()) {
                throw new Exception({
                    statusCode: StatusCode.unauthorized,
                    message: "Token exprired date or user not exists :(",
                    status: ResponseStatus.token_expired_date,
                });
            }
            const existingUser = await new UserDB().findByUserUsername({ username: _tokenData.userName });

            if (!existingUser) {
                throw new Exception({
                    statusCode: StatusCode.unauthorized,
                    status: ResponseStatus.token_invalid,
                    message: "JWT verification failed",
                });
            } else {
                // const user = new UserInfo(existingUser);
                return Object.assign(userToJson(existingUser), { sessionId: sessionId });
            }
        }
    } catch (error) {
        const errorMessage: string = (error as Exception).message;
        throw new Exception({
            statusCode: (error as Exception).statusCode,
            message: errorMessage,
            status: (error as Exception).status,
        });
    }
}


//teacher 


//student



export default {
    insertManyUser,
    loginWithSessionId,
    login,
} 