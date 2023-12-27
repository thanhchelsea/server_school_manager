


export class RoleInfo {
    roleName: string;
    createdAt: Date;
    description: string;
    constructor(args?: any) {
        if (!args) {
            args = {};
        }
        this.roleName = args.roleName ?? "";
        this.createdAt = args.createdAt ?? Date.now();
        this.description = args.description ?? "";
    }
}
