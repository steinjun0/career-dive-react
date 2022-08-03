import { Grid, styled } from "@mui/material";

import {
  FullWidthWrapper,
  GrayBackground,
  MaxWidthDiv,
  Flex,
  RowAlignCenterFlex,
  TextBody2,
  EmptyHeight
} from "util/styledComponent";

import OnComingShedule from "component/schedule/OnComingSchedule";
import ScheduleList from "component/schedule/ScheduleList";
import { Card } from "util/Card";
import { ChevronRight } from "@material-ui/icons";

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
    <FullWidthWrapper>
      <GrayBackground>
        <MaxWidthDiv>
          <CardsWrapper>
            <Grid container spacing={'30px'} marginTop={0}>
              <Grid item xs={6}>
                <OnComingShedule></OnComingShedule>
              </Grid>
              <Grid item xs={6}>
                <Card
                  style={{ boxSizing: 'border-box', maxWidth: '100%' }}
                  no_divider={'true'}
                  title={'공지 및 알림'}
                  titleHead={
                    <ChevronRight fontSize="medium" />
                  }>
                  <EmptyHeight height={'20px'} />
                  {dummyData.map((elem, index) => {
                    if (index == dummyData.length - 1) {
                      return <TextBody2 style={{ textOverflow: 'ellipsis' }}>{elem}</TextBody2>
                    } else {
                      return <TextBody2 style={{ marginBottom: 12, textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>{elem}</TextBody2>
                    }
                  })}
                </Card>

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

export default MentorSchedule;
