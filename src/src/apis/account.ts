import API from "API"
import { AxiosResponse } from "axios"
import { IMentor } from "interfaces/mentor"

export interface IMentorAPI {
    CompName: string,
    DivisIsPub: boolean,
    DivisInComp: string,
    JobInComp: string,
    Nickname: string
    InService: string,
    TotEmpMonths: number,
    TagList: string[],
    UserID: number,
}

export async function getAccountMentorList(): Promise<AxiosResponse & { data: IMentor[] }> {
    const mentorListRes = await API.getAxios(`${API.CAREER_DIVE_API_URL}/account/mentor/list?PageSize=1000`)
    mentorListRes.data.Results = mentorListRes.data.Results.map((e: IMentorAPI): IMentor => {
        return {
            company: e.CompName,
            department: e.DivisInComp,
            divisIsPub: e.DivisIsPub,
            duration: e.TotEmpMonths,
            inJob: e.InService,
            job: e.JobInComp,
            nickname: e.Nickname,
            rating: 4.5,
            tags: e.TagList,
            userId: e.UserID
        }
    })
    return mentorListRes
}