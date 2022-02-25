import { styled } from "@mui/material";

import {
  VerticalCenterAlignDiv,
  Flex,
  colorCareerDivePink,
} from "../../util/styledComponent";
import Card from "../../util/Card";


const Tag = styled(VerticalCenterAlignDiv)`
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 14px;
  height: 20px;
  margin-bottom: 8px;
  margin-right: 8px;
`;

const RegularTag = styled(Tag)`
  background-color: rgba(105, 140, 255, 0.1);
  color: #698cff;
`;

const PremiumTag = styled(Tag)`
  background-color: rgba(226, 93, 125, 0.1);
  color: ${colorCareerDivePink};
`;


function HelpCategory() {
  const regularTags = ['직무 소개', '취업 상당', '진로 상담', '이직 준비', '면접 팁', '업계 이야기'];
  const premiumTags = ['자소서 구성', '자소서 첨삭', 'CV 첨삭', '포트폴리오 첨삭', '코드 리뷰', '면접 대비'];
  return (
    <Card noDivider={true} title={'이런 도움을 줄 수 있어요 😀'}>
      <VerticalCenterAlignDiv>
        {regularTags.map((tag, index) => <RegularTag key={index}>{tag}</RegularTag>)}
      </VerticalCenterAlignDiv>
      <VerticalCenterAlignDiv>
        {premiumTags.map((tag, index) => <PremiumTag key={index}>{tag}</PremiumTag>)}
      </VerticalCenterAlignDiv>

    </Card>
  );
}

export default HelpCategory;
