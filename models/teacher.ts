import { Schema, Document, model, Types } from 'mongoose';
import { UserInfo, userTable } from './user';
import { DegreeType, DegreeInfo, degreeTable } from './degree';
import { ContractInfo, contractTable } from './contract';


const teacherTable = "Teacher";
enum GraduationType {
    UNDEFI = -1,
    NOT_GRADUATED = 0,
    FAIL = 1,//CHUA TOT NGHIEP
    AVERAGE = 2,//TRUNG BINH,
    GOOD = 3,//KHA
    EXCELLENT = 4,//gioi
    OUTSTANDING = 5,//XUAT SAC
}
export class TeacherInfo extends UserInfo {
    staffCode: string;
    degreeType: DegreeInfo;
    contract: ContractInfo;
    teacherGraduationInfo: string;//ten truong tot nghiep
    graduationType: GraduationType;//loai bang tot nghiep
    specialization: string;//ten chuyen nghanh
    teachingExperience: number;//kinh nghiem giang day number
    personalEmail: string;
    personnalPhone: string;
    teacherCertifications: DegreeInfo[];
    PIN: string;
    about: string;

    constructor(args?: any) {
        super(args);
        if (!args) {
            args = {};
        }

        this.staffCode = args.staffCode ?? "";
        this.degreeType = args.DegreeInfo ?? new DegreeInfo();
        this.contract = args.contract ?? new ContractInfo();
        this.teacherGraduationInfo = args.teacherGraduationInfo ?? "";
        this.specialization = args.specialization ?? "";
        this.teachingExperience = args.teachingExperience ?? 0;
        this.personalEmail = args.personalEmail ?? "";
        this.personnalPhone = args.personnalPhone ?? "";
        this.teacherCertifications = args.teacherCertifications ?? [];
        this.PIN = args.PIN ?? "";
        this.about = args?.about ?? "";

    }
}

export interface TeacherDoc extends TeacherInfo, Document {
    _id: string;
}
const TeacherSchema = new Schema<TeacherInfo & { userId?: string, degreeId?: string, contractId?: string }>({
    staffCode: { type: String, default: "" },
    userId: { type: Schema.Types.ObjectId, ref: userTable },
    degreeId: { type: Types.ObjectId, ref: degreeTable },
    contractId: { type: Types.ObjectId, ref: contractTable },
    teacherGraduationInfo: { type: String, default: "" },
    graduationType: { type: Number, default: -1 },
    specialization: { type: String, default: "" },
    teachingExperience: { type: Number, default: 0 },
    personalEmail: { type: String, default: "" },
    personnalPhone: { type: String, default: "" },
    teacherCertifications: [{ type: Types.ObjectId, ref: degreeTable }],
    PIN: { type: String, default: "" },
});

export const TeacherModel = model<TeacherInfo>(teacherTable, TeacherSchema);