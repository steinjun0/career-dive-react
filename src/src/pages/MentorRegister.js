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
    EmptyWidth,
    colorBackgroundCareerDiveBlue,
    colorTextDisabled
} from "util/styledComponent";
import { CustomButton } from 'util/Custom/CustomButton'
import { CustomTextField } from 'util/Custom/CustomTextField.js';
import { CustomPasswordTextField } from 'util/Custom/CustomPasswordTextField.js';
import { CustomCheckbox } from 'util/Custom/CustomCheckbox.js';
import { useNavigate } from 'react-router-dom';
import SimpleMenu from 'util/SimpleMenu.js';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { CustomToggleButton, onChangeToggle } from 'util/Custom/CutomToggleButton.js';
import Dropzone from 'react-dropzone';
import UploadIcon from 'assets/icon/UploadIcon'


const LoginWrapper = styled(VerticalFlex)`
  min-width: 378px;
`

const ButtonWrapper = styled(VerticalFlex)`
//   margin-top: 20px;
`

const FileDropzoneContent = styled(Flex)`
  background-color: ${colorBackgroundGrayLight};
  justify-content: center;
  align-items: center;
  padding: 20px;
  height: 60px;
`;


function MentorRegister() {
    const [signUpStep, setSignUpStep] = useState(1);

    const [inService, setInService] = useState(true)
    const [job, setJob] = useState('')
    const [jobInComp, setJobInComp] = useState('')
    const [divisInComp, setDivisInComp] = useState('')
    const [divisIsPub, setDivisIsPub] = useState(true)
    const [tagsString, setTagsString] = useState('')
    const [tags, setTags] = useState([])
    useEffect(() => {
        setTags(tagsString.split(',').map(element => element.trim()))
    }, [tagsString])

    const mentorInfoState = {
        inService, setInService, job, setJob, jobInComp, setJobInComp, divisInComp, setDivisInComp,
        divisIsPub, setDivisIsPub, tagsString, setTagsString, tags, setTags
    }

    return (
        <FullHeightFullWidthWrapper>
            <MaxWidthDiv>
                <Grid justifyContent="center" container spacing={'30px'} marginTop={0}>
                    <Grid container item xs={4} md={4}>
                        <LoginWrapper>
                            {signUpStep === 1 && <MentorInfo
                                signUpStep={signUpStep}
                                setSignUpStep={setSignUpStep}
                                mentorInfoState={mentorInfoState}
                            />}
                            {signUpStep === 2 && <CareerCertificate
                                signUpStep={signUpStep}
                                setSignUpStep={setSignUpStep}
                            />}
                            {signUpStep === 3 && <Finish />
                            }
                        </LoginWrapper>
                    </Grid>
                </Grid>
            </MaxWidthDiv>
        </FullHeightFullWidthWrapper>
    );
}

function MentorInfo({ signUpStep, setSignUpStep, mentorInfoState }) {
    const [nextButtonDisable, setNextButtonDisable] = useState(true)

    useEffect(() => {
        if (mentorInfoState.job !== '' && mentorInfoState.divisInComp !== '') {
            setNextButtonDisable(false)
        } else {
            setNextButtonDisable(true)
        }
    }, [...Object.keys(mentorInfoState).map((k) => mentorInfoState[k])])

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
                <CustomButton
                    background_color={mentorInfoState.inService ? colorBackgroundCareerDiveBlue : colorBackgroundGrayLight}
                    custom_color={mentorInfoState.inService ? colorCareerDiveBlue : colorTextLight}
                    height='44px' width='82px'
                    onClick={() => mentorInfoState.setInService(true)}>

                    <TextBody2>전 직장</TextBody2>
                </CustomButton>
                <EmptyWidth width={'16px'}></EmptyWidth>
                <CustomButton
                    background_color={!mentorInfoState.inService ? colorBackgroundCareerDiveBlue : colorBackgroundGrayLight}
                    custom_color={!mentorInfoState.inService ? colorCareerDiveBlue : colorTextLight}
                    height='44px' width='82px'
                    onClick={() => mentorInfoState.setInService(false)}>
                    <TextBody2>현 직장</TextBody2>
                </CustomButton>
            </RowAlignCenterFlex>

            <EmptyHeight height='30px' />

            <TextSubtitle2>
                직무 정보
            </TextSubtitle2>
            <EmptyHeight height='16px' />
            <SimpleMenu
                title={<TextBody2>{mentorInfoState.job === '' ? '선택' : mentorInfoState.job}</TextBody2>}
                font
                style={{ width: '378px', height: '48px', backgroundColor: colorBackgroundGrayLight, justifyContent: 'space-between', padding: '10px 20px ' }}
                menuItems={['딸기우유']}
                setState={mentorInfoState.setJob}
                endIcon={<KeyboardArrowDownIcon color={colorTextLight} />}
                onClickProps={() => { }}></SimpleMenu>
            <EmptyHeight height='16px' />
            <CustomTextField
                onChange={(event) => { mentorInfoState.setJobInComp(event.target.value) }}
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
                onChange={(event) => { mentorInfoState.setDivisInComp(event.target.value) }}
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
                <CustomToggleButton
                    checked={mentorInfoState.divisIsPub}
                    onChange={(e) => { onChangeToggle(e, mentorInfoState.divisIsPub, mentorInfoState.setDivisIsPub) }}
                />
                <EmptyWidth width={'8px'} />
                <TextBody2 color={colorCareerDiveBlue}>공개</TextBody2>
            </Flex>
            <EmptyHeight height='30px' />

            <TextSubtitle2>
                태그
            </TextSubtitle2>
            <EmptyHeight height='16px' />
            <CustomTextField
                onChange={(event) => { mentorInfoState.setTagsString(event.target.value) }}
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
                {nextButtonDisable ?
                    <CustomButton
                        background_color={colorBackgroundGrayLight}
                        custom_color={colorTextDisabled}
                    >
                        다음
                    </CustomButton>
                    :
                    <CustomButton
                        onClick={() => {
                            setSignUpStep(signUpStep + 1)
                        }}>
                        다음
                    </CustomButton>}
            </ButtonWrapper>
            <EmptyHeight height='30px' />

        </VerticalFlex >
    );
}

function CareerCertificate({ signUpStep, setSignUpStep }) {
    const onClickAuthRequest = () => {
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
                    onClick={() => { onClickAuthRequest(); setSignUpStep(signUpStep + 1) }}
                    height="50px">
                    인증 요청
                </CustomButton>
            </ButtonWrapper>
            <EmptyHeight height='30px' />

        </VerticalFlex>
    );
}

function Finish() {
    return (
        <VerticalFlex>
            <RowAlignCenterFlex style={{ justifyContent: 'space-between' }}>
                <TextHeading6>
                    멘토 등록 신청이 완료 되었습니다 👏
                </TextHeading6>
            </RowAlignCenterFlex>
            <EmptyHeight height='16px' />
            <TextBody2>
                빠른 시일 내에 접수해주신 내용 및 경력 인증 확인 후 승인해드리도록 하겠습니다. 신청 결과는 가입 시 입력한 메일을 통해 안내됩니다.
            </TextBody2>
            <EmptyHeight height={'30px'} />


            <ButtonWrapper>
                <CustomButton
                    onClick={() => { }}
                    height="50px">
                    완료
                </CustomButton>
            </ButtonWrapper>
            <EmptyHeight height='30px' />

        </VerticalFlex>
    );
}
export default MentorRegister;
