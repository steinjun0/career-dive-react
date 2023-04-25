export interface IMentor {
    company: string,
    divisIsPub: boolean,
    department?: string,
    job: string,
    nickname: string,
    inJob: boolean,
    duration: number,
    rating: number,
    tags: string[],
    userId: number,
}