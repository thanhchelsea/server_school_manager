import mongoose, { Document, Schema } from "mongoose";
import { StatusUser, UserInfo, userTable } from "../../models/user";
import { IUserActiveDB } from "../interfaces/user_interfaces";
import { TeacherModel, teacherTable } from "./teacher";
import { roleNameTable } from "./role";
import { positionNameTable } from "./position";
import { degreeTable } from "./degree";
import { contractTable } from "./contract";

export interface UserDoc extends UserInfo, Document {
    _id: string;
    role: String;
    positions: String[];
}

const UserSchema = new mongoose.Schema<UserDoc>(
    {
        username: { type: String, required: true, unique: true, },
        password: { type: String, required: true },
        firstName: { type: String },
        lastName: { type: String },
        fullName: { type: String },
        phoneNumber: { type: String, required: true },
        email: { type: String, required: true },
        dateOfBirth: { type: Date, default: Date.now() },
        gender: { type: Number, required: true },
        address: { type: String, required: true },
        createDate: { type: Date, default: Date.now() },
        nickName: { type: String },
        avatarUrl: { type: String },
        status: { type: Number, default: StatusUser.Active },
        role: { type: Schema.Types.ObjectId, ref: roleNameTable },
        positions: [{ type: Schema.Types.ObjectId, ref: positionNameTable }],

    },
    {
        versionKey: false,
        timestamps: true
    }
);

export const UserModel = mongoose.model<UserDoc>(userTable, UserSchema);


export class UserDB implements IUserActiveDB {
    async findByUserUsername(args: { username: string }): Promise<any> {
        const { username } = args;
        const result = await UserModel.aggregate([
            {
                //fillter theo username
                $match: { username: username }
            },
            {
                $lookup: {
                    from: roleNameTable,
                    localField: 'role',
                    foreignField: '_id',
                    as: 'role',
                }
            },
            {
                $unwind: '$role'
            },
            {
                $lookup: {
                    from: positionNameTable,
                    localField: 'positions',
                    foreignField: '_id',
                    as: 'positions',
                }
            },
            //teacher
            {
                $lookup: {
                    from: teacherTable,
                    // localField: '_id',
                    // foreignField: 'userId',
                    let: { userId: '$_id' },
                    pipeline: [
                        {
                            //so sanh _id cua user vs userid trong bang teacher
                            $match: {
                                $expr: { $eq: ['$userId', '$$userId'] },
                                // Thêm các điều kiện lọc trong bảng teachers nếu cần

                            },
                        },
                        {
                            $lookup: {
                                from: degreeTable,
                                localField: "degreeId",
                                foreignField: "_id",
                                as: "degree",
                            },

                        },
                        {
                            $unwind: {
                                path: "$degree"
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                __v: 0,
                            },
                        },
                        {
                            $lookup: {
                                from: contractTable,
                                localField: "contractId",
                                foreignField: "_id",
                                as: "contract",
                            }
                        }, {
                            $project: {
                                _id: 0,
                                __v: 0,
                            },
                        },
                        {
                            $lookup: {
                                from: degreeTable,
                                localField: "teacherCertifications",
                                foreignField: "_id",
                                as: "teacherCertifications",
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                __v: 0,
                            },
                        },
                    ],
                    as: "teacherInfo",
                }
            },
            {
                $unwind: { path: "$teacherInfo", preserveNullAndEmptyArrays: true }
            },
            //student

            //khong lay ra thi =0, lay ra =1
            {
                $project: {
                    _id: 0,
                    __v: 0,
                },
            },

        ]);//
        return result[0];

    }

}