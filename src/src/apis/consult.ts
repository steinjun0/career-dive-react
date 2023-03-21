import API from "API";
import { IConsult, TConsultStatus } from "interfaces/consult";
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

export function convertIConsultAPI2IConsult(consultAPI: IConsultAPI) {
    const startTime = new Date(consultAPI.Date);
    startTime.setHours(+consultAPI.StartTime.slice(0, consultAPI.StartTime.indexOf(':')));
    startTime.setMinutes(+consultAPI.StartTime.slice(consultAPI.StartTime.indexOf(':') + 1));
    const endTime = new Date(consultAPI.Date);
    endTime.setHours(+consultAPI.EndTime.slice(0, consultAPI.EndTime.indexOf(':')));
    endTime.setMinutes(+consultAPI.EndTime.slice(consultAPI.EndTime.indexOf(':') + 1));

    const consult: IConsult = {
        id: consultAPI.ID,
        date: new Date(consultAPI.Date),
        startTime: startTime,
        endTime: endTime,
        menteeId: consultAPI.MenteeId,
        status: consultAPI.Status,
        consultContentList: consultAPI.ConsultContentList.map((apiContent) => {
            return {
                id: apiContent.ID,
                name: apiContent.Name,
                type: apiContent.Type
            };
        }),
        company: consultAPI.CompName,
        divisIsPub: consultAPI.DivisIsPub,
        job: consultAPI.JobInComp,
        nickname: consultAPI.Nickname,
        inJob: consultAPI.InService,
        duration: consultAPI.TotEmpMonths,
    };
    return consult;
}