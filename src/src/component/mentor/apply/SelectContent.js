import {
  colorBackgroundCareerDivePink,
  colorCareerDiveBlue,
  colorCareerDivePink,
  colorTextLight,
  EmptyHeight,
  EmptyWidth,
  Flex,
  TextBody1,
  TextBody2,
  TextHeading6,
  TextSubtitle1,
  TextSubtitle2,
  VerticalFlex,
} from "util/styledComponent";
import { Card } from "util/Card";
import { styled } from "@mui/material";
import { formatMoney, getDayInKorean, updateReservation } from "util/util";
import { CustomToggleButtonGroup } from "util/Custom/CustomToggleButtonGroup";
import { useEffect, useState } from "react";
import { CustomButton } from "util/Custom/CustomButton";
import { useNavigate, useParams } from "react-router-dom";
import { CustomToggleButton } from "util/Custom/CutomToggleButton";

const IntroductionWrapper = styled(VerticalFlex)`
  width: 534px;
`;

const consultContents = {
  '커리어 상담': ['직무 이야기', '업계 이야기', '필요 역량', '기술 스택', '내 역량 진단', '이직 준비', '진로 상담', '사내 문화', '면접 팁', '기타'],
  '전형 준비': ['면접 대비', '자소서 구성', '자소서 첨삭', '포트폴리오 첨삭', '이력서 첨삭', 'CV/CL 첨삭', '코드 리뷰']
}

const contentGuideObject = {
  '면접 대비': `경력, 스펙 그리고 자소서를 토대로 한 예상 면접 질문을 제공합니다.`,
  '자소서 구성': `${localStorage.getItem('Nickname')}님의 경력과 스펙을 토대로 자기소개서 구성을 도와줍니다.`,
  '자소서 첨삭': `${localStorage.getItem('Nickname')}님이 작성한 초안을 토대로 흐름, 내용 그리고 문장력 등에 관한 피드백을 제공합니다.`,
  '포트폴리오 첨삭': `${localStorage.getItem('Nickname')}님이 작성한 초안을 토대로 구성 및 내용 등에 관한 피드백을 제공합니다. `,
  '이력서 첨삭': `멘티 이력서의 구성, 내용 그리고 단어 표현 등에 관한 구체적인 조언을 제공해요.`,
  'CV/CL 첨삭': `멘티 CV/CL의 구성, 내용 그리고 단어 표현 등에 관한 구체적인 조언을 제공해요.`,
  '코드 리뷰': `멘토는 작성된 코드를 토대로 피드백을 제공합니다.`
}

const consultCategoryConverter = {
  '커리어 상담': 'careerConsult',
  '전형 준비': 'prepare'
}

const priceTable = {
  '20-커리어 상담-비희망': [13900, 9000],
  '40-커리어 상담-비희망': [24900, 16100],
  '20-커리어 상담-희망': [25400, 16500],
  '40-커리어 상담-희망': [39900, 25900],
  '20-전형 준비-희망': [40900, 26500],
  '40-전형 준비-희망': [53900, 35000],
}

function Introduction({ mentorConsultContents }) {
  const navigater = useNavigate()
  const params = useParams()

  const [consultingTime, setConsultingTime] = useState()
  const [consultCategory, setConsultCategory] = useState('커리어 상담')
  const [consultContent, setConsultContent] = useState([])
  const [mentoringDate, setMentoringDate] = useState()
  const [isFilePreOpen, setIsFilePreOpen] = useState()

  const [contentGuide, setContentGuide] = useState('');

  useEffect(() => {
    const reservations = JSON.parse(localStorage.getItem('reservations'))
    if (reservations !== null) {
      const reservation = reservations[params.id]
      if (reservation !== undefined) {
        console.log(reservation)
        reservation['consultingTime'] && setConsultingTime(reservation['consultingTime'])
        reservation['consultCategory'] && setConsultCategory(reservation['consultCategory'])
        reservation['consultContent'] && setConsultContent(reservation['consultContent'])
        reservation['consultingDate'] && setMentoringDate(new Date(reservation['consultingDate']['year'], reservation['consultingDate']['month'] - 1, reservation['consultingDate']['date']))
        reservation['isFilePreOpen'] && setIsFilePreOpen(reservation['isFilePreOpen'])
      }
    }
    const element = document.getElementById("category");
    element.scrollIntoView({ behavior: 'smooth' });
  }, [])


  const addConsultContent = (contents) => {
    if (contents.length <= (consultCategory === '커리어 상담' ? 3 : 1)) {
      setConsultContent(contents)
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
        max_width={'582px'}
      >
        <EmptyHeight height='16px'></EmptyHeight>
        <TextSubtitle1 id='category'>
          상담 유형
        </TextSubtitle1>

        <Flex>
          <CustomToggleButtonGroup
            value={consultCategory}
            isExclusive={true}
            valueArray={['커리어 상담', '전형 준비']}
            selectedColor={consultCategory === '전형 준비' ? colorCareerDivePink : null}
            backgroundColor={consultCategory === '전형 준비' ? colorBackgroundCareerDivePink : null}
            onChange={(event, value) => {
              setConsultCategory(value)
              if (value === '전형 준비') {
                setIsFilePreOpen('희망')
              }
              setConsultContent([])
            }}></CustomToggleButtonGroup>
        </Flex>
        <EmptyHeight height='16px'></EmptyHeight>

        <Flex>
          <TextSubtitle1>
            상담 내용
          </TextSubtitle1>
          <EmptyWidth width="8px"></EmptyWidth>
          {consultCategory === '커리어 상담' ? <TextBody2 color={colorTextLight}>최대 3개 선택 가능해요</TextBody2> : <TextBody2 color={colorTextLight}>1개만 선택 가능해요</TextBody2>}
        </Flex>
        <Flex>
          <CustomToggleButtonGroup
            value={consultContent}
            isExclusive={false}
            valueArray={mentorConsultContents ? [
              ...mentorConsultContents.filter((e) => {
                if (consultCategory === '커리어 상담') {
                  return e.Type === '커리어 상담'
                } else if (consultCategory === '전형 준비') {
                  return e.Type === '전형 준비'
                }
              }).map((e) => e.Name)
            ] : []}
            selectedColor={consultCategory === '전형 준비' ? colorCareerDivePink : null}
            backgroundColor={consultCategory === '전형 준비' ? colorBackgroundCareerDivePink : null}
            onChange={(event, value) => {
              if (consultCategory === '커리어 상담') {
                addConsultContent(value)
              }
              else if (consultCategory === '전형 준비') {
                if (value.length === 2) {
                  value.splice(value.indexOf(consultContent[0]), 1)
                }
                if (value.length === 0) {
                  setContentGuide('')
                }
                setConsultContent(value)
                if (value in contentGuideObject) {
                  setContentGuide(contentGuideObject[value])
                }
              }


            }}></CustomToggleButtonGroup>
        </Flex>
        {consultCategory === '전형 준비' && <TextBody2 color={colorCareerDivePink} style={{ marginTop: '28px' }}>{contentGuide}</TextBody2>}

        <EmptyHeight height='28px' />


        {consultCategory === '커리어 상담' && <VerticalFlex>
          <Flex>
            <TextSubtitle1>
              이력서 사전 검토
            </TextSubtitle1>
            <EmptyWidth width="8px"></EmptyWidth>
          </Flex>
          <TextBody2 color={colorTextLight}>현직자가 자료를 검토하면 더 효율적이고 깊은 대화를 나눌 수 있어요!</TextBody2>
          <CustomToggleButtonGroup
            value={isFilePreOpen}
            isExclusive={true}
            valueArray={['희망', '비희망']}
            onChange={(event, value) => {
              setIsFilePreOpen(value);
            }}></CustomToggleButtonGroup>
        </VerticalFlex>}
      </Card>

      <EmptyHeight height={'30px'} />

      {(consultContent.length > 0 && (consultCategory === '커리어 상담' ? ![undefined, null].includes(isFilePreOpen) : true)) && <Card
        title='결제 금액'
        no_divider='true'>
        <EmptyHeight height={'8px'} />

        <TextBody2 color={colorTextLight}>
          {consultingTime}분, {consultCategory}{consultCategory === '커리어 상담' && `, 이력서 사전 검토 ${isFilePreOpen}`}
        </TextBody2>
        <EmptyHeight height={'8px'} />
        <Flex>
          <TextSubtitle1 color={colorCareerDivePink} style={{ textDecorationLine: 'line-through' }}>
            {formatMoney(priceTable[`${consultingTime}-${consultCategory}-${isFilePreOpen}`][0], 0)}원
          </TextSubtitle1>
          <EmptyWidth width='8px' />
          <TextSubtitle2 color={colorCareerDivePink}>
            CBT 35% 할인
          </TextSubtitle2>
        </Flex>
        <EmptyHeight height={'8px'} />
        <TextHeading6>
          {formatMoney(priceTable[`${consultingTime}-${consultCategory}-${isFilePreOpen}`][1], 0)}원
        </TextHeading6>

        <EmptyHeight height={'30px'} />

        <CustomButton
          height='48px'
          disabled={consultContent.length <= 0 || isFilePreOpen == undefined}
          onClick={() => {
            const updatingData = [
              { name: 'consultContent', data: consultContent },
              { name: 'consultCategory', data: consultCategory },
              { name: 'isFilePreOpen', data: isFilePreOpen },
            ]
            if (consultContent === []) {
              alert('상담 내용을 선택하세요')
            }
            else if (consultCategory === null) {
              alert('상담 유형을 선택하세요')
            } else {
              updateReservation(params.id, updatingData)
              navigater(`/mentee/request/form/${consultCategoryConverter[consultCategory]}/${params.id}`) // TODO: type변수 설정해야함, [generalType1,generalType2,premium]
            }
          }}
        >
          <TextSubtitle1>
            다음
          </TextSubtitle1>
        </CustomButton>
      </Card>}
    </IntroductionWrapper >

  );
}

export default Introduction;
