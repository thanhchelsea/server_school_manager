import { Document, Schema, model } from "mongoose";
import { ContractInfo } from "../../models/contract";
export const contractTable = "contract";

export interface ContractDoc extends ContractInfo, Document {
    _id: string;
}

const DregreeSchema = new Schema<ContractInfo>({
    name: { type: String, unique: true },
    duration: { type: Number, default: -1 },
    description: { type: String, default: "" }
});

export const DegreeModel = model(contractTable, DregreeSchema, contractTable);