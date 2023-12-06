import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './database/database';
import { errorHandler, notFoundHandler } from './middlewares/error_handler';
import { usersRouter, rolesRouter } from './routes/index';
import { OutputType, print } from './helpers/print';
import cookieParser from 'cookie-parser';
import cors from "cors";
import helmet from "helmet";
dotenv.config();



const PREFIX_API = "/api";
const PREFIX_APP_API = "/api/app";
const PREFIX_API_ROLES = "/api/app/roles";
const PREFIX_API_USER = "/api/app/user";

class App {
    public app: express.Application;
    public port: string | number;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3001;

        this.config();
        this.useAPI();
    }
    run() {
        this.app.listen(this.port, () => {
            print(`server running port ${this.port} `, OutputType.SUCCESS);
        })
        connectDB();
    }

    private config() {
        const NODE_ENV = process.env.NODE_ENV || 'development';
        this.app.use(helmet());
        this.app.use(cookieParser());
        this.app.use(cors({
            origin: "*"
                ? (process.env.ALLOWED_ORIGIN ? process.env.ALLOWED_ORIGIN.split(',') : true) : true,
            credentials: true,
            allowedHeaders: 'X-PINGOTHER, Content-Type, Authorization, X-Forwarded-For, x-requested-with, x-access-token',
            methods: 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS',
            optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
        }));
        this.app.use(express.json({ limit: "50mb" }));
        this.app.use(express.urlencoded({ extended: true, limit: "50mb" }));
    }
    private useAPI() {
        this.app.use(PREFIX_API_USER, usersRouter);//router user for app
        this.app.use(PREFIX_API_ROLES, rolesRouter);
        this.app.use(errorHandler);
        this.app.use(notFoundHandler)
    }
}

export { App };