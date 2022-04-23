import { useState } from 'react';

import API from '../API.js'
import { Checkbox, Grid, IconButton, InputAdornment, styled, TextField } from "@mui/material";

import {
    FullWidthWrapper,
    MaxWidthDiv,
    VerticalFlex,
    TextHeading6,
    Flex,
    colorBackgroundGrayLight,
    TextBody2,
    RowAlignCenterFlex,
    colorTextLight,

    EmptyWidth,
    colorCareerDiveBlue,
    EmptyHeight,
    ColumnAlignCenterFlex,
} from "util/styledComponent";
import { CustomButton } from 'util/Custom/CustomButton'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { CustomTextField } from 'util/Custom/CustomTextField.js';
import { Visibility, VisibilityOff } from '@material-ui/icons';

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

const FullHeightFullWidthWrapper = styled(FullWidthWrapper)`
  height: calc(100vh - 80px - 214px);
`;

const SignUpText = styled('span')`
  text-decoration: underline;
  font-size: 12px;
  font-weight: 700;
  margin-top: 6px;
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
    const [showPassword, setShowPassword] = useState(false);
    const [isAutoLogin, setIsAutoLogin] = useState(false);
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
                                    <CustomTextField height={'26px'} onChange={(event) => { setEmail(event.target.value) }} variant="filled" InputProps={{ disableUnderline: true, }} fullWidth={true} margin="dense" size="small" hiddenLabel placeholder="이메일" />
                                    <CustomTextField
                                        height={'26px'}
                                        onChange={(event) => { setPassword(event.target.value) }}
                                        variant="filled"
                                        InputProps={{
                                            disableUnderline: true,
                                            type: showPassword ? 'text' : 'password',
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={() => { setShowPassword(!showPassword) }}
                                                    >
                                                        {showPassword ? <VisibilityOff style={{ color: colorCareerDiveBlue }} /> : <Visibility style={{ color: colorCareerDiveBlue }} />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                        fullWidth={true}
                                        margin="dense" size="small" hiddenLabel placeholder="비밀번호"
                                    />
                                </TextFieldWrapper>
                                <EmptyHeight height={'8px'} />
                                <SubButtonsWrapper>
                                    <RowAlignCenterFlex>
                                        <Checkbox
                                            disableRipple
                                            checked={isAutoLogin}
                                            onChange={() => { setIsAutoLogin(!isAutoLogin) }}
                                            style={{ paddingLeft: 0 }}
                                            icon={<CheckCircleOutlineIcon fontSize={'small'} style={{ color: '#BDBDBD' }} />}
                                            checkedIcon={<CheckCircleIcon fontSize={'small'} />}
                                        />
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
                                    <CustomButton onClick={() => { postLogin(email, password) }} height="50px">로그인</CustomButton>
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

export default App;
