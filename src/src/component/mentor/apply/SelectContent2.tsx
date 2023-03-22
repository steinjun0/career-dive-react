import {
  colorBackgroundCareerDivePink,
  colorCareerDivePink,
  colorTextLight,
  EmptyHeight,
  EmptyWidth,
  Flex,
  TextBody2,
  TextHeading6,
  TextSubtitle1,
  TextSubtitle2,
  VerticalFlex,
} from "util/styledComponent";
import Card from "util/ts/Card";
import { styled } from "@mui/material";
import { getDayInKorean, updateReservation } from "util/util";
import { CustomToggleButtonGroup } from "util/Custom/CustomToggleButtonGroup";
import { useEffect, useState } from "react";
import { CustomButton } from "util/Custom/CustomButton";
import { useNavigate, useParams } from "react-router-dom";
import { formatMoney, getParsedLocalStorage } from "util/ts/util";
import React from "react";

const SelectContentWrapper = styled(VerticalFlex)({
  boxSizing: 'border-box',
  maxWidth: '582px',
  width: '100%'
});


const consultContents = {
  '커리어 상담': ['직무 이야기', '업계 이야기', '필요 역량', '기술 스택', '내 역량 진단', '이직 준비', '진로 상담', '사내 문화', '면접 팁', '기타'],
  '전형 준비': ['면접 대비', '자소서 구성', '자소서 첨삭', '포트폴리오 첨삭', '이력서 첨삭', 'CV/CL 첨삭', '코드 리뷰']
};

const consultCategoryConverter = {
  '커리어 상담': 'careerConsult',
  '전형 준비': 'prepare'
};

const priceTable: { [key in '20-커리어 상담-비희망' | '40-커리어 상담-비희망' | '20-커리어 상담-희망' | '40-커리어 상담-희망' | '20-전형 준비-희망' | '40-전형 준비-희망' | '20-전형 준비-비희망' | '40-전형 준비-비희망']: [number, number] } = {
  '20-커리어 상담-비희망': [13900, 9000],
  '40-커리어 상담-비희망': [24900, 16100],
  '20-커리어 상담-희망': [25400, 16500],
  '40-커리어 상담-희망': [39900, 25900],
  '20-전형 준비-희망': [40900, 26500],
  '40-전형 준비-희망': [53900, 35000],
  '20-전형 준비-비희망': [0, 0],
  '40-전형 준비-비희망': [0, 0],
};

function SelectContent({ mentorConsultContents }: { mentorConsultContents: { Type: string, Name: string; }[]; }) {
  const contentGuideObject: { [key: string]: string; } = {
    '면접 대비': `${localStorage.getItem('Nickname')}의 경력, 스펙 그리고 자소서를 토대로 한 예상 면접 질문을 제공해요.`,
    '자소서 구성': `${localStorage.getItem('Nickname')}님의 경력과 스펙을 토대로 자기소개서 구성을 도와줘요.`,
    '자소서 첨삭': `${localStorage.getItem('Nickname')}님이 작성한 초안을 토대로 흐름, 내용 그리고 문장력 등에 관한 피드백을 제공해요.`,
    '포트폴리오 첨삭': `${localStorage.getItem('Nickname')}님이 작성한 초안을 토대로 구성 및 내용 등에 관한 피드백을 제공해요.`,
    '이력서 첨삭': `${localStorage.getItem('Nickname')}님의 구성, 내용 그리고 단어 표현 등에 관한 구체적인 조언을 제공해요.`,
    'CV/CL 첨삭': `${localStorage.getItem('Nickname')}님의 CV/CL에 대한 구성, 내용 그리고 단어 표현 등에 관한 구체적인 조언을 제공해요.`,
    '코드 리뷰': `멘토가 작성된 코드를 토대로 피드백을 제공해요.`
  };
  const navigater = useNavigate();
  const params = useParams();

  const [consultingTime, setConsultingTime] = useState<20 | 40>();
  const [consultCategory, setConsultCategory] = useState<'커리어 상담' | '전형 준비'>('커리어 상담');
  const [consultContent, setConsultContent] = useState<string[] | string>([]);
  const [mentoringDate, setMentoringDate] = useState<Date>();
  const [isFilePreOpen, setIsFilePreOpen] = useState<'희망' | '비희망'>();

  const [contentGuide, setContentGuide] = useState<string>('');

  useEffect(() => {
    const reservations = getParsedLocalStorage('reservations');
    if (reservations !== null) {
      const reservation = reservations[+params.id!];
      if (reservation !== undefined) {
        reservation['consultingTime'] && setConsultingTime(reservation['consultingTime']);
        reservation['consultCategory'] && setConsultCategory(reservation['consultCategory']);
        reservation['consultContent'] && setConsultContent(reservation['consultContent']);
        reservation['startTime'] && setMentoringDate(new Date(reservation['startTime']));
        reservation['isFilePreOpen'] && setIsFilePreOpen(reservation['isFilePreOpen']);
      }
    }
    const element = document.getElementById("category");
    element && element.scrollIntoView({ behavior: 'smooth' });
  }, []);


  const addConsultContent = (contents: string[]) => {
    if (contents.length <= (consultCategory === '커리어 상담' ? 3 : 1)) {
      setConsultContent(contents);
    }
  };


  return (
    <SelectContentWrapper>
      <Card
        no_divider={false}
        title={`${mentoringDate && mentoringDate.getFullYear()}년
                ${mentoringDate && mentoringDate.getMonth() + 1}월
                ${mentoringDate && mentoringDate.getDate()}일
                (${mentoringDate && getDayInKorean(mentoringDate)})`}
        max_width={'582px'}
        sx={{ width: '100%' }}
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
            onChange={(event: Event, value: '커리어 상담' | '전형 준비') => {
              setConsultCategory(value);
              if (value === '전형 준비') {
                setIsFilePreOpen('희망');
              }
              setConsultContent([]);
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
                  return e.Type === '커리어 상담';
                } else if (consultCategory === '전형 준비') {
                  return e.Type === '전형 준비';
                }
              }).map((e) => e.Name)
            ] : []}
            selectedColor={consultCategory === '전형 준비' ? colorCareerDivePink : null}
            backgroundColor={consultCategory === '전형 준비' ? colorBackgroundCareerDivePink : null}
            onChange={(event: Event, value: string[] | string) => {
              if (consultCategory === '커리어 상담') {
                addConsultContent(value as string[]);
              }
              else if (consultCategory === '전형 준비') {
                if (value.length === 2) {
                  (value as string[]).splice(value.indexOf(consultContent[0]), 1);
                }
                if (value.length === 0) {
                  setContentGuide('');
                }
                setConsultContent(value as string);
                if ((value as string) in contentGuideObject) {
                  setContentGuide(contentGuideObject[value as string]);
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
            onChange={(evnet: Event, value: '희망' | '비희망') => {
              setIsFilePreOpen(value);
            }}
            selectedColor={undefined}
            backgroundColor={undefined}></CustomToggleButtonGroup>
        </VerticalFlex>}
      </Card>

      <EmptyHeight height={'30px'} />

      {(consultContent.length > 0 && (consultCategory === '커리어 상담' ? isFilePreOpen !== undefined : true)) && <Card
        title='결제 금액'
        no_divider={true}>
        <EmptyHeight height={'8px'} />

        <TextBody2 color={colorTextLight}>
          {consultingTime}분, {consultCategory}{consultCategory === '커리어 상담' && `, 이력서 사전 검토 ${isFilePreOpen}`}
        </TextBody2>
        <EmptyHeight height={'8px'} />
        <Flex style={{ marginLeft: 'auto' }}>
          <TextSubtitle1 color={colorCareerDivePink} style={{ textDecorationLine: 'line-through' }}>
            {consultingTime && consultCategory && isFilePreOpen && formatMoney(priceTable[`${consultingTime}-${consultCategory}-${isFilePreOpen}`][0], 0)}원
          </TextSubtitle1>
          <EmptyWidth width='8px' />
          <TextSubtitle2 color={colorCareerDivePink}>
            CBT 35% 할인
          </TextSubtitle2>
        </Flex>
        <EmptyHeight height={'8px'} />
        <TextHeading6 style={{ marginLeft: 'auto' }}>
          {consultingTime && consultCategory && isFilePreOpen && formatMoney(priceTable[`${consultingTime}-${consultCategory}-${isFilePreOpen}`][1], 0)}원
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
            ];
            if (consultContent.length === 0) {
              alert('상담 내용을 선택하세요');
            }
            else if (consultCategory === null) {
              alert('상담 유형을 선택하세요');
            } else {
              updateReservation(params.id, updatingData);
              navigater(`/mentee/request/${params.id}/form/${consultCategoryConverter[consultCategory]}`); // TODO: type변수 설정해야함, [generalType1,generalType2,premium]
            }
          }}
        >
          <TextSubtitle1>
            다음
          </TextSubtitle1>
        </CustomButton>
      </Card>}
    </SelectContentWrapper >

  );
}

export default SelectContent;
