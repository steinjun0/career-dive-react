import { useEffect, useState } from 'react';

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
    colorCareerDiveBlue,
    colorBackgroundGrayMedium
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
  margin-bottom: 24px;
  flex-direction: column;
  justify-content: space-between;
  input{
    color: black;
    background-color: ${colorBackgroundGrayLight};
  }
`

const SubButtonsWrapper = styled(RowAlignCenterFlex)`
  justify-content: space-between;
  margin-bottom: 12px;
`;

const SubButtons = styled(TextBody2)`
  color: ${colorTextLight};
  cursor: pointer;
`;

const ButtonWrapper = styled(VerticalFlex)`
//   margin-top: 20px;
`

const TermsButton = styled(Flex)`
  justify-content: center;
  align-items: center;
  border: 1px solid ${colorBackgroundGrayMedium};
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



function SignUp() {
    const [signUpData, setSignUpData] = useState({});
    const [signUpStep, setSignUpStep] = useState(1);

    return (
        <FullHeightFullWidthWrapper>
            <MaxWidthDiv>
                <Grid justifyContent="center" container spacing={'30px'} marginTop={0}>
                    <Grid container item xs={4} md={4}>
                        <LoginWrapper>
                            {signUpStep === 1 && <SignUp1stInfo
                                signUpStep={signUpStep}
                                setSignUpStep={setSignUpStep}
                                signUpData={signUpData}
                                setSignUpData={setSignUpData} />}
                            {signUpStep === 2 && <SignUp2ndPhone
                                signUpStep={signUpStep}
                                setSignUpStep={setSignUpStep}
                                signUpData={signUpData}
                                setSignUpData={setSignUpData} />}
                            {signUpStep === 3 && <SignUp3rdNickName
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

function SignUp1stInfo({ signUpStep, setSignUpStep, signUpData, setSignUpData }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isCheckUsingTerm, setIsCheckUsingTerm] = useState(false);
    const [isCheckPersonalData, setIsCheckPersonalData] = useState(false);
    const [isCheckMarketing, setIsCheckMarketing] = useState(false);
    const [isCheckAll, setIsCheckAll] = useState(false);

    const updateSignUpData = (signUpData, setSignUpData) => {
        const updateData = Object.assign(signUpData, { email, password, isCheckUsingTerm, isCheckPersonalData, isCheckMarketing })
        setSignUpData(updateData);
    }

    const checkAll = () => {
        if (!isCheckAll) {
            setIsCheckUsingTerm(true)
            setIsCheckPersonalData(true)
            setIsCheckMarketing(true)
            setIsCheckAll(true)
        } else {
            setIsCheckUsingTerm(false)
            setIsCheckPersonalData(false)
            setIsCheckMarketing(false)
            setIsCheckAll(false)
        }
    }


    useEffect(() => {
        if (isCheckUsingTerm && isCheckPersonalData && isCheckMarketing) {
            setIsCheckAll(true);
        } else {
            setIsCheckAll(false);
        }
    }, [isCheckUsingTerm, isCheckPersonalData, isCheckMarketing])
    return (
        <VerticalFlex>
            <TextHeading6>
                회원가입
            </TextHeading6>
            <TextFieldWrapper>
                <CustomTextField
                    onChange={(event) => { setEmail(event.target.value) }}
                    variant="filled"
                    InputProps={{ disableUnderline: true, }}
                    fullWidth={true}
                    margin="dense"
                    size="small"
                    hiddenLabel
                    placeholder="이메일"
                />
                <EmptyHeight height={'24px'} />
                <TextCaption>
                    영문, 숫자, 특수문자 포함 8자 이상
                </TextCaption>
                <EmptyHeight height={'12px'} />
                <CustomPasswordTextField
                    password={password}
                    setPassword={setPassword}
                />
            </TextFieldWrapper>

            <SubButtonsWrapper>
                <RowAlignCenterFlex>
                    <CustomCheckbox isChecked={isCheckUsingTerm} setIsChecked={setIsCheckUsingTerm} />
                    <SubButtons
                        style={{ marginLeft: 4 }}
                        onClick={(e) => { setIsCheckUsingTerm(!isCheckUsingTerm) }}>
                        이용 약관 <SpanCareerDiveBlue>(필수)</SpanCareerDiveBlue>
                    </SubButtons>
                </RowAlignCenterFlex>

                <TermsButton>
                    약관
                </TermsButton>
            </SubButtonsWrapper>
            <SubButtonsWrapper>
                <RowAlignCenterFlex>
                    <CustomCheckbox isChecked={isCheckPersonalData} setIsChecked={setIsCheckPersonalData} />
                    <SubButtons
                        style={{ marginLeft: 4 }}
                        onClick={(e) => { setIsCheckPersonalData(!isCheckPersonalData) }}>
                        개인 정보 활용 동의 <SpanCareerDiveBlue>(필수)</SpanCareerDiveBlue>
                    </SubButtons>
                </RowAlignCenterFlex>

                <TermsButton>
                    약관
                </TermsButton>
            </SubButtonsWrapper>
            <SubButtonsWrapper>
                <RowAlignCenterFlex>
                    <CustomCheckbox isChecked={isCheckMarketing} setIsChecked={setIsCheckMarketing} />
                    <SubButtons
                        style={{ marginLeft: 4 }}
                        onClick={(e) => { setIsCheckMarketing(!isCheckMarketing) }}>
                        마케팅 수신 동의 <SpanWeak>(선택)</SpanWeak>
                    </SubButtons>
                </RowAlignCenterFlex>

                <TermsButton>
                    약관
                </TermsButton>
            </SubButtonsWrapper>
            <Divider style={{ marginBottom: '12px' }}></Divider>
            <SubButtonsWrapper>
                <RowAlignCenterFlex>
                    <CustomCheckbox isChecked={isCheckAll} setIsChecked={setIsCheckAll} onClick={checkAll} />
                    <SubButtons style={{ marginLeft: 4 }} onClick={(e) => { checkAll() }}>전체 동의</SubButtons>
                </RowAlignCenterFlex>
            </SubButtonsWrapper>
            <EmptyHeight height={'12px'} />
            <ButtonWrapper>
                <CustomButton
                    onClick={() => {
                        updateSignUpData(signUpData, setSignUpData);
                        setSignUpStep(signUpStep + 1)
                    }}
                    height="50px">
                    다음
                </CustomButton>
            </ButtonWrapper>

        </VerticalFlex>
    );
}

function SignUp2ndPhone({ signUpStep, setSignUpStep, signUpData, setSignUpData }) {
    const updatePhoneAuth = () => {
        const updateData = Object.assign(signUpData, { phoneAuth: true })
        setSignUpData(updateData)
    }
    return (
        <VerticalFlex>
            <TextHeading6>
                회원가입
            </TextHeading6>

            <EmptyHeight height={'40px'} />
            <ButtonWrapper>
                <CustomButton
                    onClick={() => { updatePhoneAuth(); setSignUpStep(signUpStep + 1) }}
                    height="50px">
                    휴대폰 본인 인증
                </CustomButton>
            </ButtonWrapper>
            <EmptyHeight height='30px' />
            <TextBody2>인증 시 입력한 전화번호는 다른 사용자들에게 공유되지 않습니다.</TextBody2>

        </VerticalFlex>
    );
}

function SignUp3rdNickName({ signUpStep, setSignUpStep, signUpData, setSignUpData }) {
    let navigate = useNavigate();
    const [nickName, setNickName] = useState('');
    const updateNickName = () => {
        const updateData = Object.assign(signUpData, { nickName })
        setSignUpData(updateData)
    }

    const postAccount = async (email, password) => {
        try {
            const accountCreateResponse = await API.postAccount(signUpData.email, signUpData.password, signUpData.nickName);
            if (accountCreateResponse.status === 200) {
                window.localStorage.setItem('UserId', accountCreateResponse.data.UserId)
                window.localStorage.setItem('AccessToken', accountCreateResponse.data.AccessToken)
                window.localStorage.setItem('RefreshToken', accountCreateResponse.data.RefreshToken)
                alert('회원가입이 완료되었습니다!')
                navigate('/')

            } else {
                alert(accountCreateResponse.error.response.data.error) // 이렇게 복잡해야하는가?
            }
        }
        catch {

        }
    }

    return (
        <VerticalFlex>
            <TextHeading6>
                닉네임
            </TextHeading6>

            <EmptyHeight height={'40px'} />
            <TextBody2>닉네임을 자유롭게 설정해보세요.</TextBody2>
            <EmptyHeight height={'30px'} />
            <TextCaption>
                최대 10자
            </TextCaption>
            <EmptyHeight height={'12px'} />
            <CustomTextField
                height={'26px'}
                onChange={(event) => { setNickName(event.target.value) }}
                variant="filled"
                InputProps={{ disableUnderline: true, }}
                fullWidth={true}
                margin="dense"
                size="small"
                hiddenLabel
                placeholder="닉네임(선택)"
            />
            <EmptyHeight height={'30px'} />
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
export default SignUp;
