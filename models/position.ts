


export class PositionInfo {
    name: string;
    createdAt: Date;
    description: string;
    constructor(args?: any) {
        if (!args) {
            args = {};
        }
        this.name = args.roleName ?? "";
        this.createdAt = args.createdAt ?? Date.now();
        this.description = args.description ?? "";
    }
}
