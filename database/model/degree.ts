import { Document, Schema, model } from "mongoose";
import { DegreeInfo } from "../../models/degree";
export const degreeTable = "degree";


export interface DegreeDoc extends DegreeInfo, Document {
    _id: string;
}

const DregreeSchema = new Schema<DegreeInfo>({
    name: { type: String, unique: true },
    nameEN: { type: String, default: "" },
    type: { type: Number, default: -1 },
    description: { type: String, default: "" }
});

export const DegreeModel = model<DegreeInfo>(degreeTable, DregreeSchema, degreeTable);