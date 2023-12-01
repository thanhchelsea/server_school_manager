import { StatusCode } from "../common/status_response";
import { Exception } from "../exceptions/Exceptions";
import { UserDoc, UserModel } from "../models/user";

const insertManyUser = async (users: UserDoc[]) => {
    try {
        await UserModel.insertMany(users, { ordered: false });
        console.log('All users inserted successfully.');
    } catch (error) {
        const errorMessage: string = (error as Error).message;
        throw new Exception({ status: StatusCode.internal_server_error, message: errorMessage });
    }
}
export default {
    insertManyUser
}