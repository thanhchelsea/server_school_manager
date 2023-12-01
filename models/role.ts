import mongoose, { Document, Schema } from 'mongoose';


export const roleNameTable = "Role";

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
export interface RoleDoc extends RoleInfo, Document {
    _id: string;
}
const roleSchema = new Schema<RoleDoc>(
    {
        roleName: {
            type: String,
            required: true,
            unique: true,
        },
        createdAt: { type: Date, default: Date.now() },
        description: { type: String }
    },
    { timestamps: true }
);
export const RoleModel = mongoose.model<RoleDoc>(roleNameTable, roleSchema);