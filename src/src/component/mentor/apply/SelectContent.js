import {
  colorTextLight,
  EmptyHeight,
  EmptyWidth,
  Flex,
  TextBody2,
  TextHeading6,
  TextSubtitle1,
} from "util/styledComponent";
import { Card } from "util/Card";
import { styled } from "@mui/material";
import { getDayInKorean, updateReservation } from "util/util";
import { CustomToggleButtonGroup } from "util/Custom/CustomToggleButtonGroup";
import { useEffect, useState } from "react";
import { CustomButton } from "util/Custom/CustomButton";
import { useNavigate, useParams } from "react-router-dom";

const IntroductionWrapper = styled(Flex)`
  width: 100%;
`;

function Introduction({ applyInformation }) {
  const navigater = useNavigate()
  const params = useParams()

  const [mentoringCategory, setMentoringCategory] = useState(null)
  const [mentoringContent, setMentoringContent] = useState([])
  const [mentoringDate, setMentoringDate] = useState()

  useEffect(() => {
    const reservations = JSON.parse(localStorage.getItem('reservations'))
    if (reservations !== null) {
      const reservation = reservations[params.id]
      if (reservation !== undefined) {
        reservation['mentoringCategory'] && setMentoringCategory(reservation['mentoringCategory'])
        reservation['mentoringContent'] && setMentoringContent(reservation['mentoringContent'])
        reservation['consultingDate'] && setMentoringDate(new Date(reservation['consultingDate']['year'], reservation['consultingDate']['month'] - 1, reservation['consultingDate']['date']))
        console.log('mentoringDate.getFullYear()', mentoringDate)
      }
    }
  }, [])


  const addMentoringContent = (contents) => {
    if (contents.length <= 3) {
      setMentoringContent(contents)
    }
  }

  return (
    <IntroductionWrapper>
      <Card
        no_divider={'false'}
        title={`${mentoringDate && mentoringDate.getFullYear()}년
                ${mentoringDate && mentoringDate.getMonth() + 1}월
                ${mentoringDate && mentoringDate.getDate()}일
                (${mentoringDate && getDayInKorean(mentoringDate)})`}
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
              { name: 'mentoringCategory', data: mentoringCategory }
            ]
            if (mentoringContent === []) {
              alert('상담 내용을 선택하세요')
            }
            else if (mentoringCategory === null) {
              alert('상담 유형을 선택하세요')
            } else {
              updateReservation(params.id, updatingData)
              navigater(`/mentee/mentor/mentoring/apply/${params.id}`)
            }


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
