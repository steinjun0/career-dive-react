import API from '../API.js'
import { Grid, styled, TextField } from "@mui/material";

import {
    FullWidthWrapper,
    CenterWidthWrapper,
    GrayBackground,
    MaxWidthDiv,
    VerticalFlex,
    TextHeading6,
    Flex,
    colorBackgroundGrayLight,
    colorTextLight,
    CustomButton
} from "../util/styledComponent";
import { useState } from 'react';


const LoginWrapper = styled(VerticalFlex)`
  width: 100%;
`

const TextFieldWrapper = styled(Flex)`
  width: 100%;
  margin-top: 32px;
  height: 118px;
  flex-direction: column;
  justify-content: space-between;
  input{
    color: black;
    background-color: ${colorBackgroundGrayLight};
  }
`

const ButtonWrapper = styled(VerticalFlex)`
  margin-top: 20px;
`

const postLogin = (email, password) => {
    console.log(email);
    API.postLogin(email, password);
}

function App() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    return (
        <FullWidthWrapper>
            <MaxWidthDiv>
                <Grid justifyContent="center" container spacing={'30px'} marginTop={0}>
                    <Grid container item xs={8} md={4}>
                        <LoginWrapper>
                            <VerticalFlex>
                                <TextHeading6>
                                    로그인
                                </TextHeading6>
                                <TextFieldWrapper>
                                    <TextField onChange={(event) => { setEmail(event.target.value) }} variant="filled" InputProps={{ disableUnderline: true, }} fullWidth={true} margin="dense" size="small" hiddenLabel placeholder="이메일" />
                                    <TextField onChange={(event) => { setPassword(event.target.value) }} variant="filled" InputProps={{ disableUnderline: true, }} fullWidth={true} margin="dense" size="small" hiddenLabel placeholder="비밀번호" />
                                </TextFieldWrapper>
                                <ButtonWrapper>
                                    <CustomButton onClick={() => { postLogin(email, password) }} height="50px">로그인</CustomButton>
                                </ButtonWrapper>
                            </VerticalFlex>
                        </LoginWrapper>

                    </Grid>
                </Grid>
            </MaxWidthDiv>
        </FullWidthWrapper>

    );
}

export default App;
