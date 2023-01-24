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
import { CustomTextField } from "util/Custom/CustomTextField";
import { useState } from "react";

const ButtonWrapper = styled(VerticalFlex)`
//   margin-top: 20px;
`

function SignUpPhoneTemp({ signUpStep, setSignUpStep, signUpData, setSignUpData }) {
    const updatePhoneAuth = () => {
        const updateData = Object.assign(signUpData, { phoneAuth: true, phoneNumber: phoneNumber })
        setSignUpData(updateData)
    }

    const [phoneNumber, setPhoneNumber] = useState()
    return (
        <VerticalFlex>
            <RowAlignCenterFlex style={{ justifyContent: 'space-between' }}>
                <TextHeading6>
                    회원가입
                </TextHeading6>
                <TextCaption color={colorTextLight}>2/3</TextCaption>
            </RowAlignCenterFlex>

            <EmptyHeight height={'36px'} />
            <CustomTextField
                onChange={(event) => {
                    setPhoneNumber(event.target.value)
                }}
                variant="filled"
                InputProps={{ disableUnderline: true, }}
                fullWidth={true}
                margin="dense"
                size="small"
                hiddenLabel
                type={'number'}
                placeholder="휴대폰 번호(숫자)"
            />
            <EmptyHeight height={'24px'} />
            <ButtonWrapper>
                <CustomButton
                    onClick={() => {
                        console.log(phoneNumber)

                        if (phoneNumber === undefined) {
                            alert('번호를 입력해주세요')
                        }
                        else if (isNaN(phoneNumber)) {
                            alert('핸드폰 번호는 하이픈 없이, 숫자만 입력해주세요!')
                        } else {
                            updatePhoneAuth();
                            setSignUpStep(signUpStep + 1)
                        }

                    }}
                    height="50px">
                    확인
                </CustomButton>
            </ButtonWrapper>
            <EmptyHeight height='24px' />
            <FullWidthWrapper>
                <TextBody2>입력하신 전화번호는 본인 인증 용도로만 사용됩니다.</TextBody2>
            </FullWidthWrapper>

        </VerticalFlex>
    );
}

export default SignUpPhoneTemp