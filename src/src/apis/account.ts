import API from "API";
import { AxiosResponse } from "axios";
import { IMentor, IMentorRegisterData } from "interfaces/mentor";

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

export async function getAccountMentorList({ pageSize = 1000, pageNum = 1, job, company, tag, sector, compType, reviewScore, consultContent }:
    { pageSize?: number, pageNum?: number, job?: string, company?: string, tag?: string, sector?: string, compType?: string, reviewScore?: number, consultContent?: string; }): Promise<AxiosResponse<{ Count: number, NextPage: string, PreviousPage: string, Results: IMentor[]; }>> {
    function createQuery(pageSize: number, pageNum: number, job?: string, company?: string, tag?: string, sector?: string, compType?: string, reviewScore?: number, consultContent?: string) {
        let query = `PageSize=${pageSize}&PageNum=${pageNum}`;
        if (job) query += `&Job=${job}`;
        if (company) query += `&CompName=${company}`;
        if (tag) query += `&Tag=${tag}`;
        if (sector) query += `&Sector=${sector}`;
        if (compType) query += `&CompType=${compType}`;
        if (reviewScore) query += `&ReviewScore=${reviewScore}`;
        if (consultContent) query += `&ConsultContent=${consultContent}`;
        return query;
    }

    const mentorListRes = await API.getAxios(`${API.CAREER_DIVE_API_URL}/v2/account/mentor/list?${createQuery(pageSize, pageNum, job, company, tag, sector, compType, reviewScore, consultContent)}`);
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

export async function postAccountMentor(registerData: IMentorRegisterData): Promise<AxiosResponse> {
    const convertedTags = registerData.tags!.map((tag) => {
        return { Name: tag };
    });
    const scheduleRes = await API.postAxios(`${API.CAREER_DIVE_API_URL}/account/mentor`,
        {
            Mentor: {
                Inservice: registerData.inJob,
                Sector: registerData.sector,
                Job: registerData.job,
                JobInComp: registerData.jobInComp,
                DivisInComp: registerData.department,
                DivisIsPub: registerData.divisIsPub,
                CompName: registerData.company
            },
            Tags: convertedTags
        });
    return scheduleRes;
}

export async function postAccountMentorFile({ id, file }: { id: number, file: FormData; }): Promise<AxiosResponse> {
    const scheduleRes = await API.postAxiosFormData(`${API.CAREER_DIVE_API_URL}/account/mentor/${id}/file`, file);
    return scheduleRes;
}