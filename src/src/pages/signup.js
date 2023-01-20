import { useState } from 'react';

import { Grid, styled } from "@mui/material";

import {
    FullHeightFullWidthWrapper,
    MaxWidthDiv,
    VerticalFlex,
} from "util/styledComponent";
import SignUpInfo from './signup/SignUpInfo.js';
import SignUpPhone from './signup/SignUpPhone.js';
import SignUpNickName from './signup/SignUpNickName.js';
import SignUpPhoneTemp from './signup/SignUpPhoneTemp.js';

const LoginWrapper = styled(VerticalFlex)`
  width: 100%;
`

function SignUp() {
    const [signUpData, setSignUpData] = useState({});
    const [signUpStep, setSignUpStep] = useState(1);

    return (
        <FullHeightFullWidthWrapper>
            <MaxWidthDiv>
                <Grid justifyContent="center" container spacing={'30px'} marginTop={0}>
                    <Grid container item xs={4} md={4}>
                        <LoginWrapper>
                            {signUpStep === 1 && <SignUpInfo
                                signUpStep={signUpStep}
                                setSignUpStep={setSignUpStep}
                                signUpData={signUpData}
                                setSignUpData={setSignUpData} />}
                            {signUpStep === 2 && <SignUpPhoneTemp
                                signUpStep={signUpStep}
                                setSignUpStep={setSignUpStep}
                                signUpData={signUpData}
                                setSignUpData={setSignUpData} />}
                            {signUpStep === 3 && <SignUpNickName
                                signUpStep={signUpStep}
                                setSignUpStep={setSignUpStep}
                                signUpData={signUpData}
                                setSignUpData={setSignUpData} />}
                        </LoginWrapper>
                    </Grid>
                </Grid>
            </MaxWidthDiv>
        </FullHeightFullWidthWrapper>
    );
}

export default SignUp;
