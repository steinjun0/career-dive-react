import { IPostAccountLoginRes } from "apis/login";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";

export function updateUserDataLocalStorage({ userData, isAutoLogin }: { userData: IPostAccountLoginRes, isAutoLogin: boolean; }) {
  window.localStorage.setItem('UserID', userData['UserID'].toString());
  window.localStorage.setItem('AccessToken', userData['AccessToken']);
  window.localStorage.setItem('RefreshToken', userData['RefreshToken']);
  window.localStorage.setItem('SendbirdToken', userData['SendbirdToken']);
  window.localStorage.setItem('IsMentor', userData['IsMentor'].toString());
  window.localStorage.setItem('IsMentorMode', userData['IsMentor'].toString());
  window.localStorage.setItem('Nickname', userData['Nickname']);

  window.localStorage.setItem('isAutoLogin', isAutoLogin.toString());
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

export function useValidation(
  { validationFunction,
    emptyHelperText,
    invalidHelperText
  }: {
    validationFunction?: (value: string) => boolean,
    emptyHelperText?: string;
    invalidHelperText?: string;
  }
): [string, Dispatch<SetStateAction<string>>, string, boolean, () => void] {
  const [value, setValue] = useState<string>('');
  const [helperText, setHelperText] = useState<string>('');
  const [isValueValid, setIsValueValid] = useState<boolean>(true);

  const updateHelperText = useCallback(() => {
    if (emptyHelperText && value === '') {
      setHelperText(emptyHelperText);
    } else if (invalidHelperText && validationFunction && !validationFunction(value)) {
      setHelperText(invalidHelperText);
    } else {
      setHelperText('');
    }
  }, [value]);

  useEffect(() => {
    // updateHelperText();
    setIsValueValid(true);
  }, [value]);

  useEffect(() => {
    if (helperText === '') {
      setIsValueValid(true);
    } else {
      setIsValueValid(false);
    }
  }, [helperText]);

  return [value, setValue, helperText, isValueValid, updateHelperText];

}