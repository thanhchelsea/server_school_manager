import { Request, Response } from 'express';
import { ResponseStatus, StatusCode } from '../common/status_response';
import { print } from '../helpers/print';

function getMessageFromStatus(status: ResponseStatus): string {
    let mess = "";
    switch (status) {
        case ResponseStatus.success:
            mess = "Success";
            break;
        case ResponseStatus.failure:
            mess = "Failure";
            break;
        case ResponseStatus.login_success:
            mess = "Login success";
            break;
        case ResponseStatus.login_failed:
            mess = "Login fail";
            break;
        case ResponseStatus.login_account_is_used:
            mess = "Account is used";
            break;
        case ResponseStatus.login_account_not_exists:
            mess = "Account not exists";
            break;
        case ResponseStatus.login_wrong_password:
            mess = "Wrong password";
            break;
        case ResponseStatus.register_account_is_used:
            mess = "Account is used";
            break;
        case ResponseStatus.token_valid:
            mess = "Token valid";
            break;
        default:
            break;
    }
    return mess;
}
export function statusResponse(args: { status: ResponseStatus, message?: string, data?: any, res: Response, statusCode?: number }) {
    const { status, message, data, res, statusCode } = args;
    let mess = message ?? getMessageFromStatus(status);
    const responseBody = { status: status, message: mess, data: data };
    res.status(statusCode ?? StatusCode.success).json(responseBody);
}
