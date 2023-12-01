import { StatusCode } from '../common/status_response'

export class Exception extends Error {

    static ROLE_EXISTS = "Role is existed";
    static ACCOUNT_IS_EXISTED: "Account is existed";
    static WRONG_USERNAME_OR_PASSWORD: "Wrong username or password";


    // message: string;
    status: number;
    data?: any;
    constructor(args: { status?: number, message?: string, data?: any }) {
        const { status, message, data } = args;
        super();
        this.message = message ?? "";
        this.status = status ?? StatusCode.bad_request;
        this.data = data;
    }
}