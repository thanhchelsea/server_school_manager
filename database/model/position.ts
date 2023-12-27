import mongoose, { Document, Schema } from 'mongoose';
import { PositionInfo } from '../../models/position';


export const positionNameTable = "positions";

export interface PositionDoc extends PositionInfo, Document {
    _id: string;
}
const roleSchema = new Schema<PositionDoc>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        createdAt: { type: Date, default: Date.now() },
        description: { type: String }
    },
    { timestamps: true }
);
export const RoleModel = mongoose.model<PositionDoc>(positionNameTable, roleSchema, positionNameTable);