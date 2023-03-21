import { Grid, styled } from "@mui/material";

import {
  GrayBackground,
  MaxWidthDiv,
  Flex,

} from "util/styledComponent";

import OnComingShedule from "component/consult/OnComingSchedule";
import ScheduleList from "component/consult/ConsultList";
import MentorCalendar from "component/calendar/MentorCalendar";

const CardsWrapper = styled(Flex)`
  justify-content: space-between;
  margin-top: 30px;
  margin-bottom: 154px;
`;

function MentorSchedule() {
  return (
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
            <Grid item xs={6}>
              <MentorCalendar></MentorCalendar>
            </Grid>
          </Grid>
        </CardsWrapper>
      </MaxWidthDiv>
    </GrayBackground>
  );
}

export default MentorSchedule;
