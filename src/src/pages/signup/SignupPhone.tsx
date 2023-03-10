import React from "react";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "util/Custom/CustomButton";
import { CenterFlex, TextBody2 } from "util/styledComponent";
import SignupTemplate from "./SignupTemplate";


export default function SignupPhone() {
  const navigate = useNavigate();

  const updatePhoneAuth = () => {
  };

  return <SignupTemplate title="회원가입" step="2/3">
    <CenterFlex style={{ flexDirection: 'column' }}>
      <CustomButton
        width={'100%'}
        onClick={() => { updatePhoneAuth(); navigate('/signup/nickname'); }}
        height="50px">
        휴대폰 본인 인증
      </CustomButton>
      <TextBody2 style={{ marginTop: 24 }}>입력하신 전화번호는 본인 인증 용도로만 사용됩니다</TextBody2>
    </CenterFlex>
  </SignupTemplate>;
}