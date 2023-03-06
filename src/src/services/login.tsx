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