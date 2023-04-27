import BasicButton from "component/button/BasicButton";
import React from "react";
import { Flex, TextHeading6, TextSubtitle1, VerticalFlex, colorCareerDivePink, colorTextLight } from "util/styledComponent";
import paperFile from 'assets/img/paperFile.svg';

export default function MentorRegister2() {
  return <Flex sx={{ justifyContent: 'center', alignItems: 'center' }}>
    <VerticalFlex sx={{ alignItems: 'center', width: '378px' }}>
      <TextHeading6 sx={{ width: '100%' }}>
        멘토 등록을 위해<br />
        <span style={{ color: colorCareerDivePink }}>건강보험자격득실확인서</span>를<br />
        먼저 준비해주세요<br />
      </TextHeading6>
      <img src={paperFile} alt="서류뭉치" style={{ width: '120px', height: '120px', margin: '72px 0' }} />
      <Flex sx={{ gap: '16px', width: '100%' }}>
        <BasicButton sx={{ width: '100%', height: '48px' }} type="gray">
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
    </VerticalFlex>
  </Flex>;
}