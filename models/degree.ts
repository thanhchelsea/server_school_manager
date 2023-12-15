import { Document, Schema, model } from "mongoose";
export const degreeTable = "Degree";

export enum DegreeType {
    DEGREE = 0,//BANG DAI HOC/ CAO DANG
    CERTIFICATE = 1,//CHUNG CHI
    OTHER_SPECIALIZED_DEGREEE = 2,//Các Bằng Chuyên Sâu Khác
    CHUNG_CHI_BANG_CAP_NGAN_HAN = 3, //Được cấp sau khi hoàn thành một khóa học ngắn hạn, thường kéo dài từ vài tuần đến một năm.
    INTERNATIONAL_DEGREEE = 4,//Bằng Cấp Quốc Tế:
    UNDEFINE = -1,//KHONG Xac dinh
}

export class DegreeInfo {
    name: string;
    nameEN: string;
    type: DegreeType;
    description: string;

    constructor(args?: any) {
        if (!args) {
            args = {};
        }
        this.name = args?.name ?? "";
        this.nameEN = args?.nameEN ?? "";
        this.type = args?.type ?? DegreeType.UNDEFINE;
        this.description = args?.description ?? "";
    }
}

export interface DegreeDoc extends DegreeInfo, Document {
    _id: string;
}

const DregreeSchema = new Schema<DegreeInfo>({
    name: { type: String, unique: true },
    nameEN: { type: String, default: "" },
    type: { type: Number, default: -1 },
    description: { type: String, default: "" }
});

export const DegreeModel = model<DegreeInfo>(degreeTable, DregreeSchema, "Degree");