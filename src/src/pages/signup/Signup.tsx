import { Divider, styled, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CustomButton } from "util/Custom/CustomButton";
import { CustomCheckbox } from "util/Custom/CustomCheckbox";
import CustomTextField from "util/ts/Custom/CustomTextField";
import { colorBackgroundGrayMedium, colorCareerDiveBlue, colorTextLight, EmptyHeight, Flex, RowAlignCenterFlex, TextBody2, TextCaption, TextHeading6, VerticalFlex } from "util/styledComponent";
import SignupTemplate from "./SignupTemplate";
import *  as util from "util/ts/util";
import API from "API";
import { useNavigate } from "react-router-dom";

const TermsButton = styled(Flex)({
  justifyContent: 'center',
  alignItems: 'center',
  border: `1px solid ${colorBackgroundGrayMedium}`,
  borderRadius: '2px',
  width: '39px',
  height: '20px',
  fontSize: '10px',
  color: colorTextLight,
  cursor: 'pointer'
});

export default function Signup() {
  const navigate = useNavigate();
  const theme = useTheme();

  const [email, setEmail] = useState<string>('');
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [password, setPassword] = useState<string>('');
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState<boolean>(true);

  const [isCheckUsingTerm, setIsCheckUsingTerm] = useState(false);
  const [isCheckPersonalData, setIsCheckPersonalData] = useState(false);
  const [isCheckMarketing, setIsCheckMarketing] = useState(false);
  const [isCheckAll, setIsCheckAll] = useState(false);

  const [emailHelperText, setEmailHelperText] = useState<string>('');
  const [passwordHelperText, setPasswordHelperText] = useState<string>('');
  const [phoneNumberHelperText, setPhoneNumberHelperText] = useState<string>('');


  function toggleAll() {
    if (isCheckUsingTerm &&
      isCheckPersonalData &&
      isCheckMarketing) {
      setIsCheckUsingTerm(false);
      setIsCheckPersonalData(false);
      setIsCheckMarketing(false);
    }
    else {
      setIsCheckUsingTerm(true);
      setIsCheckPersonalData(true);
      setIsCheckMarketing(true);
    }
  }

  async function validateEmail() {
    if (email === '') {
      setEmailHelperText('이메일을 입력해주세요');
    } else if (!util.validateEmail(email)) {
      setEmailHelperText('올바른 이메일 형식을 입력해 주세요.');
    } else {
      const res = await API.getAccountEmailDuplicate(email);
      if (!res.data) {
        setEmailHelperText('이미 존재하는 이메일이에요.');
      } else {
        setIsEmailValid(true);
        return true;
      }
    }
    setIsEmailValid(false);
    return false;
  }

  function validatePassword() {

    if (password === '') {
      setPasswordHelperText('비밀번호를 입력해 주세요.');
    } else if (!util.validatePassword(password)) {
      setPasswordHelperText('영문, 숫자, 특수문자를 혼합하여 8자 이상으로 설정해주세요.');
    } else {
      setIsPasswordValid(true);
      return true;
    }
    setIsPasswordValid(false);
    return false;
  }

  async function validatePhoneNumber() {
    if (phoneNumber === '') {
      setPhoneNumberHelperText('전화번호를 입력해주세요');
    } else if (phoneNumber.length <= 10) {
      setPhoneNumberHelperText('올바른 전화번호를 입력해 주세요.');
    } else {
      const res = await API.getAccountPhoneDuplicate(phoneNumber);
      if (!res.data) {
        setPhoneNumberHelperText('이미 존재하는 번호에요.');
      } else {
        setIsPhoneNumberValid(true);
        return true;
      }
    }
    setIsPhoneNumberValid(false);
    return false;
  }

  useEffect(() => {
    setIsEmailValid(true);
  }, [email]);

  useEffect(() => {
    setIsPasswordValid(true);
  }, [password]);

  useEffect(() => {
    setIsPhoneNumberValid(true);
  }, [phoneNumber]);

  useEffect(() => {
    if (isCheckUsingTerm && isCheckPersonalData && isCheckMarketing) {
      setIsCheckAll(true);
    } else {
      setIsCheckAll(false);
    }
  }, [isCheckUsingTerm, isCheckPersonalData, isCheckMarketing]);

  return <SignupTemplate title="회원가입" step="1/2">
    <VerticalFlex sx={{
      justifyContent: 'start', height: '100%',
      [theme.breakpoints.down('sm')]: { justifyContent: 'space-between' }
    }}>
      <VerticalFlex>
        <section style={{ height: 72 }}>
          <CustomTextField
            onChange={(event) => { setEmail(event.target.value); }}
            onBlur={(event) => { validateEmail(); }}
            placeholder="이메일"
            error={!isEmailValid}
            helperText={!isEmailValid ? emailHelperText : undefined}
            height="48px"
          />
        </section>

        <section>
          <TextCaption style={{ marginLeft: '14px' }}>
            영문, 숫자, 특수문자 포함 8자 이상
          </TextCaption>
          <EmptyHeight height="12px" />
          <div style={{ height: 72 }}>
            <CustomTextField
              onChange={(event) => { setPassword(event.target.value); }}
              onFocus={() => { validateEmail(); }}
              onBlur={() => { validatePassword(); }}
              placeholder="비밀번호"
              error={!isPasswordValid}
              helperText={!isPasswordValid ? passwordHelperText : undefined}
              height="48px"
              type="password"
            />
          </div>
        </section>

        <section>
          <TextCaption style={{ marginLeft: '14px' }}>
            입력하신 전화번호는 본인 인증 및 알림 용도로만 사용됩니다.
          </TextCaption>
          <EmptyHeight height="12px" />
          <div style={{ height: 72 }}>
            <CustomTextField
              onKeyDown={(event) => {
                const keyWhiteList = ['ArrowLeft', 'ArrowRight', 'Backspace', 'Delete', 'Home', 'End'];
                if (!keyWhiteList.includes(event.key) && isNaN(+event.key)) {
                  event.preventDefault();
                }
              }}
              onChange={(event) => {
                setPhoneNumber(event.target.value);
              }}
              onFocus={() => { validateEmail(); validatePassword(); }}
              onBlur={() => { validatePhoneNumber(); }}
              placeholder="휴대폰번호"
              error={!isPhoneNumberValid}
              helperText={!isPhoneNumberValid ? phoneNumberHelperText : undefined}
              height="48px"
              type="tel"
            />
          </div>
        </section>

        <section>
          <Flex style={{ marginTop: '4px', justifyContent: 'space-between' }}>
            <Flex>
              <CustomCheckbox isChecked={isCheckUsingTerm} setIsChecked={setIsCheckUsingTerm} onClick={undefined} children={undefined} />
              <TextBody2
                style={{ marginLeft: 4, color: colorTextLight, cursor: 'pointer' }}
                onClick={(e) => { setIsCheckUsingTerm(!isCheckUsingTerm); }}>
                이용약관 <span style={{ color: colorCareerDiveBlue }}>(필수)</span>
              </TextBody2>
            </Flex>
            <TermsButton>
              약관
            </TermsButton>
          </Flex>
          <Flex style={{ marginTop: '12px', justifyContent: 'space-between' }}>
            <Flex>
              <CustomCheckbox isChecked={isCheckPersonalData} setIsChecked={setIsCheckPersonalData} onClick={undefined} children={undefined} />
              <TextBody2
                style={{ marginLeft: 4, color: colorTextLight, cursor: 'pointer' }}
                onClick={(e) => { setIsCheckPersonalData(!isCheckPersonalData); }}>
                개인 정보 활용 동의 <span style={{ color: colorCareerDiveBlue }}>(필수)</span>
              </TextBody2>
            </Flex>
            <TermsButton>
              약관
            </TermsButton>
          </Flex>
          <Flex style={{ marginTop: '12px', justifyContent: 'space-between' }}>
            <Flex>
              <CustomCheckbox isChecked={isCheckMarketing} setIsChecked={setIsCheckMarketing} onClick={undefined} children={undefined} />
              <TextBody2
                style={{ marginLeft: 4, color: colorTextLight, cursor: 'pointer' }}
                onClick={(e) => { setIsCheckMarketing(!isCheckMarketing); }}>
                개인 정보 활용 동의 (선택)
              </TextBody2>
            </Flex>
            <TermsButton>
              약관
            </TermsButton>
          </Flex>

          <Divider style={{ margin: '12px 0', color: colorBackgroundGrayMedium }}></Divider>
          <Flex>
            <CustomCheckbox isChecked={isCheckAll} setIsChecked={setIsCheckAll} onClick={toggleAll} children={undefined} />
            <TextBody2 style={{ marginLeft: 4, color: colorTextLight, cursor: 'pointer' }} onClick={(e) => { toggleAll(); }}>전체 동의</TextBody2>
          </Flex>
        </section>
      </VerticalFlex>

      <CustomButton
        style={{ marginTop: 24 }}
        disabled={!isCheckPersonalData || !isCheckUsingTerm || email === '' || password === '' || !isEmailValid || !isPasswordValid || !isPhoneNumberValid}
        height={'48px'}
        onClick={async () => {
          let emailTemp = await validateEmail();
          let passwordTemp = validatePassword();
          let phoneNumberTemp = await validatePhoneNumber();
          if (emailTemp && passwordTemp && phoneNumberTemp) {
            localStorage.setItem('signupEmail', email);
            localStorage.setItem('signupPassword', password);
            localStorage.setItem('signupIsCheckMarketing', isCheckMarketing.toString());
            localStorage.setItem('signupPhoneNumber', phoneNumber);

            navigate('/signup/nickname');
          }
        }}>
        다음
      </CustomButton>
    </VerticalFlex>
  </SignupTemplate>;
}