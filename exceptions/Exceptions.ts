import { StatusCode, ResponseStatus } from '../common/status_response'

export class Exception extends Error {

    static ROLE_EXISTS = "Role is existed";
    static ACCOUNT_IS_EXISTED: "Account is existed";
    static WRONG_USERNAME_OR_PASSWORD: "Wrong username or password";
    // message: string;
    statusCode: number;
    status: number;

    data?: any;
    constructor(args: { statusCode?: number, status?: number, message?: string, data?: any }) {
        const { statusCode, status, message, data } = args;
        super();
        this.message = message ?? "";
        this.statusCode = statusCode ?? StatusCode.bad_request;
        this.data = data;
        this.status = status ?? ResponseStatus.failure;
    }
}