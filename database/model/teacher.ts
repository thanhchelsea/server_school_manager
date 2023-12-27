import { Schema, Document, model, Types } from 'mongoose';
import { TeacherInfo } from '../../models/teacher';
import { contractTable } from './contract';
import { userTable } from '../../models/user';
import { degreeTable } from './degree';


export const teacherTable = "teachers";


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
    about: { type: String, default: "" },
    PIN: { type: String, default: "" },
});

export const TeacherModel = model<TeacherInfo>(teacherTable, TeacherSchema, teacherTable);