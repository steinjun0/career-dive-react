import API from 'API';
import { AxiosResponse } from "axios";

export interface IPostAccountLoginRes {
  "UserID": number,
  "AccessToken": string,
  "RefreshToken": string,
  "SendbirdToken": string,
  "IsMentor": boolean,
  "Nickname": string,
}

export async function postAccountLogin(email: string, password: string): Promise<AxiosResponse & { data: IPostAccountLoginRes; }> {
  const res = await API.postAxios(`${API.CAREER_DIVE_API_URL}/account/login`, { email, password });
  return res;
}
