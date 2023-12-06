import { Request, Response, NextFunction, RequestHandler } from "express";
import { Exception } from '../exceptions/Exceptions';
import { ResponseStatus, StatusCode } from '../common/status_response';
import { print } from "../helpers/print";
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

    if (err) {
        if (err instanceof Exception) {
            let message: string = "";

            switch (err.statusCode) {
                case StatusCode.bad_request:
                    message = "Bad request";
                    break;
                case StatusCode.internal_server_error:
                    message = "Internal server error";
                    break;
                case StatusCode.not_found:
                    message = `Endpoint ${req.method} ${req.url} Not Found`;
                    break;
                case StatusCode.unauthorized:
                    message = "Unauthorized";
                    break;
                default:
                    message = "Internal server error";
                    break;
            }
            return res.status(err.statusCode).json({
                status: err.status,
                message: err.message || message,
                data: err.data,
            })
        }
    }
    return next();
}
export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        status: ResponseStatus.failure,
        message: `Endpoint ${req.method} ${req.url} Not Found`

    });

    return next();
};