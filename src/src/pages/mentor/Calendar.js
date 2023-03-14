import { Grid, styled } from "@mui/material";

import {
  GrayBackground,
  MaxWidthDiv,
  Flex,
} from "util/styledComponent";


import MentorCalendar from "component/calendar/MentorCalendar";

const CardsWrapper = styled(Flex)`
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 154px;
`;


function MentorCalendarPage() {
  return (
    <GrayBackground>
      <MaxWidthDiv>
        <CardsWrapper>
          <MentorCalendar />
          {/* <Grid container spacing={'30px'} marginTop={0} justifyContent="center">
              <Grid item xs={12} minWidth={582}>
                <CalendarMentor></CalendarMentor>
              </Grid>
              <Grid item xs={12} alignItems="center">
                <MentorCalendar />
              </Grid>
            </Grid> */}
        </CardsWrapper>
      </MaxWidthDiv>
    </GrayBackground>
  );
}

export default MentorCalendarPage;
