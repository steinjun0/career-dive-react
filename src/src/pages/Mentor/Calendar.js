import { Grid, styled } from "@mui/material";

import {
  FullWidthWrapper,
  GrayBackground,
  MaxWidthDiv,
  Flex,
  RowAlignCenterFlex,
  TextBody2,
  EmptyHeight,
  TextEllipsisContainer
} from "util/styledComponent";


import CalendarMentor from "component/mentor/CalendarMentor";

const CardsWrapper = styled(Flex)`
  justify-content: space-between;
  margin-top: 30px;
  margin-bottom: 154px;
`;


function MentorCalendar() {
  return (
    <FullWidthWrapper>
      <GrayBackground>
        <MaxWidthDiv>
          <CardsWrapper>
            <Grid container spacing={'30px'} marginTop={0} direction="column" alignItems="center">
              <Grid item xs={6} minWidth={582}>
                <CalendarMentor></CalendarMentor>
              </Grid>
            </Grid>
          </CardsWrapper>
        </MaxWidthDiv>
      </GrayBackground>
    </FullWidthWrapper>
  );
}

export default MentorCalendar;
