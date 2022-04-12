import { Grid, styled } from "@mui/material";

import {
  FullWidthWrapper,
  GrayBackground,
  MaxWidthDiv,
  Flex
} from "util/styledComponent";

import OnComingShedule from "component/schedule/OnComingSchedule";
import ScheduleList from "component/schedule/ScheduleList";

const CardsWrapper = styled(Flex)`
  justify-content: space-between;
  margin-top: 30px;
  margin-bottom: 154px;
`;

function Schedule() {
  return (
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
  );
}

export default Schedule;
