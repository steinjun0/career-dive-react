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

function App() {
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
                                    <TextField variant="filled" InputProps={{ disableUnderline: true, }} fullWidth={true} margin="dense" size="small" hiddenLabel placeholder="이메일" />
                                    <TextField variant="filled" InputProps={{ disableUnderline: true, }} fullWidth={true} margin="dense" size="small" hiddenLabel placeholder="비밀번호" />
                                </TextFieldWrapper>
                                <ButtonWrapper>
                                    <CustomButton height="50px">로그인</CustomButton>
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
