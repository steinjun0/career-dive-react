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

export async function getAccountMentorList(): Promise<AxiosResponse & IGetAccountMentorAPI> {
    const mentorListRes = await API.getAxios(`${API.CAREER_DIVE_API_URL}/account/mentor/list?PageSize=1000`);
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