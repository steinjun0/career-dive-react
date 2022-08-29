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
    EmptyHeight,
    TextCaption,
    colorCareerDiveBlue,
    colorBackgroundGrayMedium,
    FullWidthWrapper,
    TextSubtitle2,
    EmptyWidth
} from "util/styledComponent";
import { CustomButton } from 'util/Custom/CustomButton'
import { CustomTextField } from 'util/Custom/CustomTextField.js';
import { CustomPasswordTextField } from 'util/Custom/CustomPasswordTextField.js';
import { CustomCheckbox } from 'util/Custom/CustomCheckbox.js';
import { useNavigate } from 'react-router-dom';
import SimpleMenu from 'util/SimpleMenu.js';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { CustomToggleButton } from 'util/Custom/CutomToggleButton.js';
import Dropzone from 'react-dropzone';
import UploadIcon from 'assets/icon/UploadIcon'


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
const FileDropzoneContent = styled(Flex)`
  background-color: ${colorBackgroundGrayLight};
  justify-content: center;
  align-items: center;
  padding: 20px;
  height: 60px;
`;


function MentorRegister() {
    const [signUpData, setSignUpData] = useState({});
    const [signUpStep, setSignUpStep] = useState(1);

    return (
        <FullHeightFullWidthWrapper>
            <MaxWidthDiv>
                <Grid justifyContent="center" container spacing={'30px'} marginTop={0}>
                    <Grid container item xs={4} md={4}>
                        <LoginWrapper>
                            {signUpStep === 2 && <MentorInfo
                                signUpStep={signUpStep}
                                setSignUpStep={setSignUpStep}
                                signUpData={signUpData}
                                setSignUpData={setSignUpData} />}
                            {signUpStep === 1 && <CareerCertificate
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

function MentorInfo({ signUpStep, setSignUpStep, signUpData, setSignUpData }) {
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
                    멘토 등록
                </TextHeading6>
            </RowAlignCenterFlex>
            <EmptyHeight height='4px' />
            <TextBody2>멘토 등록을 위해 경력을 인증해 주세요.<br />
                퇴사일 기준 3년 이내의 경력까지 인정됩니다.</TextBody2>
            <EmptyHeight height='30px' />

            <RowAlignCenterFlex >
                <CustomButton background_color={colorBackgroundGrayLight} custom_color={colorTextLight}
                    height='44px' width='82px'>
                    <TextBody2>전 직장</TextBody2>
                </CustomButton>
                <EmptyWidth width={'16px'}></EmptyWidth>
                <CustomButton background_color={colorBackgroundGrayLight} custom_color={colorTextLight}
                    height='44px' width='82px'>
                    <TextBody2>현 직장</TextBody2>
                </CustomButton>
            </RowAlignCenterFlex>

            <EmptyHeight height='30px' />

            <TextSubtitle2>
                직무 정보
            </TextSubtitle2>
            <EmptyHeight height='16px' />
            <SimpleMenu title={<TextBody2>직무</TextBody2>} font style={{ width: '358px', height: '48px', backgroundColor: colorBackgroundGrayLight, justifyContent: 'space-between', padding: '10px 20px ' }} menuItems={['asdf']} setState={() => { }} endIcon={<KeyboardArrowDownIcon color={colorTextLight} />} onClickProps></SimpleMenu>
            <EmptyHeight height='16px' />
            <CustomTextField
                onChange={(event) => { }}
                variant="filled"
                InputProps={{ disableUnderline: true, }}
                fullWidth={true}
                margin="dense"
                size="small"
                hiddenLabel
                placeholder="최대 10자"
            />

            <EmptyHeight height='30px' />

            <TextSubtitle2>
                부서
            </TextSubtitle2>
            <EmptyHeight height='16px' />
            <CustomTextField
                onChange={(event) => { }}
                variant="filled"
                InputProps={{ disableUnderline: true, }}
                fullWidth={true}
                margin="dense"
                size="small"
                hiddenLabel
                placeholder="부서"
            />
            <EmptyHeight height='16px' />

            <TextSubtitle2>
                부서 공개 여부
            </TextSubtitle2>
            <EmptyHeight height='16px' />
            <TextBody2 color={colorTextLight}>추후 공개 여부 변경 가능</TextBody2>
            <EmptyHeight height='16px' />
            <Flex style={{ alignItems: 'center' }}>
                <CustomToggleButton />
                <EmptyWidth width={'8px'} />
                <TextBody2 color={colorCareerDiveBlue}>공개</TextBody2>
            </Flex>
            <EmptyHeight height='30px' />

            <TextSubtitle2>
                태그
            </TextSubtitle2>
            <EmptyHeight height='16px' />
            <CustomTextField
                onChange={(event) => { }}
                variant="filled"
                InputProps={{ disableUnderline: true, }}
                fullWidth={true}
                margin="dense"
                size="small"
                hiddenLabel
                placeholder="ex. 커리어다이브, 플랫폼, 에듀테크, 금융서비스 등"
            />
            <EmptyHeight height='30px' />


            <ButtonWrapper>
                <CustomButton
                    onClick={() => {
                        updateSignUpData(signUpData, setSignUpData);
                        setSignUpStep(signUpStep + 1)
                    }}>
                    다음
                </CustomButton>
            </ButtonWrapper>
            <EmptyHeight height='30px' />

        </VerticalFlex >
    );
}

function CareerCertificate({ signUpStep, setSignUpStep, signUpData, setSignUpData }) {
    const updatePhoneAuth = () => {
        const updateData = Object.assign(signUpData, { phoneAuth: true })
        setSignUpData(updateData)
    }
    const [uploadingFiles, setUploadingFiles] = useState([])

    return (
        <VerticalFlex>
            <RowAlignCenterFlex style={{ justifyContent: 'space-between' }}>
                <TextHeading6>
                    경력 인증
                </TextHeading6>
            </RowAlignCenterFlex>
            <EmptyHeight height='4px' />
            <TextBody2>
                국민건강보험 사이트에서 발급한 자격득실확인서(PDF)를 첨부해 주세요. 해당 서류를 통해 재직 기간과 회사가 인증되며, 한 개의 회사만 인증이 가능합니다.
                <br />
                <br />
                (사이트 접속 > 자격득실 확인서 발급 > ‘프린트 발급’ 클릭)
            </TextBody2>
            <EmptyHeight height={'30px'} />

            {/* TODO: upload 파일 취소 버튼 필요 */}
            <Dropzone onDrop={acceptedFiles => {
                if (uploadingFiles.length + acceptedFiles.length > 2) {
                    alert('업로드 파일이 3개 이상입니다.')
                    return
                }
                const temp = []
                acceptedFiles.forEach(file => {
                    temp.push(file.path)
                })
                setUploadingFiles([...uploadingFiles, ...temp])
            }}>
                {({ getRootProps, getInputProps }) => (
                    <section>
                        <FileDropzoneContent {...getRootProps()}>
                            <input {...getInputProps()} />
                            <UploadIcon color={colorTextLight} />
                        </FileDropzoneContent>
                    </section>
                )}
            </Dropzone>

            <EmptyHeight height={'30px'} />
            <ButtonWrapper>
                <CustomButton
                    onClick={() => { updatePhoneAuth(); setSignUpStep(signUpStep + 1) }}
                    height="50px">
                    인증 요청
                </CustomButton>
            </ButtonWrapper>
            <EmptyHeight height='30px' />

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
                window.localStorage.setItem('UserID', accountCreateResponse.data.UserID)
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
export default MentorRegister;
