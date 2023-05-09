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
    birth: string | null,
    careerFile: FileWithPath | null,
    inJob: boolean | null,
    company: string | null,
    divisIsPub: boolean | null,
    sector: Sector | null,
    job: Job | null,
    jobInComp: string | null,
    department: string | null,
    tags: string[] | null,
    consultList: string[] | null,
    typeList: string[] | null,
}