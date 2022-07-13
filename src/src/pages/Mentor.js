import { Grid, styled } from "@mui/material";

import {
  FullWidthWrapper,
  CenterWidthWrapper,
  GrayBackground,
  MaxWidthDiv,
  VerticalFlex,
  Flex
} from "util/styledComponent";

import MentorProfile from 'component/mentor/Profile'
import MentorCalendar from 'component/mentor/Calendar'
import HelpCategory from "component/mentor/HelpCategory";
import Introduction from "component/mentor/Introduction";
import RatingAndReview from "component/mentor/RatingAndReview";
import Request from "component/mentor/apply/RequestView";

const MetorProfileBanner = styled(CenterWidthWrapper)`
  height: 200px;
  flex-direction: row;
  align-items: center;
`;

const MentorCalendarWrapper = styled('div')`
  margin-top: 30px;
  margin-bottom: 30px;
`;

const CardsWrapper = styled(Flex)`
  justify-content: space-between;
  margin-top: 30px;
  margin-bottom: 154px;
`;


function Mentor() {
  return (
    <div>
      <FullWidthWrapper>
        <MaxWidthDiv>
          <MetorProfileBanner>
            <MentorProfile name={'다슬기'} discription={'(주)다파다 | 무선사업부 | 디자이너'} />
          </MetorProfileBanner>
        </MaxWidthDiv>
        <GrayBackground>
          <MaxWidthDiv>
            <CardsWrapper>
              <Grid container spacing={'30px'} marginTop={0}>

                <Grid container item xs={12} md={6}>
                  <Grid item xs={12} >
                    <HelpCategory></HelpCategory>
                    <Introduction></Introduction>
                    <RatingAndReview></RatingAndReview>
                  </Grid>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Grid container item spacing={2}>
                    <Grid item xs={12}>
                      <MentorCalendar></MentorCalendar>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardsWrapper>

          </MaxWidthDiv>
        </GrayBackground>
      </FullWidthWrapper>
    </div>
  );
}

export default Mentor;
