import { styled, useMediaQuery, useTheme } from "@mui/material";

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
  TextBody2,
  VerticalFlex,
} from "util/styledComponent";
import { Card } from "util/Card";
import { TagLarge, TagMedium } from "util/Custom/CustomTag";


const HelpCategoryWrapper = styled(Flex)`
`
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

function HelpCategory({ regularTags = [], premiumTags = [] }) {
  // const regularTags = ['직무 이야기', '업계 이야기', '필요 역량', '기술 스택', '내 역량 진단', '이직 준비', '진로 상담', '사내 문화', '면접 팁', '기타'];
  // const premiumTags = ['면접 대비', '자소서 구성', '자소서 첨삭', '포트폴리오 첨삭', '이력서 첨삭', 'CV/CL 첨삭', '코드 리뷰'];
  const theme = useTheme()
  const isDownMd = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <HelpCategoryWrapper>
      <Card
        no_divider={'true'} title={'이런 도움을 줄 수 있어요 😀'}
        titleTail={
          <RowAlignCenterFlex>
            <RegularLegend>• 커리어 상담</RegularLegend>
            <PremiumLegend>• 전형 준비</PremiumLegend>
          </RowAlignCenterFlex>
        }>
        <EmptyHeight height='16px'></EmptyHeight>
        {!isDownMd && <Flex style={{ flexWrap: 'wrap' }}>
          {regularTags && regularTags.map((tag, index) =>
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
          {premiumTags && premiumTags.map((tag, index) =>
            <Flex key={index} style={{ marginBottom: '8px' }}>
              <TagMedium
                color={colorCareerDivePink}
                background_color={colorBackgroundCareerDivePink}
              >
                <TextButton>{tag}</TextButton>
              </TagMedium>
              <EmptyWidth width='8px'></EmptyWidth>
            </Flex>
          )}
        </Flex>}
        {
          isDownMd &&
          <VerticalFlex >
            <Flex style={{ overflowX: 'scroll', marginBottom: '16px' }}>
              {regularTags && regularTags.map((tag, index) =>
                <Flex key={index} style={{ minWidth: 'fit-content' }}>
                  <TagMedium
                    color={colorCareerDiveBlue}
                    background_color={colorBackgroundCareerDiveBlue}
                  >
                    <TextButton>{tag}</TextButton>
                  </TagMedium>
                  <EmptyWidth width='8px'></EmptyWidth>
                </Flex>
              )}
            </Flex>
            <Flex style={{ overflowX: 'scroll' }}>
              {premiumTags && premiumTags.map((tag, index) =>
                <Flex key={index} style={{ minWidth: 'fit-content' }}>
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
          </VerticalFlex>
        }

      </Card>
    </HelpCategoryWrapper>


  );
}

export default HelpCategory;
