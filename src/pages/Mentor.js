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
  margin-top: 30px;
  justify-content: space-between;
`;

const FirstColumnCards = styled(VerticalFlex)`
  margin-right: 30px;
`;

function Mentor() {
  return (
    <div>
      <FullWidthWrapper>
        <MetorProfileBanner>
          <MentorProfile name={'다슬기'} discription={'(주)다파다 | 무선사업부 | 디자이너'} />
        </MetorProfileBanner>
        <GrayBackground>
          <MaxWidthDiv>
            <CardsWrapper>
              <Grid container spacing={12}>
                <Grid item xs={6}>
                  <Grid container spacing={2} >
                    <Grid itme xs={12}>
                      <HelpCategory></HelpCategory>
                    </Grid>
                    <Grid itme xs={12}>
                      <MentorCalendarWrapper>
                        <MentorCalendar></MentorCalendar>
                      </MentorCalendarWrapper>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid container spacing={2}>
                    <Grid itme xs={12} marginBottom={'30px'}>
                      <Introduction></Introduction>
                    </Grid>
                    <Grid itme xs={12}>
                      <Introduction></Introduction>
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
