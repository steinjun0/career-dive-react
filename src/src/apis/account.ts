import API from "API";
import { AxiosResponse } from "axios";
import { IMentor } from "interfaces/mentor";

export interface IMentorAPI {
    CompName: string,
    DivisIsPub: boolean,
    DivisInComp: string,
    JobInComp: string,
    Nickname: string;
    InService: string,
    TotEmpMonths: number,
    TagList: string[],
    UserID: number,
}

interface IGetAccountMentorAPI {
    data: IMentor[];
}


export async function getAccountMentor(id:number):Promise<AxiosResponse & IMentorAPI> {
    const accountMentorRes = await API.getAxios(`${API.CAREER_DIVE_API_URL}/account/mentor/${id}`)
    accountMentorRes.data = {
        company: accountMentorRes.data.CompName,
        divisIsPub: accountMentorRes.data.DivisIsPub,
        department: accountMentorRes.data.DivisInComp,
        job: accountMentorRes.data.JobInComp,
        nickname: accountMentorRes.data.Nickname,
        inJob: accountMentorRes.data.InService,
        duration: accountMentorRes.data.TotEmpMonths,
        rating: 0,
        tags: accountMentorRes.data.TagList,
        userId: accountMentorRes.data.UserID, 
    } as IMentor
    return accountMentorRes
}

export async function getAccountMentorList({ pageSize = 1000, pageNum = 1 }: { pageSize?: number, pageNum?: number; }): Promise<AxiosResponse & IGetAccountMentorAPI> {
    const mentorListRes = await API.getAxios(`${API.CAREER_DIVE_API_URL}/account/mentor/list?PageSize=${pageSize}&PageNum=${pageNum}`);
    return mentorListRes;
}

export interface IPostAccountLoginAPI {
    data: {
        "UserID": number,
        "AccessToken": string,
        "RefreshToken": string,
        "SendbirdToken": string,
        "IsMentor": boolean,
        "Nickname": string,
    };
}

export async function postAccountLogin(email: string, password: string): Promise<AxiosResponse & IPostAccountLoginAPI> {
    const res = await API.postAxios(`${API.CAREER_DIVE_API_URL}/account/login`, { email, password });
    return res;
}

export async function postAccountValid(accessToken: string): Promise<AxiosResponse & { data: boolean; }> {
    const res = await API.postAxios(`${API.CAREER_DIVE_API_URL}/account/valid`, { 'AccessToken': accessToken });
    return res;
};

export async function postAccountRenew(refreshToken: string): Promise<AxiosResponse & { data: boolean; }> {
    const res = await API.postAxios(`${API.CAREER_DIVE_API_URL}/account/renew`, { 'RefreshToken': refreshToken });
    return res;
}