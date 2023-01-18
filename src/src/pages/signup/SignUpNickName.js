import { useState } from 'react';

import API from 'API.js'
import { styled } from "@mui/material";

import {
    VerticalFlex,
    TextHeading6,
    RowAlignCenterFlex,
    colorTextLight,
    EmptyHeight,
    TextCaption,
} from "util/styledComponent";

import { CustomButton } from 'util/Custom/CustomButton'
import { CustomTextField } from 'util/Custom/CustomTextField.js';
import { useNavigate } from 'react-router-dom';

const ButtonWrapper = styled(VerticalFlex)`
//   margin-top: 20px;
`

function SignUpNickName({ signUpStep, setSignUpStep, signUpData, setSignUpData }) {
    let navigate = useNavigate();
    const [nickName, setNickName] = useState('');
    const updateNickName = () => {
        const updateData = Object.assign(signUpData, { nickName })
        setSignUpData(updateData)
    }

    const postAccount = async (email, password) => {
        try {
            const accountCreateResponse = await API.postAccount({ email: signUpData.email, password: signUpData.password, nickname: signUpData.nickName, phoneNumber: signUpData.phoneNumber });
            if (accountCreateResponse.status === 200) {
                window.localStorage.setItem('UserID', accountCreateResponse.data.UserID)
                window.localStorage.setItem('AccessToken', accountCreateResponse.data.AccessToken)
                window.localStorage.setItem('RefreshToken', accountCreateResponse.data.RefreshToken)
                window.localStorage.setItem('IsMentor', accountCreateResponse.data['IsMentor'])
                window.localStorage.setItem('isAutoLogin', true)
                alert('회원가입이 완료되었습니다!')
                navigate('/mentee/mypage/profile')

            } else {
                alert(accountCreateResponse.error.response.data.error) // 이렇게 복잡해야하는가?
            }
        }
        catch {

        }
    }

    return (
        <VerticalFlex>
            <RowAlignCenterFlex style={{ justifyContent: 'space-between' }}>
                <TextHeading6>
                    닉네임 설정
                </TextHeading6>
                <TextCaption color={colorTextLight}>3/3</TextCaption>
            </RowAlignCenterFlex>

            <EmptyHeight height={'40px'} />
            <TextCaption>닉네임을 자유롭게 설정해보세요.</TextCaption>
            <EmptyHeight height={'12px'} />
            <CustomTextField
                onChange={(event) => { setNickName(event.target.value) }}
                variant="filled"
                InputProps={{ disableUnderline: true, }}
                fullWidth={true}
                margin="dense"
                size="small"
                hiddenLabel
                placeholder="최대 10자"
            />
            <EmptyHeight height={'24px'} />
            <ButtonWrapper>
                <CustomButton
                    onClick={() => {
                        updateNickName()
                        postAccount()
                    }}
                    height="50px">
                    완료
                </CustomButton>
            </ButtonWrapper>
            <EmptyHeight height='30px' />


        </VerticalFlex>
    );
}
export default SignUpNickName;
