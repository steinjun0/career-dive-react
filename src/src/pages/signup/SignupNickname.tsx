import { useTheme } from "@mui/material";
import API from "API";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "util/Custom/CustomButton";
import { CenterFlex, TextCaption, VerticalFlex } from "util/styledComponent";
import CustomTextField from "util/ts/Custom/CustomTextField";
import SignupTemplate from "./SignupTemplate";


export default function SignupNickname() {
  const navigate = useNavigate();
  const theme = useTheme();

  const [nickname, setNickname] = useState<string>('');
  const [nicknameIsValid, setNicknameIsValid] = useState<boolean>(true);
  const [nicknameHelperText, setNicknameHelperText] = useState<string>('');
  async function validateNickname() {
    if (nickname === '') {
      setNicknameHelperText('닉네임을 입력해주세요.');
      setNicknameIsValid(false);
      return false;
    }

    const res = await API.getAccountNicknameDuplicate(nickname);
    const isDuplicate = !res.data;
    if (isDuplicate) {
      setNicknameHelperText('이미 존재하는 닉네임이에요.');
    }
    else {
      setNicknameIsValid(true);
      return true;
    }
    setNicknameIsValid(false);
    return false;
  }

  useEffect(() => {
    if (nickname !== '')
      validateNickname();
  }, [nickname]);


  return <SignupTemplate title="닉네임 설정" step="2/2">
    <VerticalFlex
      sx={{
        justifyContent: 'start', height: '100%',
        [theme.breakpoints.down('sm')]: { justifyContent: 'space-between' }
      }}
    >
      <section style={{ marginTop: '0', width: '100%' }}>
        <TextCaption style={{}}>
          닉네임을 자유롭게 설정해보세요.
        </TextCaption>

        <div style={{ height: 72, marginTop: 12, width: '100%' }}>
          <CustomTextField
            onChange={(event) => {
              setNickname(event.target.value);
            }}
            inputProps={{ maxLength: 10 }}
            onFocus={() => { }}
            onBlur={() => { validateNickname(); }}
            placeholder="최대 10자"
            error={!nicknameIsValid}
            helperText={!nicknameIsValid ? nicknameHelperText : undefined}
            height="48px"
          />
        </div>
      </section>
      <CustomButton
        width={'100%'}
        onClick={async () => {
          if (nickname !== '' && nicknameIsValid) {
            const email = localStorage.getItem('signupEmail');
            const password = localStorage.getItem('signupPassword');
            const phoneNumber = localStorage.getItem('signupPhoneNumber');
            const isCheckMarketing = JSON.parse(localStorage.getItem('signupIsCheckMarketing')!);
            try {
              const accountCreateResponse = await API.postAccount({ email: email, password: password, nickname: nickname, phoneNumber: phoneNumber });
              if (accountCreateResponse.status === 200) {
                window.localStorage.setItem('UserID', accountCreateResponse.data.UserID);
                window.localStorage.setItem('AccessToken', accountCreateResponse.data.AccessToken);
                window.localStorage.setItem('RefreshToken', accountCreateResponse.data.RefreshToken);
                window.localStorage.setItem('IsMentor', accountCreateResponse.data['IsMentor']);
                window.localStorage.setItem('isAutoLogin', 'true');
                alert('회원가입이 완료되었습니다!');
                navigate('/mentee/mypage/profile');

              } else {
                alert(accountCreateResponse.data.error);
              }
            }
            catch {

            }
          }
        }}
        disabled={nickname === '' || !nicknameIsValid}
        height="50px">
        완료
      </CustomButton>
    </VerticalFlex>
  </SignupTemplate>;
}