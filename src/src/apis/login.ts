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

export function validateEmail(email: string) {
  let regExpEmail = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
  if (regExpEmail.test(email) == false) {
    //이메일 형식이 알파벳+숫자@알파벳+숫자.알파벳+숫자 형식이 아닐경우            
    return false;
  };
  return true;
};

export function validatePassword(password: string) {
  let regExpPassword = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{8,50}$/;
  if (regExpPassword.test(password) == false) {
    // password 형식이 숫자, 영어, 특수문자가 아닌경우
    return false;
  };
  return true;
}