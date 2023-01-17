import { useEffect, useState } from 'react';

import { styled, Divider } from "@mui/material";

import {
    VerticalFlex,
    TextHeading6,
    Flex,
    colorBackgroundGrayLight,
    TextBody2,
    RowAlignCenterFlex,
    colorTextLight,
    EmptyHeight,
    TextCaption,
    colorCareerDiveBlue,
    colorBackgroundGrayMedium,
} from "util/styledComponent";

import { CustomButton } from 'util/Custom/CustomButton'
import { CustomTextField } from 'util/Custom/CustomTextField.js';
import { CustomPasswordTextField } from 'util/Custom/CustomPasswordTextField.js';
import { CustomCheckbox } from 'util/Custom/CustomCheckbox.js';


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

function SignUpInfo({ signUpStep, setSignUpStep, signUpData, setSignUpData }) {
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
            <RowAlignCenterFlex style={{ justifyContent: 'space-between' }}>
                <TextHeading6>
                    회원가입
                </TextHeading6>
                <TextCaption color={colorTextLight}>1/3</TextCaption>
            </RowAlignCenterFlex>
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
                <CustomPasswordTextField
                    style={{ marginTop: 12 }}
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
            <Divider style={{ marginBottom: '12px', color: colorBackgroundGrayMedium }}></Divider>
            <SubButtonsWrapper>
                <RowAlignCenterFlex>
                    <CustomCheckbox isChecked={isCheckAll} setIsChecked={setIsCheckAll} onClick={checkAll} />
                    <SubButtons style={{ marginLeft: 4 }} onClick={(e) => { checkAll() }}>전체 동의</SubButtons>
                </RowAlignCenterFlex>
            </SubButtonsWrapper>
            <EmptyHeight height={'12px'} />
            <ButtonWrapper>
                <CustomButton
                    disabled={!isCheckPersonalData || !isCheckUsingTerm}

                    height={'48px'}
                    onClick={() => {
                        updateSignUpData(signUpData, setSignUpData);
                        setSignUpStep(signUpStep + 1)
                    }}>
                    다음
                </CustomButton>
            </ButtonWrapper>

        </VerticalFlex>
    );
}

export default SignUpInfo;