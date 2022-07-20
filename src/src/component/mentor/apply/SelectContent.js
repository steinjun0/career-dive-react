import {
  colorCareerDiveBlue,
  colorTextBody,
  colorTextLight,
  EmptyHeight,
  EmptyWidth,
  Flex,
  RowAlignCenterFlex,
  TextBody2,
  TextHeading6,
  TextSubtitle1,
} from "util/styledComponent";
import { Card } from "util/Card";
import { styled } from "@mui/material";
import { getDayInKorean, updateReservation } from "util/util";
import { CustomToggleButtonGroup } from "util/Custom/CustomToggleButtonGroup";
import { useState } from "react";
import { CustomButton } from "util/Custom/CustomButton";
import { useNavigate, useParams } from "react-router-dom";

const IntroductionWrapper = styled(Flex)`
  width: 100%;
`;

const HtmlWrapper = styled('div')`
  font-size: 14px;
  line-height: 24px;
  color: ${colorTextBody};
`;

const DateBox = styled(RowAlignCenterFlex)`
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius:12px;
  border: 1px solid;
  color: ${colorTextLight};
`;

const AvailableDateBox = styled(DateBox)`
  background-color: rgba(105, 140, 255, 0.2);
  color: ${colorCareerDiveBlue};
  cursor: pointer;
`;

const SelectedDateBox = styled(DateBox)`
  background-color:${colorCareerDiveBlue};
  color: white;
  cursor: pointer;
`;

function Introduction({ applyInformation }) {
  const navigater = useNavigate()
  const params = useParams()

  const mentoringDate = new Date(applyInformation['consultingDate']['year'],
    applyInformation['consultingDate']['month'] - 1,
    applyInformation['consultingDate']['date']);

  const [mentoringCategory, setMentoringCategory] = useState('일반')
  const [mentoringContent, setMentoringContent] = useState(['직무소개'])
  const addMentoringContent = (contents) => {
    if (contents.length <= 3) {
      setMentoringContent(contents)
    }
  }

  return (
    <IntroductionWrapper>
      <Card
        no_divider={'false'}
        title={`${applyInformation['consultingDate']['year']}년
                ${applyInformation['consultingDate']['month']}월
                ${applyInformation['consultingDate']['date']}일
                (${getDayInKorean(mentoringDate)})`}
      >
        <EmptyHeight height='16px'></EmptyHeight>
        <TextSubtitle1>
          상담 유형
        </TextSubtitle1>
        <Flex>
          <CustomToggleButtonGroup
            value={mentoringCategory}
            isExclusive={true}
            valueArray={['일반', '프리미엄']}
            onChange={(event, value) => { setMentoringCategory(value) }}></CustomToggleButtonGroup>
        </Flex>
        <EmptyHeight height='16px'></EmptyHeight>

        <Flex>
          <TextSubtitle1>
            상담 내용
          </TextSubtitle1>
          <EmptyWidth width="8px"></EmptyWidth>
          <TextBody2 color={colorTextLight}>최대 3개 선택 가능</TextBody2>
        </Flex>
        <Flex>
          <CustomToggleButtonGroup
            value={mentoringContent}
            isExclusive={false}
            valueArray={['직무소개', '취업 상담', '진로 상담', '면접 팁', '업계 이야기']}
            onChange={(event, value) => { addMentoringContent(value) }}></CustomToggleButtonGroup>
        </Flex>
        <EmptyHeight height='28px' />
        <CustomButton
          height='52px'
          onClick={() => {
            const updatingData = [
              { name: 'mentoringContent', data: mentoringContent },
              { name: 'isPremium', data: mentoringCategory === '프리미엄' }
            ]
            updateReservation(params.id, updatingData)

            navigater(`/mentee/mentor/mentoring/apply/${params.id}`)
          }}
        >
          <TextHeading6>
            다음
          </TextHeading6>
        </CustomButton>
      </Card>
    </IntroductionWrapper >

  );
}

export default Introduction;
