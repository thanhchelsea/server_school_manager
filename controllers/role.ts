import { Request, Response } from 'express';
import { OutputType, print } from '../helpers/print';
import { statusResponse, } from '../utils/http_response';
import { ResponseStatus, StatusCode } from '../common/status_response';
import { Exception } from '../exceptions/Exceptions';
import { roleRepo } from '../repositories/index';
import asyncHandler from '../utils/asyncHandler';
import role from '../repositories/role';


const insertRole = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { roleName, description } = req.body;
        await roleRepo.insertRole(roleName, description);
        statusResponse({
            status: ResponseStatus.success,
            res: res,
        });
    } catch (error) {
        throw error;
    }
});

const getRoleByIds = asyncHandler(async (req: Request, res: Response) => {
    try {
        const roleIds: string[] = req.query.roleIds ? (req.query.roleIds as string).split(',') : [];
        const isGetAll = (req.query.isGetAll) === 'true';
        if (roleIds.length == 0 && !isGetAll) {
            throw new Exception({ statusCode: StatusCode.bad_request, message: "missed: roleIds:string[] or isGetAll:boolean" });
        }
        let roles = await roleRepo.getRoleByIds({ roleIds: roleIds, isGetAll: isGetAll });
        return statusResponse({
            status: ResponseStatus.success,
            res: res,
            data: roles,
        });
    } catch (error) {
        throw error;
    }
});

const deleteRoleByIds = asyncHandler(async (req: Request, res: Response) => {
    const { roleIds } = req.body;
    try {
        await role.deleteRoleByIds({ roleIds: roleIds });
        return statusResponse({
            status: ResponseStatus.success,
            res: res,
            message: "Delete success",
        });
    } catch (error) {
        throw error;
    }
});

export default {
    insertRole,
    getRoleByIds,
    deleteRoleByIds,
}