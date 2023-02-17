import API from "API";
import React, { useEffect, useState } from "react";
import { CustomButton } from "util/Custom/CustomButton";
import { CenterFlex, TextBody2, TextCaption } from "util/styledComponent";
import CustomTextField from "util/ts/Custom/CustomTextField";
import SignupTemplate from "./SignupTemplate";


export default function Signup2Nickname() {
  const [nickname, setNickname] = useState<string>('')
  const [nicknameIsValid, setNicknameIsValid] = useState<boolean>(true)
  const [nicknameHelperText, setNicknameHelperText] = useState<string>('')
  async function validateNickname() {
    if (nickname === '') {
      setNicknameHelperText('닉네임을 입력해주세요.')
      setNicknameIsValid(false)
      return false
    }

    const res = await API.getAccountNicknameDuplicate(nickname)
    const isDuplicate = !res.data
    if (isDuplicate) {
      console.log('hi')
      setNicknameHelperText('이미 존재하는 닉네임이에요.')
    }
    else {
      setNicknameIsValid(true)
      return true
    }
    setNicknameIsValid(false)
    return false
  }

  useEffect(() => {
    if (nickname !== '')
      validateNickname()
  }, [nickname])


  return <SignupTemplate title="닉네임 설정" step="3/3">
    <CenterFlex style={{ flexDirection: 'column' }}>
      <section style={{ marginTop: '0', width: '100%' }}>
        <TextCaption style={{}}>
          닉네임을 자유롭게 설정해보세요.
        </TextCaption>

        <div style={{ height: 72, marginTop: 12, width: '100%' }}>
          <CustomTextField
            onChange={(event) => {
              setNickname(event.target.value);
            }}
            onFocus={() => { }}
            onBlur={() => { validateNickname() }}
            placeholder="최대 10자"
            error={!nicknameIsValid}
            helperText={!nicknameIsValid ? nicknameHelperText : undefined}
            height="48px"
          />
        </div>
      </section>
      <CustomButton
        width={'100%'}
        onClick={() => { }}
        disabled={nickname === '' || !nicknameIsValid}
        height="50px">
        완료
      </CustomButton>
    </CenterFlex>
  </SignupTemplate>
}