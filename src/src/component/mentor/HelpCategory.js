import { styled } from "@mui/material";

import {
  RowAlignCenterFlex,
  colorCareerDivePink,
  colorCareerDiveBlue,
  Flex,
  TextButton,
  colorBackgroundCareerDiveBlue,
  colorBackgroundCareerDivePink,
  EmptyWidth,
  EmptyHeight,
} from "util/styledComponent";
import { Card } from "util/Card";
import { TagLarge, TagMedium } from "util/Custom/CustomTag";

const HelpCategoryWrapper = styled(Flex)`
  margin-bottom: 30px;
`

const Tag = styled(RowAlignCenterFlex)`
  border-radius: 4px;
  padding: 4px 8px;
  font-weight: 500;
  font-size: 14px;
  height: 20px;
  margin-bottom: 8px;
  margin-right: 8px;
`;

const RegularTag = styled(Tag)`
  background-color: rgba(105, 140, 255, 0.1);
  color: ${colorCareerDiveBlue};
`;

const PremiumTag = styled(Tag)`
  background-color: rgba(226, 93, 125, 0.1);
  color: ${colorCareerDivePink};
  margin-bottom: 0;
`;

const RegularLegend = styled('span')`
  color: ${colorCareerDiveBlue};
  font-size: 14px;
  font-weight: 500;
  margin-right: 14px;
`;

const PremiumLegend = styled('span')`
  color: ${colorCareerDivePink};
  font-weight: 500;
  font-size: 14px;
`;

function HelpCategory() {
  const regularTags = ['직무 이야기', '업계 이야기', '필요 역량', '기술 스택', '내 역량 진단', '이직 준비', '진로 상담', '사내 문화', '면접 팁', '기타'];
  const premiumTags = ['면접 대비', '자소서 구성', '자소서 첨삭', '포트폴리오 첨삭', '이력서 첨삭', 'CV/CL 첨삭', '코드 리뷰'];
  return (
    <HelpCategoryWrapper>
      <Card no_divider={'true'} title={'이런 도움을 줄 수 있어요 😀'}
        titleTail={
          <RowAlignCenterFlex>
            <RegularLegend>• 커리어 상담</RegularLegend>
            <PremiumLegend>• 전형 준비</PremiumLegend>
          </RowAlignCenterFlex>
        }>
        <EmptyHeight height='16px'></EmptyHeight>
        <Flex style={{ flexWrap: 'wrap' }}>
          {regularTags.map((tag, index) =>
            <Flex key={index} style={{ marginBottom: '8px' }}>
              <TagMedium
                color={colorCareerDiveBlue}
                background_color={colorBackgroundCareerDiveBlue}
              >
                <TextButton>{tag}</TextButton>
              </TagMedium>
              <EmptyWidth width='8px'></EmptyWidth>
            </Flex>
          )}
          {premiumTags.map((tag, index) =>
            <Flex key={index}>
              <TagMedium
                color={colorCareerDivePink}
                background_color={colorBackgroundCareerDivePink}
              >
                <TextButton>{tag}</TextButton>
              </TagMedium>
              <EmptyWidth width='8px'></EmptyWidth>
            </Flex>
          )}
        </Flex>

      </Card>
    </HelpCategoryWrapper>


  );
}

export default HelpCategory;
