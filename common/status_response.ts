// import { SUCCESS, FAIL } from '../constraint';

const SUCCESS = 1;
const FAIL = 0;
const LOGIN_FAILED = 0;
const LOGIN_SUCCESS = 1;
const LOGIN_ACCOUNT_IS_USED = 2;
const LOGIN_ACCOUNT_NOT_EXIST = 3;
const LOGIN_WRONG_PASSWORD = 4;
const TOKEN_VALID = 5;
const REGISTER_ACCOUNT_IS_USED = 6;

//status code tra ve...
export enum StatusCode {
    success = 200,
    create = 201,
    found = 302,
    bad_request = 400,
    unauthorized = 401,
    not_found = 404,
    internal_server_error = 500,
}


//status tra ve 
export enum ResponseStatus {
    success = SUCCESS,
    failure = FAIL,
    login_failed = LOGIN_FAILED,
    login_success = LOGIN_SUCCESS,
    login_account_is_used = LOGIN_ACCOUNT_IS_USED,
    login_account_not_exists = LOGIN_ACCOUNT_NOT_EXIST,
    login_wrong_password = LOGIN_WRONG_PASSWORD,
    token_valid = TOKEN_VALID,
    register_account_is_used = REGISTER_ACCOUNT_IS_USED,
}


