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
  const regularTags = ['직무 소개', '취업 상담', '진로 상담', '이직 준비', '면접 팁', '업계 이야기'];
  const premiumTags = ['자소서 구성', '자소서 첨삭', 'CV 첨삭', '포트폴리오 첨삭', '코드 리뷰', '면접 대비'];
  return (
    <HelpCategoryWrapper>
      <Card no_divider={'true'} title={'이런 도움을 줄 수 있어요 😀'}
        titleTail={
          <RowAlignCenterFlex>
            <RegularLegend>• 일반</RegularLegend>
            <PremiumLegend>• 프리미엄</PremiumLegend>
          </RowAlignCenterFlex>
        }>
        <EmptyHeight height='16px'></EmptyHeight>
        <RowAlignCenterFlex>
          {regularTags.map((tag, index) =>
            <Flex key={index}>
              <TagMedium
                color={colorCareerDiveBlue}
                background_color={colorBackgroundCareerDiveBlue}
              >
                <TextButton>{tag}</TextButton>
              </TagMedium>
              <EmptyWidth width='8px'></EmptyWidth>
            </Flex>
          )}
        </RowAlignCenterFlex>
        <EmptyHeight height='16px'></EmptyHeight>
        <RowAlignCenterFlex>
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
        </RowAlignCenterFlex>

      </Card>
    </HelpCategoryWrapper>


  );
}

export default HelpCategory;
