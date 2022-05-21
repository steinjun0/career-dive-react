import { useState } from 'react';

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
} from "util/styledComponent";
import { CustomButton } from 'util/Custom/CustomButton'
import { CustomTextField } from 'util/Custom/CustomTextField.js';
import { CustomPasswordTextField } from 'util/Custom/CustomPasswordTextField.js';
import { CustomCheckbox } from 'util/Custom/CustomCheckbox.js';

const LoginWrapper = styled(VerticalFlex)`
  width: 100%;
`

const TextFieldWrapper = styled(Flex)`
  width: 100%;
  margin-top: 32px;
  min-height: 118px;
  flex-direction: column;
  justify-content: space-between;
  input{
    color: black;
    background-color: ${colorBackgroundGrayLight};
  }
`

const SubButtonsWrapper = styled(RowAlignCenterFlex)`
  justify-content: space-between;
`;

const SubButtons = styled(TextBody2)`
  color: ${colorTextLight};
  cursor: pointer;
`;

const ButtonWrapper = styled(VerticalFlex)`
//   margin-top: 20px;
`

const SignUpText = styled('span')`
  text-decoration: underline;
  font-size: 12px;
  font-weight: 700;
  margin-top: 6px;
`

const postLogin = async (email, password) => {

}

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAutoLogin, setIsAutoLogin] = useState(false);

    const onClickLogin = async () => {
        try {
            const loginResponse = await API.postLogin(email, password);
            if (loginResponse.status === 200) {
                window.localStorage.setItem('user_id', loginResponse.data.user_id)
                window.localStorage.setItem('access_token', loginResponse.data.access_token)
                window.localStorage.setItem('refresh_token', loginResponse.data.refresh_token)
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
                                        height={'26px'}
                                        onChange={(event) => { setEmail(event.target.value) }}
                                        variant="filled"
                                        InputProps={{ disableUnderline: true, }}
                                        fullWidth={true}
                                        margin="dense"
                                        size="small"
                                        hiddenLabel
                                        placeholder="이메일"
                                    />
                                    <CustomPasswordTextField
                                        password={password}
                                        setPassword={setPassword}
                                    />
                                </TextFieldWrapper>
                                <EmptyHeight height={'8px'} />
                                <SubButtonsWrapper>
                                    <RowAlignCenterFlex>
                                        <CustomCheckbox isChecked={isAutoLogin} setIsChecked={setIsAutoLogin} />
                                        <SubButtons onClick={(e) => { setIsAutoLogin(!isAutoLogin) }}>자동 로그인</SubButtons>
                                    </RowAlignCenterFlex>

                                    <Flex>
                                        <SubButtons>이메일 찾기</SubButtons>
                                        <EmptyWidth width="16px"></EmptyWidth>
                                        <SubButtons>비밀번호 찾기</SubButtons>
                                    </Flex>
                                </SubButtonsWrapper>
                                <EmptyHeight height={'8px'} />
                                <ButtonWrapper>
                                    <CustomButton
                                        onClick={onClickLogin}
                                        height="50px">
                                        로그인
                                    </CustomButton>
                                </ButtonWrapper>
                                <EmptyHeight height={'29px'} />
                                <ColumnAlignCenterFlex>
                                    <TextBody2>아직 회원이 아니신가요?</TextBody2>
                                    <SignUpText>회원가입</SignUpText>
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
