import { useEffect, useState } from 'react';

import API from '../API.js'
import { Grid, styled, } from "@mui/material";

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
import { CustomTextField } from 'util/Custom/CustomTextField.js';
import { CustomPasswordTextField } from 'util/Custom/CustomPasswordTextField.js';
import { CustomCheckbox } from 'util/Custom/CustomCheckbox.js';
import { useNavigate } from 'react-router-dom';

const LoginWrapper = styled(VerticalFlex)`
  width: 100%;
`

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
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAutoLogin, setIsAutoLogin] = useState(false);

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
                alert(loginResponse.error.response.data.error) // 이렇게 복잡해야하는가?
            }
        }
        catch {
            alert('에러가 발생했습니다. 네트워크 환경을 확인해 주세요')
        }
    }
    return (
        <FullHeightFullWidthWrapper>
            <MaxWidthDiv>
                <Grid justifyContent="center" container spacing={'30px'} marginTop={0}>
                    <Grid container item xs={4} md={4}>
                        <LoginWrapper>
                            <VerticalFlex>
                                <TextHeading6>
                                    로그인
                                </TextHeading6>
                                <TextFieldWrapper>
                                    <CustomTextField
                                        style={{ marginBottom: 24 }}
                                        onChange={(event) => { setEmail(event.target.value) }}
                                        onKeyPress={(event) => {
                                            if (event.key === 'Enter') {
                                                onClickLogin()
                                                event.preventDefault();
                                            }
                                        }}
                                        variant="filled"
                                        InputProps={{ disableUnderline: true, }}
                                        fullWidth={true}
                                        margin="dense"
                                        size="small"
                                        hiddenLabel
                                        placeholder="이메일"
                                    />
                                    <CustomPasswordTextField
                                        style={{ marginBottom: 24 }}
                                        password={password}
                                        setPassword={setPassword}
                                        onKeyPress={(event) => {
                                            if (event.key === 'Enter') {
                                                onClickLogin()
                                                event.preventDefault();
                                            }
                                        }}
                                    />
                                </TextFieldWrapper>
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
                        </LoginWrapper>
                    </Grid>
                </Grid>
            </MaxWidthDiv>
        </FullHeightFullWidthWrapper >

    );
}

export default Login;
