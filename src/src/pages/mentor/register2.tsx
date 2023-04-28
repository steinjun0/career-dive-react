import BasicButton from "component/button/BasicButton";
import React from "react";
import { Flex, TextHeading6, TextSubtitle1, VerticalFlex, colorCareerDivePink, colorTextLight } from "util/styledComponent";
import paperFileDown from 'assets/img/paperFileDown.svg';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import issueStepModalObject from "organisms/mentor/register/IssueStepModal";
import RegisterTemplate from "organisms/mentor/register/RegisterTemplate";

const InfoModal = withReactContent(Swal);

export default function MentorRegister2() {

  return <RegisterTemplate>
    <TextHeading6 sx={{ width: '100%' }}>
      멘토 등록을 위해<br />
      <span style={{ color: colorCareerDivePink }}>건강보험자격득실확인서</span>를<br />
      먼저 준비해주세요<br />
    </TextHeading6>
    <img src={paperFileDown} alt="서류뭉치" style={{ width: '120px', height: '120px', margin: '72px 0' }} />
    <Flex sx={{ gap: '16px', width: '100%' }}>
      <BasicButton sx={{ width: '100%', height: '48px' }} type="gray"
        onClick={() => {
          InfoModal.fire(issueStepModalObject);
        }}
      >
        <TextSubtitle1 sx={{ color: colorTextLight }}>
          서류 발급
        </TextSubtitle1>
      </BasicButton>
      <BasicButton sx={{ width: '100%', height: '48px' }} type="pink">
        <TextSubtitle1>
          등록 시작
        </TextSubtitle1>
      </BasicButton>
    </Flex>
  </RegisterTemplate>;
}