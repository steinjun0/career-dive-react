import { styled, } from "@mui/material";

import {
  Flex,
  EmptyWidth,
  TextBody2,
  EmptyHeight,
  TextHeading6,
  colorCareerDiveBlue,
  TextSubtitle1,
  colorBackgroundGrayLight,
  colorTextLight,
  VerticalFlex,
  colorBackgroundCareerDiveBlue,
  colorCareerDivePink,
  colorBackgroundCareerDivePink
} from "util/styledComponent";
import { Card } from "util/Card";
import { TagLarge } from "util/Custom/CustomTag";

const RequestCardWrapper = styled(Flex)`
  margin-top: 30px;
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
  if (category === '일반') {
    return colorCareerDiveBlue
  } else if (category === '프리미엄') {
    return colorCareerDivePink
  } else {
    return colorTextLight
  }
}

const getCategoryBackgroundColor = (category) => {
  if (category === '일반') {
    return colorBackgroundCareerDiveBlue
  } else if (category === '프리미엄') {
    return colorBackgroundCareerDivePink
  } else {
    return colorBackgroundGrayLight
  }
}

const CategoryTag = styled(TagLarge)`
  color:${props => getCategoryColor(props.category)};
  background-color:${props => getCategoryBackgroundColor(props.category)};
`

function Request() {
  const mentoringCategory = '일반'
  const mentoringContents = ['이직 준비', '면접 팁', '업계 이야기']
  // TODO: localStorage에서 받아오기
  return (
    // TODO: 디자인에 맞게 수정하기(덜어내기)
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
              <CategoryTag category={mentoringCategory}><TextBody2>{mentoringCategory}</TextBody2></CategoryTag>
              <EmptyWidth width='8px' />
              {mentoringContents.map((value, index) => {
                return (
                  // TODO: 수정 버튼 만들기

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
        <GrayBackgroundText>
          마케터가 되고 싶은 경희대학교 시각디자인학과 졸업예정자 김인종입니다.<br />
          인하우스 디자이너 혹은 대학원 진학을 희망하고 있습니다.
        </GrayBackgroundText>

        <EmptyHeight height='16px' />
        <TextSubtitle1>희망 상담 내용</TextSubtitle1>
        <EmptyHeight height='16px' />
        <GrayBackgroundText>
          안녕하세요, 저는 대학원생 장서진이라고 합니다.<br />
          우선 저는 곧 졸업을 앞두고 다음의 고민과 질문이 있어 상담을 요청드립니다.<br />
          1) 이런 저런 점이 고민이 됩니다. 저는 지금까지 이런 점들을 해왔고, 이런 분야에 관심이 있습니다.<br />
          2) 이런 저런 점이 고민이 됩니다. 저는 지금까지 이런 점들을 해왔고, 이런 분야에 관심이 있습니다.<br />
          그런데 교수님이나 남들은 이렇다고 합니다. 어떻게 생각하시는지 궁금합니다.<br />
          3) 이런 저런 점이 고민이 됩니다. 저는 지금까지 이런 점들을 해왔고, 이런 분야에 관심이 있습니다.<br /><br />
          이력서는 제 프로필의 첨부파일을 참고해 주시면 좋을 것 같습니다!<br />
          이력서는 제 프로필의 첨부파일을 참고해 주시면 좋을 것 같습니다!<br />
          이력서는 제 프로필의 첨부파일을 참고해 주시면 좋을 것 같습니다!<br /><br />
          정말 감사합니다:)
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
        <UnderlineText>https://artisd.studio/</UnderlineText>
        <EmptyHeight height='16px' />


      </Card>
    </RequestCardWrapper >

  );
}

export default Request;