export type TConsultStatus = 'approved' | 'created' | 'rejected' | 'done' | 'mentor_noshow' | 'mentee_noshow' | 'noshow';
export interface IConsult {
    id: number,
    date: Date,
    startTime: Date,
    endTime: Date,
    menteeId: number,
    status: TConsultStatus,
    consultContentList: {
        id: number,
        name: string,
        type: string;
    }[],
    company: string,
    divisIsPub: boolean,
    department?: string,
    job: string,
    nickname: string;
    inJob: string,
    duration: number,
}