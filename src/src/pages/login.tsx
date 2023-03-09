import { useContext, useEffect, useState } from 'react';

import { Backdrop, styled, useTheme, } from "@mui/material";

import {
    VerticalFlex,
    TextHeading6,
    Flex,
    TextBody2,
    RowAlignCenterFlex,
    colorTextLight,
    EmptyHeight,
    LinkNoDeco,
    TextSubtitle2,
} from "util/styledComponent";
import { CustomButton } from 'util/Custom/CustomButton';
import { CustomCheckbox } from 'util/Custom/CustomCheckbox.js';
import { useNavigate } from 'react-router-dom';
import CustomTextField from "util/ts/Custom/CustomTextField";
import * as accountAPI from 'apis/account';
import { updateUserDataLocalStorage, useValidation, validateEmail } from 'services/login';
import React from "react";
import { AccountDataContext } from 'index';



const SubButtons = styled(TextBody2)`
  color: ${colorTextLight};
  cursor: pointer;
`;


const SignUpText = styled(TextSubtitle2)`
  text-decoration: underline;
  margin-top: 6px;
`;

function Login() {
    const navigate = useNavigate();
    const theme = useTheme();
    const { accountData, updateAccountData } = useContext(AccountDataContext);

    const [email, setEmail, emailHelperText, isEmailValid, updateEmailHelperText] = useValidation({
        validationFunction: validateEmail,
        emptyHelperText: '이메일을 입력해주세요',
        invalidHelperText: '올바른 이메일 형식을 입력해 주세요.',
    });

    const [password, setPassword, passwordHelperText, isPasswordValid, updatePasswordHelperText] = useValidation({
        emptyHelperText: '비밀번호를 입력해 주세요.',
    });


    const [isAutoLogin, setIsAutoLogin] = useState(false);
    useEffect(() => {
        const isAutoLoginLocalStorage = JSON.parse(localStorage.getItem('isAutoLogin')!);
        if (isAutoLoginLocalStorage === true) {
            setIsAutoLogin(true);
        }
    }, []);


    const onClickLogin = async () => {
        updateEmailHelperText();
        updatePasswordHelperText();
        if (isEmailValid && isPasswordValid) {
            try {
                const loginResponse = await accountAPI.postAccountLogin(email, password);
                if (loginResponse.status === 200) {
                    updateUserDataLocalStorage({ userData: loginResponse.data, isAutoLogin });
                    updateAccountData('isLogin', true);
                    if (loginResponse.data['IsMentor']) {
                        updateAccountData('isMentorMode', true);
                        navigate('/mentor');
                    } else {
                        updateAccountData('isMentorMode', false);
                        navigate('/');
                    }
                } else {
                    updateAccountData('isLogin', false);
                    alert(loginResponse.data.error); // 이렇게 복잡해야하는가?
                }
            }
            catch {
                alert('에러가 발생했습니다. 네트워크 환경을 확인해 주세요');
            }
        }

    };
    return (
        <Flex
            sx={{
                width: '100%',
                height: 'calc(100vh - 80px - 32px)',
                alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box',
                [theme.breakpoints.down('sm')]: { alignItems: 'start' }
            }}
        >
            <VerticalFlex sx={{
                width: '100%',
                minWidth: '284px',
                maxWidth: '378px',
                [theme.breakpoints.down('sm')]: { justifyContent: 'space-between', height: '100%', margin: '16px' }
            }}>
                <VerticalFlex>
                    <TextHeading6>
                        로그인
                    </TextHeading6>
                    <VerticalFlex sx={{ gap: '24px', marginTop: '36px', marginBottom: '24px' }}>
                        <CustomTextField
                            onChange={(event) => { setEmail(event.target.value); }}
                            onBlur={(event) => { updateEmailHelperText(); }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    onClickLogin();
                                    event.preventDefault();
                                }
                            }}
                            placeholder="이메일"
                            error={!isEmailValid}
                            helperText={!isEmailValid ? emailHelperText : undefined}
                            height="48px"
                        />

                        <CustomTextField
                            onChange={(event) => { setPassword(event.target.value); }}
                            onBlur={(event) => { updatePasswordHelperText(); }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    onClickLogin();
                                    event.preventDefault();
                                }
                            }}
                            placeholder="비밀번호"
                            error={!isPasswordValid}
                            helperText={!isPasswordValid ? passwordHelperText : undefined}
                            type='password'
                            height="48px"
                        />
                    </VerticalFlex>
                    <Flex sx={{ height: "24px", justifyContent: "space-between" }} >
                        <RowAlignCenterFlex>
                            <CustomCheckbox isChecked={isAutoLogin} setIsChecked={setIsAutoLogin} onClick={undefined} children={undefined} />
                            <SubButtons style={{ marginLeft: 4 }} onClick={(e) => { setIsAutoLogin(!isAutoLogin); }}>자동 로그인</SubButtons>
                        </RowAlignCenterFlex>
                        <Flex sx={{ gap: "16px" }}>
                            <SubButtons onClick={() => alert('아직 구현되지 않은 기능이에요😔 이메일을 찾으시려면, ‘커리어다이브 카카오 채널’로 문의 주시기 바랍니다!')}>이메일 찾기</SubButtons>
                            <SubButtons onClick={() => alert('아직 구현되지 않은 기능이에요😔 비밀번호를 찾으시려면, ‘커리어다이브 카카오 채널’로 문의 주시기 바랍니다!')}>비밀번호 찾기</SubButtons>
                        </Flex>
                    </Flex>
                    <EmptyHeight height={'24px'} />
                </VerticalFlex>

                <VerticalFlex sx={{ gap: '24px' }}>
                    <CustomButton
                        height='48px'
                        onClick={onClickLogin}>
                        로그인
                    </CustomButton>
                    <VerticalFlex sx={{ alignItems: "center" }}>
                        <TextBody2>아직 회원이 아니신가요?</TextBody2>
                        <LinkNoDeco to='/signup'>
                            <SignUpText>회원가입</SignUpText>
                        </LinkNoDeco>
                    </VerticalFlex>
                </VerticalFlex>
            </VerticalFlex>
        </Flex >

    );
}

export default Login;
