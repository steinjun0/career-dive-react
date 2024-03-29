import { Grid, styled } from "@mui/material";

import {
  FullWidthWrapper,
  CenterWidthWrapper,
  GrayBackground,
  MaxWidthDiv,
  Flex
} from "util/styledComponent";

import MentorProfile from 'component/mentor/Profile'
import RequestView from "component/mentor/apply/RequestView";
import React from 'react'

const MetorProfileBanner = styled(CenterWidthWrapper)`
  height: 200px;
  flex-direction: row;
  align-items: center;
`;

const CardsWrapper = styled(Flex)`
  justify-content: space-between;
  margin-top: 30px;
  margin-bottom: 158px;
  width: 582px;
`;


function MentoringApplyViewerMentor() {

  return (
    <div>
      <FullWidthWrapper>
        <MaxWidthDiv>
          <MetorProfileBanner>
            <MentorProfile name={'다슬기'} description={'(주)다파다 | 무선사업부 | 디자이너'} />
          </MetorProfileBanner>
        </MaxWidthDiv>
        <GrayBackground>
          <CenterWidthWrapper>
            <Grid container spacing={'30px'} marginTop={0}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <RequestView />

              </Grid>
            </Grid>
            <CardsWrapper>
            </CardsWrapper>
          </CenterWidthWrapper>
        </GrayBackground>
      </FullWidthWrapper>
    </div>
  );
}

export default MentoringApplyViewerMentor;
