

export interface IUserActiveDB {
    ///tra ra user co role cac
    findByUserUsername(args: { username: string }): Promise<any>;
}