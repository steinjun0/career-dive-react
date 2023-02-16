import { Box, Divider, TextField } from "@mui/material";
import { TextFieldWrapper } from "component/myPage/MenteeIntroduce";
import React, { useEffect, useState } from "react";
import { CustomButton } from "util/Custom/CustomButton";
import { CustomCheckbox } from "util/Custom/CustomCheckbox";
import { CustomPasswordTextField } from "util/Custom/CustomPasswordTextField";
import CustomTextField from "util/ts/Custom/CustomTextField";
import { CenterFlex, colorBackgroundGrayMedium, colorTextLight, EmptyHeight, Flex, RowAlignCenterFlex, TextCaption, TextHeading6, VerticalFlex } from "util/styledComponent";
import SignupTemplate from "./signup/SignupTemplate";
import { validateEmail, validatePassword } from "util/ts/util";



export default function Signup2() {
  const [email, setEmail] = useState<string>('')
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true)
  const [password, setPassword] = useState<string>('')
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true)

  useEffect(() => {
    if (email === '') {
      setIsEmailValid(true)
    } else {
      setIsEmailValid(validateEmail(email))
    }
  }, [email])

  useEffect(() => {
    console.log(password)
    if (password === '') {
      setIsPasswordValid(true)
    } else {
      setIsPasswordValid(validatePassword(password))
    }
  }, [password])

  return <SignupTemplate title="회원가입" step="1/3">
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div style={{ height: 72 }}>
        <CustomTextField
          onChange={(event) => { setEmail(event.target.value) }}
          placeholder="이메일"
          error={!isEmailValid}
          helperText={!isEmailValid ? "올바른 형식으로 입력해주세요" : undefined}
          height="48px"
        />
      </div>
      <VerticalFlex style={{ marginTop: '0' }}>
        <TextCaption style={{ marginLeft: '4px' }}>
          영문, 숫자, 특수문자 포함 8자 이상
        </TextCaption>
        <EmptyHeight height="12px" />
        <div style={{ height: 72 }}>
          <CustomTextField
            onChange={(event) => { setPassword(event.target.value) }}
            placeholder="비밀번호"
            error={!isPasswordValid}
            helperText={!isPasswordValid ? "비밀번호는 영문, 숫자, 특수문자 포함 8자 이상입니다." : undefined}
            height="48px"
            type="password"
          />
        </div>
      </VerticalFlex>

    </Box>
  </SignupTemplate>
}