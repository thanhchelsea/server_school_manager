import { print, OutputType } from '../helpers/print';
import { Exception } from '../exceptions/Exceptions';
import { RoleModel, RoleDoc, RoleInfo } from '../models/role';
import { ResponseStatus, StatusCode } from '../common/status_response';
import { statusResponse } from '../utils/http_response';
const insertRole = async (roleName: string, description: string) => {
    try {
        const roleExists = await RoleModel.findOne({ roleName: roleName });
        if (roleExists) {
            //role đã tồn tại
            throw new Exception({ message: Exception.ROLE_EXISTS });
        }
        const role = new RoleModel({
            roleName: roleName,
            description: description,
        });
        await role.save();
    } catch (error) {
        const errorMessage: string = (error as Error).message;
        throw new Exception({ statusCode: StatusCode.internal_server_error, message: errorMessage });
    }
}

const getRoleByIds = async (args: { isGetAll: boolean, roleIds: string[] }): Promise<RoleDoc[]> => {
    try {
        const { roleIds, isGetAll } = args;
        let roles: RoleDoc[] = [];
        const condition = isGetAll == true ? {} : { _id: { $in: roleIds } };
        roles = await RoleModel.find(
            condition,
            { _id: 0, __v: 0 }
        );
        return roles;
    } catch (error) {
        const errorMessage: string = (error as Error).message;
        throw new Exception({ statusCode: StatusCode.internal_server_error, message: errorMessage });
    }
}
const deleteRoleByIds = async (args: { roleIds: string[] }) => {
    const { roleIds } = args;
    try {
        const results = await RoleModel.deleteMany({ _id: { $in: roleIds } })
        if (results.deletedCount <= 0) {
            throw new Exception({ statusCode: StatusCode.success, message: "Roles not found" });
        }
    } catch (error) {
        const errorMessage: string = (error as Error).message;
        throw new Exception({ statusCode: StatusCode.internal_server_error, message: errorMessage });
    }
}

export default {
    insertRole,
    getRoleByIds,
    deleteRoleByIds,
}