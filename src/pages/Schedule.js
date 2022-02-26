import { Grid, styled } from "@mui/material";

import {
  FullWidthWrapper,
  CenterWidthWrapper,
  GrayBackground,
  MaxWidthDiv,
  VerticalFlex,
  Flex
} from "../util/styledComponent";

import MentorProfile from '../component/mentor/Profile'
import MentorCalendar from '../component/mentor/Calendar'
import HelpCategory from "../component/mentor/HelpCategory";
import Introduction from "../component/mentor/Introduction";
import RatingAndReview from "../component/mentor/RatingAndReview";
import OnComingShedule from "../component/schedule/OnComingSchedule";
import ScheduleList from "../component/schedule/ScheduleList";

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

const IntroductionWrapper = styled(Flex)`
  margin-bottom: 30px;
`;

function Schedule() {
  return (
    <div>
      <FullWidthWrapper>
        <GrayBackground>
          <MaxWidthDiv>
            <CardsWrapper>
              <Grid container spacing={'30px'} marginTop={0}>
                <Grid item xs={12}>
                  <OnComingShedule></OnComingShedule>
                </Grid>
                <Grid item xs={12}>
                  <ScheduleList></ScheduleList>
                </Grid>
              </Grid>
            </CardsWrapper>
          </MaxWidthDiv>
        </GrayBackground>
      </FullWidthWrapper>
    </div>
  );
}

export default Schedule;
