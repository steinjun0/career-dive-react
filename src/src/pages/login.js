import { useEffect, useState } from 'react';

import API from '../API.js'
import { Grid, styled, useTheme, } from "@mui/material";

import {
    FullHeightFullWidthWrapper,
    MaxWidthDiv,
    VerticalFlex,
    TextHeading6,
    Flex,
    colorBackgroundGrayLight,
    TextBody2,
    RowAlignCenterFlex,
    colorTextLight,
    EmptyWidth,
    EmptyHeight,
    ColumnAlignCenterFlex,
    LinkNoDeco,
    TextSubtitle2,
    TextSubtitle1,
} from "util/styledComponent";
import { CustomButton } from 'util/Custom/CustomButton'
import { CustomPasswordTextField } from 'util/Custom/CustomPasswordTextField.js';
import { CustomCheckbox } from 'util/Custom/CustomCheckbox.js';
import { useNavigate } from 'react-router-dom';
import CustomTextField from "util/ts/Custom/CustomTextField";
import *  as util from "util/ts/util";

const TextFieldWrapper = styled(Flex)`
  width: 100%;
  margin-top: 36px;
  min-height: 118px;
  flex-direction: column;
  justify-content: start;
  input{
    color: black;
    background-color: ${colorBackgroundGrayLight};
  }
`

const SubButtonsWrapper = styled(RowAlignCenterFlex)`
  justify-content: space-between;
  height: 24px;
`;

const SubButtons = styled(TextBody2)`
  color: ${colorTextLight};
  cursor: pointer;
`;

const ButtonWrapper = styled(VerticalFlex)`
//   margin-top: 20px;
`

const SignUpText = styled(TextSubtitle2)`
  text-decoration: underline;
  margin-top: 6px;
`

function Login() {
    const navigate = useNavigate();
    const theme = useTheme();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAutoLogin, setIsAutoLogin] = useState(false);

    const [emailHelperText, setEmailHelperText] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);

    const [passwordHelperText, setPasswordHelperText] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    function validateEmail() {
        if (email === '') {
            console.log('hi')
            setEmailHelperText('이메일을 입력해주세요')
        } else if (!util.validateEmail(email)) {
            setEmailHelperText('올바른 이메일 형식을 입력해 주세요.')
        } else {
            setIsEmailValid(true)
            return true
        }
        setIsEmailValid(false)
        return false
    }

    function validatePassword() {

        if (password === '') {
            setPasswordHelperText('비밀번호를 입력해 주세요.')
        } else {
            setIsPasswordValid(true)
            return true
        }
        setIsPasswordValid(false)
        return false
    }

    useEffect(() => {
        const isAutoLoginLocalStorage = JSON.parse(localStorage.getItem('isAutoLogin'))
        if (isAutoLoginLocalStorage === true) {
            setIsAutoLogin(true)
        }
    }, [])


    const onClickLogin = async () => {
        try {
            const loginResponse = await API.postAccountLogin(email, password);
            if (loginResponse.status === 200) {
                window.localStorage.setItem('UserID', loginResponse.data['UserID'])
                window.localStorage.setItem('AccessToken', loginResponse.data['AccessToken'])
                window.localStorage.setItem('RefreshToken', loginResponse.data['RefreshToken'])
                window.localStorage.setItem('SendbirdToken', loginResponse.data['SendbirdToken'])
                window.localStorage.setItem('IsMentor', loginResponse.data['IsMentor'])
                window.localStorage.setItem('Nickname', loginResponse.data['Nickname'])
                window.localStorage.setItem('isAutoLogin', isAutoLogin)
                if (loginResponse.data['IsMentor']) {
                    window.localStorage.setItem('IsMentorMode', true)
                    navigate('/mentor')
                } else {
                    window.localStorage.setItem('IsMentorMode', false)
                    navigate('/')
                }
            } else {
                alert(loginResponse.data.error) // 이렇게 복잡해야하는가?
            }
        }
        catch {
            alert('에러가 발생했습니다. 네트워크 환경을 확인해 주세요')
        }
    }
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
                    <VerticalFlex style={{ gap: '24px', marginTop: '36px', marginBottom: '24px' }}>
                        <CustomTextField
                            onChange={(event) => { setEmail(event.target.value) }}
                            onBlur={(event) => { validateEmail() }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    onClickLogin()
                                    event.preventDefault();
                                }
                            }}
                            placeholder="이메일"
                            error={!isEmailValid}
                            helperText={!isEmailValid ? emailHelperText : undefined}
                            height="48px"
                        />

                        <CustomTextField
                            onChange={(event) => { setPassword(event.target.value) }}
                            onBlur={(event) => { validatePassword() }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    onClickLogin()
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
                    <SubButtonsWrapper>
                        <RowAlignCenterFlex>
                            <CustomCheckbox isChecked={isAutoLogin} setIsChecked={setIsAutoLogin} />
                            <SubButtons style={{ marginLeft: 4 }} onClick={(e) => { setIsAutoLogin(!isAutoLogin) }}>자동 로그인</SubButtons>
                        </RowAlignCenterFlex>
                        <Flex>
                            <SubButtons onClick={() => alert('아직 구현되지 않은 기능이에요😔 이메일을 찾으시려면, ‘커리어다이브 카카오 채널’로 문의 주시기 바랍니다!')}>이메일 찾기</SubButtons>
                            <EmptyWidth width="16px"></EmptyWidth>
                            <SubButtons onClick={() => alert('아직 구현되지 않은 기능이에요😔 비밀번호를 찾으시려면, ‘커리어다이브 카카오 채널’로 문의 주시기 바랍니다!')}>비밀번호 찾기</SubButtons>
                        </Flex>
                    </SubButtonsWrapper>
                    <EmptyHeight height={'24px'} />
                </VerticalFlex>

                <VerticalFlex>
                    <ButtonWrapper>
                        <CustomButton
                            height={'48px'}
                            onClick={onClickLogin}>
                            로그인
                        </CustomButton>
                    </ButtonWrapper>
                    <EmptyHeight height={'24px'} />
                    <ColumnAlignCenterFlex>
                        <TextBody2>아직 회원이 아니신가요?</TextBody2>
                        <LinkNoDeco to='/signup'>
                            <SignUpText>회원가입</SignUpText>
                        </LinkNoDeco>
                    </ColumnAlignCenterFlex>
                </VerticalFlex>
            </VerticalFlex>
        </Flex >

    );
}

export default Login;
