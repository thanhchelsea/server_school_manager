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

