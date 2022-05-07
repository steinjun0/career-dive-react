import { useState } from 'react';

import API from '../API.js'
import { Grid, styled, Divider } from "@mui/material";

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
    TextCaption,
    colorCareerDiveBlue
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
  min-height: 145px;
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

const TermsButton = styled(Flex)`
  justify-content: center;
  align-items: center;
  border: 1px solid ${colorTextLight};
  border-radius: 2px;
  width: 39px;
  height: 20px;
  font-size: 10px;
  color: ${colorTextLight};
`;

const SpanCareerDiveBlue = styled('span')`
  color: ${colorCareerDiveBlue};
`

const SpanWeak = styled('span')`
color: #BDBDBD;
`

const postLogin = async (email, password) => {
    try {
        const loginResponse = await API.postLogin(email, password);
        if (loginResponse.status === 200) {
            window.localStorage.setItem('user_id', loginResponse.data.user_id)
            window.localStorage.setItem('access_token', loginResponse.data.access_token)
            window.localStorage.setItem('refresh_token', loginResponse.data.refresh_token)
        }
    }
    catch {

    }
}

function App() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAutoLogin, setIsAutoLogin] = useState(false);
    return (
        <FullHeightFullWidthWrapper>
            <MaxWidthDiv>
                <Grid justifyContent="center" container spacing={'30px'} marginTop={0}>
                    <Grid container item xs={4} md={4}>
                        <LoginWrapper>
                            <VerticalFlex>
                                <TextHeading6>
                                    회원가입
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
                                    <EmptyHeight height={'30px'} />
                                    <TextCaption>
                                        영문, 숫자, 특수문자 포함 8자 이상
                                    </TextCaption>
                                    <EmptyHeight height={'12px'} />
                                    <CustomPasswordTextField
                                        password={password}
                                        setPassword={setPassword}
                                    />
                                </TextFieldWrapper>

                                <EmptyHeight height={'30px'} />
                                <SubButtonsWrapper>
                                    <RowAlignCenterFlex>
                                        <CustomCheckbox isChecked={isAutoLogin} setIsChecked={setIsAutoLogin} />
                                        <SubButtons
                                            onClick={(e) => { setIsAutoLogin(!isAutoLogin) }}>
                                            이용 약관 <SpanCareerDiveBlue>(필수)</SpanCareerDiveBlue>
                                        </SubButtons>
                                    </RowAlignCenterFlex>

                                    <TermsButton>
                                        약관
                                    </TermsButton>
                                </SubButtonsWrapper>
                                <SubButtonsWrapper>
                                    <RowAlignCenterFlex>
                                        <CustomCheckbox isChecked={isAutoLogin} setIsChecked={setIsAutoLogin} />
                                        <SubButtons
                                            onClick={(e) => { setIsAutoLogin(!isAutoLogin) }}>
                                            개인 정보 활용 동의 <SpanCareerDiveBlue>(필수)</SpanCareerDiveBlue>
                                        </SubButtons>
                                    </RowAlignCenterFlex>

                                    <TermsButton>
                                        약관
                                    </TermsButton>
                                </SubButtonsWrapper>
                                <SubButtonsWrapper>
                                    <RowAlignCenterFlex>
                                        <CustomCheckbox isChecked={isAutoLogin} setIsChecked={setIsAutoLogin} />
                                        <SubButtons
                                            onClick={(e) => { setIsAutoLogin(!isAutoLogin) }}>
                                            마케팅 수신 동의 <SpanWeak>(선택)</SpanWeak>
                                        </SubButtons>
                                    </RowAlignCenterFlex>

                                    <TermsButton>
                                        약관
                                    </TermsButton>
                                </SubButtonsWrapper>
                                <Divider style={{ margin: '8px 0 8px 0' }}></Divider>
                                <SubButtonsWrapper>
                                    <RowAlignCenterFlex>
                                        <CustomCheckbox isChecked={isAutoLogin} setIsChecked={setIsAutoLogin} />
                                        <SubButtons onClick={(e) => { setIsAutoLogin(!isAutoLogin) }}>전체 동의</SubButtons>
                                    </RowAlignCenterFlex>
                                </SubButtonsWrapper>
                                <EmptyHeight height={'8px'} />
                                <ButtonWrapper>
                                    <CustomButton
                                        onClick={() => { postLogin(email, password) }}
                                        height="50px">
                                        다음
                                    </CustomButton>
                                </ButtonWrapper>

                            </VerticalFlex>
                        </LoginWrapper>
                    </Grid>
                </Grid>
            </MaxWidthDiv>
        </FullHeightFullWidthWrapper >

    );
}

export default App;
