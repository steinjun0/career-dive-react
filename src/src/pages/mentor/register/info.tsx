import BasicButton from "component/button/BasicButton";
import CustomTogglebutton from "component/button/CustomToggleButton";
import BasicTextField from "component/input/BasicTextField";
import GetJobInfo, { Job, Sector } from "organisms/mentor/register/GetJobInfo";
import GetTags from "organisms/mentor/register/GetTags";
import RegisterTemplate from "organisms/mentor/register/RegisterTemplate";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import useBreakpoint from "util/hooks/useBreakpoint";
import { Flex, VerticalFlex, TextHeading6, colorCareerDivePink, TextSubtitle1, colorTextLight, TextCaption, TextBody2, colorBackgroundGrayLight, TextSubtitle2, colorTextTitle } from "util/styledComponent";
import { colorBackgroundCareerDivePink } from "util/styledComponent-bak";

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
  const [sector, setSector] = useState<Sector>(null);
  const [job, setJob] = useState<Job>('');
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
      onClickSector={(clickedSector) => {
        setSector(clickedSector);
      }}
      onClickJob={(clickedJob) => {
        setJob(clickedJob);
      }}
      onChangeJobInComp={(changedJobInComp) => {
        setJobInComp(changedJobInComp);
      }}
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