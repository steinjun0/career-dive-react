import BasicButton from "component/button/BasicButton";
import CustomTogglebutton from "component/button/CustomToggleButton";
import BasicTextField from "component/input/BasicTextField";
import GetJobInfo from "organisms/mentor/register/GetJobInfo";
import GetTags from "organisms/mentor/register/GetTags";
import RegisterTemplate from "organisms/mentor/register/RegisterTemplate";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import useBreakpoint from "util/hooks/useBreakpoint";
import { Flex, VerticalFlex, TextHeading6, colorCareerDivePink, TextSubtitle1, colorTextLight, TextCaption, TextBody2, colorBackgroundGrayLight, TextSubtitle2, colorTextTitle } from "util/styledComponent";
import { colorBackgroundCareerDivePink } from "util/styledComponent-bak";

export const jobInformation = {
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
};

function StepTitle({ isDownSm }: { isDownSm: boolean; }) {
  return <VerticalFlex sx={{ width: '100%', }}>
    <Flex sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
      <TextHeading6>
        멘토 등록
      </TextHeading6>
      {!isDownSm && <TextCaption sx={{ color: colorTextLight }}>
        2/2
      </TextCaption>}
    </Flex>
    <Flex>
      <TextBody2>
        멘토 등록을 위해 경력을 인증해 주세요.<br />
        퇴사일 기준 3년 이내의 경력까지 인정됩니다.
      </TextBody2>
    </Flex>
  </VerticalFlex>;
}

function CheckInJob({ inJob, setInJob }: { inJob: boolean, setInJob: Dispatch<SetStateAction<boolean>>; }) {
  return <Flex sx={{ width: '100%', gap: '16px' }}>
    <CustomTogglebutton
      selectedBackgroundColor={colorBackgroundCareerDivePink}
      selectedColor={colorCareerDivePink}
      sx={{ padding: '10px 20px' }}
      selected={inJob}
      onClick={() => {
        setInJob(true);
      }}
    >
      <TextBody2>
        현 직장
      </TextBody2>
    </CustomTogglebutton>

    <CustomTogglebutton
      selectedBackgroundColor={colorBackgroundCareerDivePink}
      selectedColor={colorCareerDivePink}
      sx={{ padding: '10px 20px' }}
      selected={!inJob}
      onClick={() => {
        setInJob(false);
      }}
    >
      <TextBody2>
        전 직장
      </TextBody2>
    </CustomTogglebutton>
  </Flex>;
}

function GetCompanyName({ company, setCompany }: { company: string, setCompany: Dispatch<SetStateAction<string>>; }) {
  return <VerticalFlex sx={{ width: '100%', gap: '16px' }}>
    <VerticalFlex sx={{ gap: '4px' }}>
      <TextSubtitle2>회사*</TextSubtitle2>
      <TextCaption sx={{ color: colorTextTitle }}>
        건강보험자격득실확인서 상의 법인명을 입력해주세요.
      </TextCaption>
    </VerticalFlex>
    <BasicTextField
      placeholder='회사명'
      value={company}
      onChange={(e) => {
        setCompany(e.target.value);
      }}
    />
  </VerticalFlex>;
}

function GetDepartment({ department, divisIsPub, setDepartment, setDivisIsPub }: { department: string, setDepartment: Dispatch<SetStateAction<string>>, divisIsPub: boolean, setDivisIsPub: Dispatch<SetStateAction<boolean>>; }) {
  return <VerticalFlex sx={{ width: '100%', gap: '16px' }}>
    <VerticalFlex sx={{ gap: '4px' }}>
      <TextSubtitle2>부서*</TextSubtitle2>
      <TextCaption sx={{ color: colorTextTitle }}>
        공개 여부는 프로필 페이지에서 변경 가능합니다.
      </TextCaption>
    </VerticalFlex>
    <Flex sx={{ gap: '16px', justifyContent: 'space-between' }}>
      <BasicTextField
        placeholder='부서명'
        value={department}
        onChange={(e) => {
          setDepartment(e.target.value);
        }}
        sx={{ width: '217px' }}
      />
      <Flex sx={{ width: '146px' }}>
        <CustomTogglebutton
          selectedBackgroundColor={colorBackgroundCareerDivePink}
          selectedColor={colorCareerDivePink}
          sx={{ padding: '12px 20px', borderRadius: '8px 0px 0px 8px' }}
          selected={!divisIsPub}
          onClick={() => {
            setDivisIsPub(false);
          }}
        >
          <TextBody2>
            비공개
          </TextBody2>
        </CustomTogglebutton>
        <CustomTogglebutton
          selectedBackgroundColor={colorBackgroundCareerDivePink}
          selectedColor={colorCareerDivePink}
          sx={{ padding: '12px 20px', borderRadius: '0px 8px 8px 0px' }}
          selected={divisIsPub}
          onClick={() => {
            setDivisIsPub(true);
          }}
        >
          <TextBody2>
            공개
          </TextBody2>
        </CustomTogglebutton>
      </Flex>
    </Flex>
  </VerticalFlex>;
}

export default function Info() {
  const navigate = useNavigate();
  const isDownSm = useBreakpoint('sm');

  const [company, setCompany] = useState<string>('');
  const [divisIsPub, setDivisIsPub] = useState<boolean>(true);
  const [sector, setSector] = useState<keyof typeof jobInformation | null>(null);
  const [job, setJob] = useState<string>('');
  const [jobInComp, setJobInComp] = useState<string>('');
  const [department, setDepartment] = useState<string>('');
  const [inJob, setInJob] = useState<boolean>(true);
  const [tags, setTags] = useState<string[]>([]);


  return <RegisterTemplate>
    <StepTitle isDownSm={isDownSm} />
    <CheckInJob inJob={inJob} setInJob={setInJob} />
    <GetCompanyName company={company} setCompany={setCompany} />
    <GetJobInfo
      sector={sector}
      job={job}
      jobInComp={jobInComp}
      setSector={setSector}
      setJob={setJob}
      setJobInComp={setJobInComp}
    />
    <GetDepartment
      divisIsPub={divisIsPub}
      setDivisIsPub={setDivisIsPub}
      department={department}
      setDepartment={setDepartment}
    />
    <GetTags
      tags={tags}
      setTags={setTags}
    />

    <BasicButton
      type="pink"
      sx={{ width: '100%', height: '48px', marginTop: isDownSm ? 'auto' : undefined }}
      onClick={() => {
        navigate('/mentor/register/type');
      }}
    >
      <TextSubtitle1>
        다음
      </TextSubtitle1>
    </BasicButton>
  </RegisterTemplate>;
}