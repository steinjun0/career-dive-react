import { useEffect, useState } from 'react';

import API from '../../API.js'
import { Grid, styled } from "@mui/material";

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
    TextSubtitle2,
    EmptyWidth,
    colorBackgroundCareerDiveBlue,
    colorTextDisabled,
    colorBackgroundGrayDark,
    colorCareerDivePink
} from "util/styledComponent";
import { CustomButton } from 'util/Custom/CustomButton'
import { CustomTextField } from 'util/Custom/CustomTextField';
import Dropzone from 'react-dropzone';
import UploadIcon from 'assets/icon/UploadIcon'
import { convertStringToTags } from 'util/util.js';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TagShowAndInput from 'component/TagShowAndInput.js';
import { useNavigate } from 'react-router-dom';
import React from 'react'

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
    const navigater = useNavigate();
    const [signUpStep, setSignUpStep] = useState(1);

    const [inService, setInService] = useState(true)
    const [upperJobCategory, setUpperJobCategory] = useState('')
    const [lowerJobCategory, setLowerJobCategory] = useState('')
    const [jobInComp, setJobInComp] = useState('')
    const [compName, setCompName] = useState('')
    const [divisInComp, setDivisInComp] = useState('')
    const [divisIsPub, setDivisIsPub] = useState(true)
    const [tags, setTags] = useState([])

    const mentorInfoState = {
        inService, setInService, compName, setCompName, upperJobCategory, setUpperJobCategory, lowerJobCategory, setLowerJobCategory, jobInComp, setJobInComp, divisInComp, setDivisInComp,
        divisIsPub, setDivisIsPub, tags, setTags
    }

    useEffect(() => {
        console.log('JSON.parse(localStorage.getItem("isMentor"))', JSON.parse(localStorage.getItem("IsMentor")))
        if (JSON.parse(localStorage.getItem("IsMentor"))) {
            alert('이미 멘토 등록을 하셨습니다.')
            navigater(-1)
        }
    }, [])

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
                                mentorInfoState={mentorInfoState}
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

const jobInformation = {
    'SW개발': ['프론트엔드', '백엔드', '안드로이드 개발', 'iOS 개발', '응용 프로그래머', '시스템 프로그래머', '데이터베이스·인프라', '네트워크·서버', '보안', '게임', '데이터 분석·인공지능', 'QA·테스터·검증', 'ERP·시스템분석·설계'],
    '기획': ['PM·PO', '서비스 기획', '콘텐츠 기획', '데이터 기획', 'UX 리서치'],
    '마케팅·광고·홍보': ['마케팅', '광고 기획(AE)', '홍보·PR', '조사·분석·통계', '전시·컨벤션'],
    '경영·사무·행정': ['컨설팅', '전략 기획', '사업 기획', '경영 기획', '사무', '총무', '법무', '경리', '회계', '세무', '인사·노무·교육'],
    '유통·물류·무역': ['MD', 'VMD', '상품 기획', '구매', '매장 운영·관리', '수출입·무역·사무', 'SCM', 'BM'],
    'CS·영업': ['아웃바운드TM', '고객상담·인바운드', 'CS 관리', '제품·서비스 영업', '금융·보험 영업', 'IT·솔루션·기술 영업', '영업 관리·지원·영업 기획', '해외·무역 영업'],
    '디자인': ['UI/UX', 'UX 디자이너', '영상·애니메이션', '그래픽·3D', '패션', '인테리어', '출판·편집', '제품·산업', '전시·공간'],
    '제조·생산·품질': ['생산·공정 관리', '품질 관리', '품질 보증', '제조', '설비', '조립'],
    '방송·미디어': ['PD·연출', '기자', '아나운서', '작가·시나리오'],
    '은행·금융·보험': ['개인 금융', '기업 금융', '국제 금융', '카드 사업', '투자 은행', '자산 관리·운용', '리서치', '리스크 관리', '트레이딩', '보험 심사'],
    '건설·엔지니어링': ['환경', '플랜트', '토목', '건축'],
    '항공': ['조종사', '승무원', '관제사', '운항관리사', '지상사무직', '공항 운영', '지상조업', '제작·정비'],
    '교육': ['교수', '교직원', '강사'],
    '연구개발': ['연구개발', '리서치'],
    '기타': ['CEO']
}

function MentorInfo({ signUpStep, setSignUpStep, mentorInfoState }) {
    const [nextButtonDisable, setNextButtonDisable] = useState(true)
    const [isShowCategoryDropDown, setIsShowCategoryDropDown] = useState(false)


    useEffect(() => {
        if (mentorInfoState.job !== '' && mentorInfoState.divisInComp !== '') {
            setNextButtonDisable(false)
        } else {
            setNextButtonDisable(true)
        }
    }, [...Object.keys(mentorInfoState).map((k) => mentorInfoState[k])])

    useEffect(() => {
        mentorInfoState.setLowerJobCategory('')
    }, [mentorInfoState.upperJobCategory])

    const [upperJobCategory, setUpperJobCategory] = useState(
        ['SW개발', '기획', '마케팅·광고·홍보', '경영·사무·행정', '유통·물류·무역', 'CS·영업', '디자인', '제조·생산·품질', '방송·미디어',
            '은행·금융·보험', '건설·엔지니어링', '항공', '교육', '연구개발', '기타']
    );
    const [lowerJobCategory, setLowerJobCategory] = useState(
        ['프론트엔드', '백엔드', '안드로이드 개발', 'iOS 개발', '응용 프로그래머', '시스템 프로그래머', '데이터베이스·인프라', '네트워크·서버', '보안', '게임',
            '데이터 분석', '인공지능', 'QA·테스터·검증', 'ERP·시스템분석·설계']
    );

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
                    <TextBody2>현 직장</TextBody2>
                </CustomButton>
                <EmptyWidth width={'16px'}></EmptyWidth>
                <CustomButton
                    background_color={!mentorInfoState.inService ? colorBackgroundCareerDiveBlue : colorBackgroundGrayLight}
                    custom_color={!mentorInfoState.inService ? colorCareerDiveBlue : colorTextLight}
                    height='44px' width='82px'
                    onClick={() => mentorInfoState.setInService(false)}>

                    <TextBody2>전 직장</TextBody2>
                </CustomButton>
            </RowAlignCenterFlex>

            <EmptyHeight height='30px' />

            <TextSubtitle2>
                회사명
            </TextSubtitle2>
            <EmptyHeight height='4px' />
            <TextCaption>
                회사의 공식 법인명을 입력해주세요. ex) 비바리퍼블리카, 씨제이이엔엠
            </TextCaption>
            <EmptyHeight height='16px' />
            <CustomTextField
                onChange={(event) => { mentorInfoState.setCompName(event.target.value) }}
                variant="filled"
                InputProps={{ disableUnderline: true, }}
                fullWidth={true}
                margin="dense"
                size="small"
                hiddenLabel
                placeholder="회사"
            />
            <EmptyHeight height='30px' />

            <TextSubtitle2>
                직무 정보
            </TextSubtitle2>
            <EmptyHeight height='16px' />

            <Flex
                style={{ backgroundColor: colorBackgroundGrayLight, color: colorTextLight, padding: '10px 20px', justifyContent: 'space-between', cursor: 'pointer' }}
                onClick={() => {
                    setIsShowCategoryDropDown(!isShowCategoryDropDown)
                }}
            >
                <TextBody2 color={colorTextLight} style={{ lineHeight: '28px' }}>{mentorInfoState.lowerJobCategory !== '' ? `${mentorInfoState.upperJobCategory} | ${mentorInfoState.lowerJobCategory}` : '직무'}</TextBody2>
                <KeyboardArrowDownIcon color={colorTextLight} />
            </Flex>

            {isShowCategoryDropDown &&
                <VerticalFlex >
                    <Flex style={{ backgroundColor: colorBackgroundGrayLight, borderRadius: '8px', marginTop: '16px', overflow: 'hidden' }}>
                        <VerticalFlex
                            style={{ borderRight: `1px solid ${colorBackgroundGrayMedium}` }}>
                            {upperJobCategory.map((e, i) => {
                                return <Flex
                                    key={i}
                                    style={{
                                        padding: '4px 20px',
                                        cursor: 'pointer',
                                        color: mentorInfoState.upperJobCategory === e ? colorCareerDiveBlue : 'black',
                                        backgroundColor: mentorInfoState.upperJobCategory === e ? colorBackgroundCareerDiveBlue : colorBackgroundGrayLight,
                                    }}
                                    onClick={() => {
                                        mentorInfoState.setUpperJobCategory(e)
                                    }}>
                                    <TextBody2 style={{ lineHeight: '28px' }}>{e}</TextBody2>
                                </Flex>
                            })}
                        </VerticalFlex>
                        <VerticalFlex style={{ flex: 1 }}>
                            {mentorInfoState.upperJobCategory !== '' && jobInformation[mentorInfoState.upperJobCategory].map((e, i) => {
                                return <Flex
                                    key={i}
                                    style={{
                                        padding: '4px 20px',
                                        color: mentorInfoState.lowerJobCategory === e ? colorCareerDiveBlue : colorBackgroundGrayDark,
                                        backgroundColor: mentorInfoState.lowerJobCategory === e ? colorBackgroundCareerDiveBlue : colorBackgroundGrayLight,
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => {
                                        mentorInfoState.setLowerJobCategory(e)
                                        setIsShowCategoryDropDown(false)
                                    }}>
                                    <TextBody2 style={{ lineHeight: '28px' }}>{e}</TextBody2>
                                </Flex>
                            })}
                        </VerticalFlex>
                    </Flex>
                </VerticalFlex>
            }
            <EmptyHeight height={'16px'} />
            <CustomTextField
                onChange={(event) => { mentorInfoState.setJobInComp(event.target.value) }}
                variant="filled"
                InputProps={{ disableUnderline: true, }}
                fullWidth={true}
                margin="dense"
                size="small"
                hiddenLabel
                placeholder="사내 직무명"
            />

            <EmptyHeight height='30px' />

            <TextSubtitle2>
                부서·팀
            </TextSubtitle2>
            <EmptyHeight height='4px' />
            <TextCaption>
                공개 여부는 프로필 페이지에서 변경 가능합니다.
            </TextCaption>
            <EmptyHeight height='16px' />
            <Flex>
                <CustomTextField
                    onChange={(event) => { mentorInfoState.setDivisInComp(event.target.value) }}
                    variant="filled"
                    InputProps={{ disableUnderline: true, }}
                    fullWidth={true}
                    margin="dense"
                    size="small"
                    hiddenLabel
                    placeholder="부서·팀명"
                />
                <EmptyWidth width={'16px'} />
                <Flex style={{ minWidth: '146px', justifyContent: 'space-between', backgroundColor: colorBackgroundGrayLight, borderRadius: '8px' }}>
                    <Flex
                        style={{
                            padding: '12px 20px',
                            borderRight: `1px solid ${colorBackgroundGrayMedium}`,
                            backgroundColor: mentorInfoState.divisIsPub ? colorBackgroundGrayLight : colorBackgroundCareerDiveBlue,
                            borderTopLeftRadius: '8px',
                            borderBottomLeftRadius: '8px',
                            cursor: 'pointer'
                        }}
                        onClick={() => {
                            mentorInfoState.setDivisIsPub(false)
                        }}
                    >
                        <TextBody2
                            color={mentorInfoState.divisIsPub ? colorTextLight : colorCareerDiveBlue}>
                            비공개
                        </TextBody2>
                    </Flex>
                    <Flex
                        style={{
                            padding: '12px 20px',
                            backgroundColor: !mentorInfoState.divisIsPub ? colorBackgroundGrayLight : colorBackgroundCareerDiveBlue,
                            borderTopRightRadius: '8px',
                            borderBottomRightRadius: '8px',
                            cursor: 'pointer'
                        }}
                        onClick={() => {
                            mentorInfoState.setDivisIsPub(true)
                        }}>
                        <TextBody2
                            color={!mentorInfoState.divisIsPub ? colorTextLight : colorCareerDiveBlue}>
                            공개
                        </TextBody2>
                    </Flex>
                </Flex>
            </Flex>

            <EmptyHeight height='30px' />

            <TextSubtitle2>
                태그
            </TextSubtitle2>
            <EmptyHeight height='4px' />
            <TextCaption>
                최대 10개까지 입력이 가능합니다.
            </TextCaption>
            <EmptyHeight height='16px' />
            <TagShowAndInput tagList={mentorInfoState.tags} setTagList={mentorInfoState.setTags} isEditing={true} />
            <EmptyHeight height='30px' />


            <ButtonWrapper>
                {nextButtonDisable ?
                    <CustomButton
                        background_color={colorBackgroundGrayLight}
                        custom_color={colorTextDisabled}
                        height={'48px'}
                    >
                        다음
                    </CustomButton>
                    :
                    <CustomButton
                        onClick={() => {
                            setSignUpStep(signUpStep + 1)
                        }}
                        height={'48px'}>
                        다음
                    </CustomButton>}
            </ButtonWrapper>
            <EmptyHeight height='30px' />

        </VerticalFlex >
    );
}

function CareerCertificate({ signUpStep, setSignUpStep, mentorInfoState }) {
    const [uploadingFile, setUploadingFile] = useState([])
    const onClickAuthRequest = async () => {
        const accountRes = await API.postAccountMentor(
            mentorInfoState.inService,
            mentorInfoState.upperJobCategory,
            mentorInfoState.lowerJobCategory,
            mentorInfoState.jobInComp,
            mentorInfoState.divisInComp,
            mentorInfoState.divisIsPub,
            mentorInfoState.compName,
            mentorInfoState.tags)

        if (accountRes.status === 200) {
            alert('멘토 정보 등록 되었습니다')
            let formData = new FormData()
            formData.append('file', uploadingFile[0])
            const fileRes = await API.postAccountMentorFile(localStorage.getItem('UserID'), formData)
            if (fileRes.status === 200) {
                alert('자격득실확인서 등록 되었습니다')
                localStorage.setItem('IsMentor', true)
            } else {
                alert('자격득실확인서 등록 실패')
            }
        } else {
            alert('멘토 정보 등록 실패')
        }
    }

    return (
        <VerticalFlex>
            <RowAlignCenterFlex style={{ justifyContent: 'space-between' }}>
                <TextHeading6>
                    경력 인증
                </TextHeading6>
            </RowAlignCenterFlex>
            <EmptyHeight height='4px' />
            <TextBody2>
                <a target='_blank' style={{ color: 'black' }} href='http://www.nhis.or.kr/nhis/index.do'>국민건강보험 사이트</a>에서 발급한 <span style={{ color: colorCareerDiveBlue }}>자격득실확인서</span>(PDF)를 첨부해 주세요. 해당 서류를 통해 재직 기간과 회사가 인증되며, 한 개의 회사만 인증이 가능합니다.
                <br />
                <br />
                (사이트 접속 &gt; 자격득실 확인서 발급 &gt; ‘프린트 발급’ 클릭)
            </TextBody2>
            <EmptyHeight height={'30px'} />

            <Dropzone onDrop={acceptedFiles => {
                console.log('acceptedFiles', acceptedFiles)
                if (acceptedFiles.length > 1) {
                    alert('업로드 파일이 2개 이상입니다.')
                    return
                }
                for (let i = 0; i < acceptedFiles.length; i++) {
                    let extension = acceptedFiles[i].name.split('.').pop()
                    if (extension !== 'pdf') {
                        alert('pdf 만 업로드 가능합니다')
                        return
                    }
                }

                console.log(acceptedFiles[0])
                setUploadingFile(acceptedFiles)
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
            {uploadingFile && uploadingFile.map((items, index) => {
                console.log('uploadingFile', uploadingFile)
                return <Flex key={index}>
                    <TextBody2 color={colorTextLight} style={{ textDecoration: 'underline', marginRight: 10 }}>{items.path}</TextBody2>
                    <TextBody2
                        style={{ cursor: 'pointer' }}
                        color={colorCareerDivePink}
                        onClick={() => {
                            const temp = JSON.parse(JSON.stringify(uploadingFile))
                            temp.splice(temp.indexOf(items), 1)
                            setUploadingFile(temp)
                        }}>삭제</TextBody2>
                </Flex>
            })}

            <EmptyHeight height={'30px'} />
            <ButtonWrapper>
                <CustomButton
                    onClick={() => {
                        if (uploadingFile.length !== 1) {
                            alert('파일을 업로드 해주세요')
                            return
                        }
                        onClickAuthRequest();
                        setSignUpStep(signUpStep + 1)
                    }}
                    height="50px">
                    인증 요청
                </CustomButton>
            </ButtonWrapper>
            <EmptyHeight height='30px' />

        </VerticalFlex>
    );
}

function Finish() {
    const navigate = useNavigate();
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
                    onClick={() => {
                        navigate('/mentor/mypage/profile', { replace: true })
                        localStorage.setItem('IsMentorMode', true)
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
