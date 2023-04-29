import { FileWithPath } from "react-dropzone";
import { Job, Sector } from "./job";

export interface IMentor {
    company: string,
    divisIsPub: boolean,
    department?: string,
    job: string,
    jobInComp?: string,
    nickname: string,
    inJob: boolean,
    duration: number,
    rating: number,
    tags: string[],
    userId: number,
}

export interface IMentorRegisterData {
    birth: string,
    careerFile: FileWithPath | null,
    company: string,
    divisIsPub: boolean,
    sector: Sector,
    job: Job,
    jobInComp: string,
    department: string,
    tags: string[],
    consultList: string[],
    typeList: string[],
}