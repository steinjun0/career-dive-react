import {
  colorTextLight,
  EmptyHeight,
  EmptyWidth,
  Flex,
  TextBody1,
  TextBody2,
  TextHeading6,
  TextSubtitle1,
  VerticalFlex,
} from "util/styledComponent";
import { Card } from "util/Card";
import { styled } from "@mui/material";
import { getDayInKorean, updateReservation } from "util/util";
import { CustomToggleButtonGroup } from "util/Custom/CustomToggleButtonGroup";
import { useEffect, useState } from "react";
import { CustomButton } from "util/Custom/CustomButton";
import { useNavigate, useParams } from "react-router-dom";
import { CustomToggleButton } from "util/Custom/CutomToggleButton";

const IntroductionWrapper = styled(Flex)`
  width: 100%;
`;

function Introduction({ applyInformation }) {
  const navigater = useNavigate()
  const params = useParams()

  const [mentoringCategory, setMentoringCategory] = useState('커리어 상담')
  const [mentoringContent, setMentoringContent] = useState([])
  const [mentoringDate, setMentoringDate] = useState()
  const [isFilePreOpen, setIsFilePreOpen] = useState()

  useEffect(() => {
    const reservations = JSON.parse(localStorage.getItem('reservations'))
    if (reservations !== null) {
      const reservation = reservations[params.id]
      if (reservation !== undefined) {
        reservation['mentoringCategory'] && setMentoringCategory(reservation['mentoringCategory'])
        reservation['mentoringContent'] && setMentoringContent(reservation['mentoringContent'])
        reservation['consultingDate'] && setMentoringDate(new Date(reservation['consultingDate']['year'], reservation['consultingDate']['month'] - 1, reservation['consultingDate']['date']))
      }
    }
  }, [])


  const addMentoringContent = (contents) => {
    if (contents.length <= (mentoringCategory === '커리어 상담' ? 3 : 1)) {
      setMentoringContent(contents)
    }
  }

  useEffect(() => {
    setMentoringContent([])
  }, [mentoringCategory])

  const mentoringContents = {
    '커리어 상담': ['직무소개', '취업 상담', '진로 상담', '면접 팁', '업계 이야기'],
    '전형 준비': ['면접 대비', '자소서 구성', '자소서 첨삭', '포트폴리오 첨삭', '이력서 첨삭', 'CV/CL 첨삭', '코드 리뷰']
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
            valueArray={['커리어 상담', '전형 준비']}
            onChange={(event, value) => { setMentoringCategory(value) }}></CustomToggleButtonGroup>
        </Flex>
        <EmptyHeight height='16px'></EmptyHeight>

        <Flex>
          <TextSubtitle1>
            상담 내용
          </TextSubtitle1>
          <EmptyWidth width="8px"></EmptyWidth>
          {mentoringCategory === '커리어 상담' ? <TextBody2 color={colorTextLight}>최대 3개 선택 가능해요</TextBody2> : <TextBody2 color={colorTextLight}>1개만 선택 가능해요</TextBody2>}
        </Flex>
        <Flex>
          <CustomToggleButtonGroup
            value={mentoringContent}
            isExclusive={false}
            valueArray={mentoringContents[mentoringCategory]}
            onChange={(event, value) => { addMentoringContent(value) }}></CustomToggleButtonGroup>
        </Flex>
        <EmptyHeight height='28px' />


        {mentoringCategory === '커리어 상담' && <VerticalFlex>
          <Flex>
            <TextSubtitle1>
              이력서 사전 검토
            </TextSubtitle1>
            <EmptyWidth width="8px"></EmptyWidth>
          </Flex>
          <TextBody2 color={colorTextLight}>현직자가 자료를 검토하면 더 효율적이고 깊은 대화를 나눌 수 있어요!</TextBody2>
          <CustomToggleButtonGroup
            value={isFilePreOpen}
            isExclusive={false}
            valueArray={['희망', '비희망']}
            onChange={(event, value) => { setIsFilePreOpen(value) }}></CustomToggleButtonGroup>
          <EmptyHeight height='28px' />
        </VerticalFlex>}


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
              navigater(`/mentee/request/form/generalType1/${params.id}`) // TODO: type변수 설정해야함, [generalType1,generalType2,premium]
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
