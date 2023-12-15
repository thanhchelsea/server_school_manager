import { StatusCode, ResponseStatus } from "../common/status_response";
import { Exception } from "../exceptions/Exceptions";
import { UserDoc, UserInfo, UserModel, UserType } from "../models/user";
import { MongoClient, MongoError } from 'mongodb';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import { statusResponse } from "../utils/http_response";
import bcrypt from 'bcrypt';
import { jwtDecodeToken, jwtEndcode } from "../utils";
import { TokenData } from "../common/token_data";
import { TeacherInfo, TeacherModel } from "../models/teacher";
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
                console.log("=====");
                const teacherModel = new TeacherModel({ "userId": createdUser._id, ...user });
                console.log(teacherModel);
                await teacherModel.save();
            }
            if (userType == UserType.STUDENT) {//hoc sinh

            }
            if (userType == UserType.PARENT) {//phu huynh

            }
        } catch (error) {
            console.log(error);
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

const loginWithSessionId = async (args: { sessionId: string }): Promise<UserInfo | null> => {
    const { sessionId } = args;
    let payload = jwtDecodeToken(sessionId);
    const _tokenData = (payload as any) as TokenData;
    try {
        if (!payload) {
            //payload null
            throw new Exception({
                statusCode: StatusCode.unauthorized,
                status: ResponseStatus.token_valid,
                message: "JWT verification failed",
            });
        } else {
            const existingUser = await UserModel.findOne({ username: _tokenData.userName });
            if (!existingUser) {

                throw new Exception({
                    statusCode: StatusCode.unauthorized,
                    status: ResponseStatus.token_valid,
                    message: "JWT verification failed",
                });
            } else {
                const user = new UserInfo(existingUser);
                return Object.assign(user.toJson(), { sessionId: sessionId });
            }
        }
    } catch (error) {
        const errorMessage: string = (error as Exception).message;
        throw new Exception({ statusCode: (error as Exception).statusCode, message: errorMessage });
    }
}


//teacher 


//student



export default {
    insertManyUser,
    loginWithSessionId,
    login,
} 