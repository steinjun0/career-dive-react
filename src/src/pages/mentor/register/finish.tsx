import BasicButton from "component/button/BasicButton";
import React from "react";
import { Flex, TextBody2, TextHeading6, TextSubtitle1, VerticalFlex } from "util/styledComponent";
import paperFileComplete from 'assets/img/paperFileComplete.svg';
import RegisterTemplate from "organisms/mentor/register/RegisterTemplate";
import { useNavigate } from "react-router-dom";

export default function Finish() {
  const navigate = useNavigate();
  return <RegisterTemplate>
    <VerticalFlex sx={{ alignItems: 'center' }}>
      <VerticalFlex sx={{ gap: '16px' }}>
        <TextHeading6 sx={{ width: '100%' }}>
          멘토 신청이 완료 되었습니다 👏
        </TextHeading6>
        <TextBody2>
          빠른 시일 내에 접수해주신 내용 및 경력 인증 확인 후 승인해드리도록 하겠습니다. 신청 결과는 가입 시 입력한 메일을 통해 안내됩니다.
        </TextBody2>
      </VerticalFlex>

      <img src={paperFileComplete} alt="서류뭉치" style={{ width: '120px', height: '120px', margin: '72px 0' }} />
      <Flex sx={{ gap: '16px', width: '100%' }}>
        <BasicButton sx={{ width: '100%', height: '48px' }} type="pink"
          onClick={() => {
            navigate('/mentor');
          }}
        >
          <TextSubtitle1>
            완료
          </TextSubtitle1>
        </BasicButton>
      </Flex>
    </VerticalFlex>

  </RegisterTemplate>;
}