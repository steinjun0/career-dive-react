import API from "API";
import { AxiosResponse } from "axios";
import { IMentor } from "interfaces/mentor";

export interface IMentorAPI {
    CompName: string,
    DivisIsPub: boolean,
    DivisInComp: string,
    JobInComp: string,
    Nickname: string;
    InService: boolean,
    TotEmpMonths: number,
    TagList: string[],
    UserID: number,
}

interface IGetAccountMentorAPI {
    data: IMentor[];
}

function convertMentorAPIToMentor(mentor: IMentorAPI) {
    return {
        company: mentor.CompName,
        divisIsPub: mentor.DivisIsPub,
        department: mentor.DivisInComp,
        job: mentor.JobInComp,
        nickname: mentor.Nickname,
        inJob: mentor.InService,
        duration: mentor.TotEmpMonths,
        rating: 0,
        tags: mentor.TagList,
        userId: mentor.UserID,
    } as IMentor;
}

export async function getAccountMentor(id: number): Promise<AxiosResponse<IMentor>> {
    const accountMentorRes = await API.getAxios(`${API.CAREER_DIVE_API_URL}/account/mentor/${id}`);
    accountMentorRes.data = convertMentorAPIToMentor(accountMentorRes.data);
    return accountMentorRes;
}

export async function getAccountMentorList({ pageSize = 1000, pageNum = 1 }: { pageSize?: number, pageNum?: number; }): Promise<AxiosResponse<{ Count: number, NextPage: string, PreviousPage: string, Results: IMentor[]; }>> {
    const mentorListRes = await API.getAxios(`${API.CAREER_DIVE_API_URL}/account/mentor/list?PageSize=${pageSize}&PageNum=${pageNum}`);
    mentorListRes.data.Results = mentorListRes.data.Results.map(convertMentorAPIToMentor);
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