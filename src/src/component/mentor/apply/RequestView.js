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
  colorBackgroundCareerDivePink
} from "util/styledComponent";
import { Card } from "util/Card";
import { TagLarge } from "util/Custom/CustomTag";
import { useState } from "react";

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

function RequestView({ requestContent, menteeIntroduce, urlLink }) {
  const consultCategory = '커리어 상담'
  const consultContents = ['이직 준비', '면접 팁', '업계 이야기']

  return (
    <RequestCardWrapper>
      <Card
        title={'2022년 1월 9일(목)'}
        titleHead={
          <Flex>
            <EmptyWidth width='12px' />
            <TextSubtitle1 color={colorCareerDiveBlue}>오전 09:00~오전 9:20</TextSubtitle1>
          </Flex>}
        titleBottom={
          <VerticalFlex>
            <EmptyHeight height='16px' />
            <Flex>
              <CategoryTag category={consultCategory}><TextBody2>{consultCategory}</TextBody2></CategoryTag>
              <EmptyWidth width='8px' />
              {consultContents.map((value, index) => {
                return (
                  <Flex key={index}>
                    <TagLarge color={colorTextLight}
                      background_color={colorBackgroundGrayLight}>
                      <TextBody2>{value}</TextBody2>
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
        <EmptyHeight height='16px' />
        <TextSubtitle1>내 소개</TextSubtitle1>
        <EmptyHeight height='16px' />
        <GrayBackgroundText style={{ whiteSpace: 'pre' }}>
          {menteeIntroduce}
        </GrayBackgroundText>

        <EmptyHeight height='16px' />
        <TextSubtitle1>희망 상담 내용</TextSubtitle1>
        <EmptyHeight height='16px' />
        <GrayBackgroundText style={{ whiteSpace: 'pre' }}>
          {requestContent}
        </GrayBackgroundText>

        <EmptyHeight height='16px' />
        <TextSubtitle1>첨부 파일</TextSubtitle1>
        <EmptyHeight height='16px' />
        <VerticalFlex>
          <UnderlineText>파일예시.pdf</UnderlineText>
          <UnderlineText>파일예시2.pdf</UnderlineText>
          <UnderlineText>파일예시3.pdf</UnderlineText>
        </VerticalFlex>
        <EmptyHeight height='16px' />

        <TextSubtitle1>URL</TextSubtitle1>
        <EmptyHeight height='16px' />
        <UnderlineText>{urlLink}</UnderlineText>
        <EmptyHeight height='16px' />


      </Card>
    </RequestCardWrapper >

  );
}

export default RequestView;