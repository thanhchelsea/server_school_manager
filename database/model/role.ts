import mongoose, { Document, Schema } from 'mongoose';
import { RoleInfo } from '../../models/role';


export const roleNameTable = "roles";

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