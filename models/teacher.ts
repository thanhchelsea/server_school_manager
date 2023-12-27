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
        console.log(args.degree);
        this.staffCode = args.staffCode ?? "";
        this.degreeType = new DegreeInfo(args.degree);
        this.contract = args.contractId ?? new ContractInfo();
        this.teacherGraduationInfo = args.teacherGraduationInfo ?? "";
        this.specialization = args.specialization ?? "";
        this.teachingExperience = args.teachingExperience ?? 0;
        this.personalEmail = args.personalEmail ?? "";
        this.personnalPhone = args.personnalPhone ?? "";
        this.teacherCertifications = args.teacherCertifications ?? [];
        this.PIN = args.PIN ?? "";
        this.about = args?.about ?? "";

    }

    toJson() {
        // super.toJson();
        let jsonObject = Object.assign(this);
        return jsonObject;
    }
}

