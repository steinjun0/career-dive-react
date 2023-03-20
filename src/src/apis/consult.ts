import API from "API";
import { TConsultStatus } from "interfaces/consult";
import { IMentorAPI } from "./account";

export interface IConsultAPI extends IMentorAPI {
    ID: number,
    CreatedAt: string,
    Date: string,
    StartTime: string,
    EndTime: string,
    MenteeId: number,
    Status: TConsultStatus,
    Approved: boolean,
    ConsultContentList: {
        ID: number,
        Name: string,
        Type: string;
    }[];
}

interface IGetConsultMenteeAPI {
    data: IConsultAPI[];
}

export async function getConsultMenteeList(id: Number, status: TConsultStatus | ''): Promise<IGetConsultMenteeAPI> {
    const accountRes = await API.getAxios(`${API.CAREER_DIVE_API_URL}/consult/mentee/${id}/list?status=${status}`);
    return accountRes;
}