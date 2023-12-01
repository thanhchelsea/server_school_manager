import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './database/database';
import { errorHandler, notFoundHandler } from './middlewares/error_handler';
import { usersRouter, rolesRouter } from './routes/index';
import { OutputType, print } from './helpers/print';
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

    config() {
        this.app.use(express.json())
    }
    private useAPI() {
        this.app.use(PREFIX_API_USER, usersRouter);//router user for app
        this.app.use(PREFIX_API_ROLES, rolesRouter);
        this.app.use(errorHandler);
        this.app.use(notFoundHandler)
    }
}

export { App };