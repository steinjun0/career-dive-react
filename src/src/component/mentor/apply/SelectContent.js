import {
  colorBackgroundCareerDivePink,
  colorCareerDivePink,
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

const consultContents = {
  '커리어 상담': ['직무 이야기', '업계 이야기', '필요 역량', '기술 스택', '내 역량 진단', '이직 준비', '진로 상담', '사내 문화', '면접 팁', '기타'],
  '전형 준비': ['면접 대비', '자소서 구성', '자소서 첨삭', '포트폴리오 첨삭', '이력서 첨삭', 'CV/CL 첨삭', '코드 리뷰']
}

const contentGuideObject = {
  '면접 대비': `경력, 스펙 그리고 자소서를 토대로 한 예상 면접 질문을 제공합니다.`,
  '자소서 구성': `${localStorage.getItem('UserID')}님의 경력과 스펙을 토대로 자기소개서 구성을 도와줍니다.`,
  '자소서 첨삭': `${localStorage.getItem('UserID')}님이 작성한 초안을 토대로 흐름, 내용 그리고 문장력 등에 관한 피드백을 제공합니다.`,
  '포트폴리오 첨삭': `${localStorage.getItem('UserID')}님이 작성한 초안을 토대로 구성 및 내용 등에 관한 피드백을 제공합니다. `,
  '이력서 첨삭': ``,
  'CV/CL 첨삭': `${localStorage.getItem('UserID')}님이 작성한 초안을 토대로 흐름, 내용 그리고 문장력 등에 관한 피드백을 제공합니다.`,
  '코드 리뷰': `멘토는 작성된 코드를 토대로 피드백을 제공합니다.`
}

const mentoringCategoryConverter = {
  '커리어 상담': 'careerConsult',
  '전형 준비': 'prepare'
}

function Introduction({ mentorConsultContents }) {
  const navigater = useNavigate()
  const params = useParams()

  const [mentoringCategory, setMentoringCategory] = useState('커리어 상담')
  const [consultContent, setConsultContent] = useState([])
  const [mentoringDate, setMentoringDate] = useState()
  const [isFilePreOpen, setIsFilePreOpen] = useState()

  const [contentGuide, setContentGuide] = useState('');

  useEffect(() => {
    const reservations = JSON.parse(localStorage.getItem('reservations'))
    if (reservations !== null) {
      const reservation = reservations[params.id]
      if (reservation !== undefined) {
        reservation['mentoringCategory'] && setMentoringCategory(reservation['mentoringCategory'])
        reservation['consultContent'] && setConsultContent(reservation['consultContent'])
        reservation['consultingDate'] && setMentoringDate(new Date(reservation['consultingDate']['year'], reservation['consultingDate']['month'] - 1, reservation['consultingDate']['date']))
        reservation['isFilePreOpen'] && setIsFilePreOpen(reservation['isFilePreOpen'])
      }
    }
  }, [])


  const addConsultContent = (contents) => {
    if (contents.length <= (mentoringCategory === '커리어 상담' ? 3 : 1)) {
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
            selectedColor={mentoringCategory === '전형 준비' ? colorCareerDivePink : null}
            backgroundColor={mentoringCategory === '전형 준비' ? colorBackgroundCareerDivePink : null}
            onChange={(event, value) => {
              setMentoringCategory(value)
              setConsultContent([])
            }}></CustomToggleButtonGroup>
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
            value={consultContent}
            isExclusive={false}
            valueArray={[
              ...mentorConsultContents.filter((e) => {
                if (mentoringCategory === '커리어 상담') {
                  return e.Type === '커리어 상담'
                } else if (mentoringCategory === '전형 준비') {
                  return e.Type === '전형 준비'
                }
              }).map((e) => e.Name)
            ]}
            selectedColor={mentoringCategory === '전형 준비' ? colorCareerDivePink : null}
            backgroundColor={mentoringCategory === '전형 준비' ? colorBackgroundCareerDivePink : null}
            onChange={(event, value) => {
              if (mentoringCategory === '커리어 상담') {
                addConsultContent(value)
              }
              else if (mentoringCategory === '전형 준비') {
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
        {mentoringCategory === '전형 준비' && <TextBody2 color={colorCareerDivePink} style={{ marginTop: '28px' }}>{contentGuide}</TextBody2>}

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
            isExclusive={true}
            valueArray={['희망', '비희망']}
            onChange={(event, value) => {
              setIsFilePreOpen(value);
            }}></CustomToggleButtonGroup>
          <EmptyHeight height='28px' />
        </VerticalFlex>}

        <CustomButton
          height='52px'
          disabled={consultContent.length <= 0}
          onClick={() => {
            const updatingData = [
              { name: 'consultContent', data: consultContent },
              { name: 'mentoringCategory', data: mentoringCategory },
              { name: 'isFilePreOpen', data: isFilePreOpen },
            ]
            if (consultContent === []) {
              alert('상담 내용을 선택하세요')
            }
            else if (mentoringCategory === null) {
              alert('상담 유형을 선택하세요')
            } else {
              updateReservation(params.id, updatingData)
              navigater(`/mentee/request/form/${mentoringCategoryConverter[mentoringCategory]}/${params.id}`) // TODO: type변수 설정해야함, [generalType1,generalType2,premium]
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
