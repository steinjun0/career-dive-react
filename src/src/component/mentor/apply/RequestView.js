import { Divider, styled, } from "@mui/material";

import {
  Flex,
  RowAlignCenterFlex,
  EmptyWidth,
  TextSubtitle2,
  TextBody2,
  EmptyHeight,
  LinkNoDeco,
  TextHeading6,
  colorCareerDiveBlue,
  TextSubtitle1,
  colorBackgroundGrayDark,
  colorBackgroundGrayLight,
  colorTextLight,
  VerticalFlex,
  colorBackgroundCareerDiveBlue,
  colorCareerDivePink,
  colorBackgroundCareerDivePink,
  UlNoDeco
} from "util/styledComponent";
import { Card } from "util/Card";
import { TagLarge } from "util/Custom/CustomTag";
import { useEffect, useState } from "react";
import { addMinute, createDateFromHourMin, getAMOrPM, getDayInKorean } from "util/util";

const RequestCardWrapper = styled(Flex)`
  // margin-top: 30px;
`;


const GrayBackgroundText = styled(Flex)`
  background-color: ${colorBackgroundGrayLight};
  color: ${colorTextLight};
  padding: 20px;
  font-size: 14px;
  line-height: 28px;
  border-radius: 8px;
`

const UnderlineText = styled(TextBody2)`
  text-decoration: underline;
`

const getCategoryColor = (category) => {
  if (category === '커리어 상담') {
    return colorCareerDiveBlue
  } else if (category === '전형 준비') {
    return colorCareerDivePink
  } else {
    return colorTextLight
  }
}

const getCategoryBackgroundColor = (category) => {
  if (category === '커리어 상담') {
    return colorBackgroundCareerDiveBlue
  } else if (category === '전형 준비') {
    return colorBackgroundCareerDivePink
  } else {
    return colorBackgroundGrayLight
  }
}

const CategoryTag = styled(TagLarge)`
  color:${props => getCategoryColor(props.category)};
  background-color:${props => getCategoryBackgroundColor(props.category)};
`

function RequestView({ consultData, menteeIntroduce, urlLink }) {
  const consultContents = ['이직 준비', '면접 팁', '업계 이야기']
  const getAMOrPMForDate = (date) => {
    if (date.getHours() < 12) {
      return '오전'
    } else if (date.getHours() == 12) {
      return '낮'
    } else {
      return '오후'
    }
  }
  const getHourMin = (date) => {
    if (date.getHours() <= 12) {
      return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
    } else {
      return `${(+date.getHours() - 12).toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
    }
  }
  const [startDate, setStartDate] = useState(new Date(consultData.Date))
  const [endDate, setEndDate] = useState(new Date(consultData.Date))
  useEffect(() => {
    const [tempStartDate, tempEndDate] = createDateFromHourMin(consultData.Date, consultData.StartTime, consultData.EndTime)
    setStartDate(tempStartDate)
    setEndDate(tempEndDate)
  }, [])



  return (
    <RequestCardWrapper>
      <Card
        title={`${new Date(consultData.Date).getFullYear()}년 ${new Date(consultData.Date).getMonth() + 1}월 ${new Date(consultData.Date).getDate()}일(${getDayInKorean(new Date(consultData.Date))})`}
        titleHead={
          <Flex>
            <EmptyWidth width='12px' />
            <TextSubtitle1 color={colorCareerDiveBlue}>{getAMOrPMForDate(new Date(startDate))} {getHourMin(startDate)}~{getAMOrPMForDate(endDate)} {getHourMin(endDate)}</TextSubtitle1>
          </Flex>}
        titleBottom={
          <VerticalFlex>
            <EmptyHeight height='16px' />
            <Flex>
              <CategoryTag category={consultData.Type}><TextBody2>{consultData.Type}</TextBody2></CategoryTag>
              <EmptyWidth width='8px' />
              {consultData.ConsultContentList.map((value, index) => {
                return (
                  <Flex key={index}>
                    <TagLarge color={colorTextLight}
                      background_color={colorBackgroundGrayLight}>
                      <TextBody2>{value.Name}</TextBody2>
                    </TagLarge>
                    <EmptyWidth width='8px'></EmptyWidth>
                  </Flex>
                )
              })}
            </Flex>
          </VerticalFlex>
        }>

        <EmptyHeight height='16px' />
        <TextHeading6>요청서</TextHeading6>

        {menteeIntroduce !== '' && <VerticalFlex>
          <EmptyHeight height='16px' />
          <TextSubtitle1>내 소개</TextSubtitle1>
          <EmptyHeight height='16px' />
          <GrayBackgroundText style={{ whiteSpace: 'pre-wrap' }}>
            {menteeIntroduce}
          </GrayBackgroundText>
        </VerticalFlex>}


        {consultData.RequestContent !== '' && <VerticalFlex>
          <EmptyHeight height='16px' />
          <TextSubtitle1>희망 상담 내용</TextSubtitle1>
          <EmptyHeight height='16px' />
          <GrayBackgroundText style={{ whiteSpace: 'pre-wrap' }}>
            {consultData.RequestContent}
          </GrayBackgroundText>
        </VerticalFlex>}


        {consultData.ConsultFileList.length >= 1 && <VerticalFlex>
          <EmptyHeight height='16px' />
          <TextSubtitle1>첨부 파일</TextSubtitle1>
          <EmptyHeight height='16px' />
          <VerticalFlex>
            {consultData.ConsultFileList.map((e, i) => {
              return <a key={i} style={{ color: 'initial' }} href={e.Url} target="_blank" download={true}><UnderlineText>{e.Name}</UnderlineText></a>
            })}
          </VerticalFlex>
        </VerticalFlex>}


        {urlLink !== '' && <VerticalFlex>
          <EmptyHeight height='16px' />
          <TextSubtitle1>URL</TextSubtitle1>
          <EmptyHeight height='16px' />
          <a style={{ color: 'initial' }} href={urlLink} target="_blank"><UnderlineText>{urlLink}</UnderlineText></a>
          <EmptyHeight height='16px' />
        </VerticalFlex>}



      </Card>
    </RequestCardWrapper >

  );
}

export default RequestView;