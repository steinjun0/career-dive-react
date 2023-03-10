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

const dummyData = ['매드로봇님이 상담을 요청하였습니다.',
  '공부가싫어님이 상담을 요청하였습니다.',
  '멘토 여러분의 정보가 이제 블록체인으로 암호화 되어 보다 안전하게 이용 가능합니다! ellipsis testtesttest',
  '커리어다이브 클로즈드 베타 오픈 이벤트 🤙​']

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
