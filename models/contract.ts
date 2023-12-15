import { Document, Schema, model } from "mongoose";
export const contractTable = "Contract";


export class ContractInfo {
    name: string;
    duration: number;
    description: string;

    constructor(args?: any) {
        if (!args) {
            args = {};
        }
        this.name = args?.name ?? "";
        this.duration = args?.duration ?? -1;
        this.description = args?.description ?? "";
    }
}

export interface ContractDoc extends ContractInfo, Document {
    _id: string;
}

const DregreeSchema = new Schema<ContractInfo>({
    name: { type: String, unique: true },
    duration: { type: Number, default: -1 },
    description: { type: String, default: "" }
});

export const DegreeModel = model(contractTable, DregreeSchema, "contract");