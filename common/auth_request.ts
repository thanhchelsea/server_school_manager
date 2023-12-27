import { Request } from 'express';
import { TokenData } from './token_data';

export default interface AuthRequest extends Request {
    credentials?: TokenData;
    token?: string;
}