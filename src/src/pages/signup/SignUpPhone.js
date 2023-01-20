import { styled } from "@mui/material";

import {
    VerticalFlex,
    TextHeading6,
    TextBody2,
    RowAlignCenterFlex,
    colorTextLight,
    EmptyHeight,
    TextCaption,
    FullWidthWrapper
} from "util/styledComponent";

import { CustomButton } from 'util/Custom/CustomButton'

const ButtonWrapper = styled(VerticalFlex)`
//   margin-top: 20px;
`

function SignUpPhone({ signUpStep, setSignUpStep, signUpData, setSignUpData }) {
    const updatePhoneAuth = () => {
        const updateData = Object.assign(signUpData, { phoneAuth: true })
        setSignUpData(updateData)
    }
    return (
        <VerticalFlex>
            <RowAlignCenterFlex style={{ justifyContent: 'space-between' }}>
                <TextHeading6>
                    회원가입
                </TextHeading6>
                <TextCaption color={colorTextLight}>2/3</TextCaption>
            </RowAlignCenterFlex>


            <EmptyHeight height={'40px'} />
            <ButtonWrapper>
                <CustomButton
                    onClick={() => { updatePhoneAuth(); setSignUpStep(signUpStep + 1) }}
                    height="50px">
                    휴대폰 본인 인증
                </CustomButton>
            </ButtonWrapper>
            <EmptyHeight height='30px' />
            <FullWidthWrapper>
                <TextBody2>입력하신 전화번호는 본인 인증 용도로만 사용됩니다.</TextBody2>
            </FullWidthWrapper>

        </VerticalFlex>
    );
}

export default SignUpPhone