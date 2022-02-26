import { Grid, styled } from "@mui/material";

import {
  VerticalCenterAlignFlex,
  VerticalFlex,
  Flex,
  CircleImg,
  TextBody2,
  TextSubtitle1,
  TextSubtitle2,
  CustomButton,
  colorBlueGray,
} from "../../util/styledComponent";
import Card from "../../util/Card";

import testMentorImage from "../../assets/img/testMentorImage.png";
import circleCalendarIcon from '../../assets/icon/circleCalendar.svg'

const ScheduleCard = styled(VerticalFlex)`
  border: 1px solid ${colorBlueGray};
  border-radius: 8px;
`;

const ScheduleCardTop = styled(Flex)`
  border-bottom: 1px solid ${colorBlueGray};
  padding: 20px;
  align-items: start;
`;

const ScheduleDate = styled(TextBody2)`
  margin-bottom: 4px;
`

const ScheduleTime = styled(TextSubtitle1)`
  margin-bottom: 10px;
`

const ScheduleCardBottom = styled(Flex)`
  padding: 20px;
`;

const ProfileImg = styled(CircleImg)`
  width: 40px;
  height: 40px;
  margin-right: 16px;
`;

const ContentWrapper = styled(VerticalFlex)`
  margin-left: 16px;
`;

function ScheduleList() {
  const schedules = [
    { date: '2022년 1월 18일', time: '오후 12시 20분', name: '다슬기', company: '(주)다파다' },
    { date: '2022년 2월 5일', time: '오전 10시 40분', name: '고디', company: '(주)다파다' },
    { date: '2022년 1월 18일', time: '오후 12시 20분', name: '다슬기', company: '(주)다파다' },
    { date: '2022년 2월 5일', time: '오전 10시 40분', name: '고디', company: '(주)다파다' },
  ]

  return (
    <Card no_divider={'true'} title={'내 신청 내역'}>
      <Grid container spacing={'30px'} marginTop={0}>
        {schedules.map((schedule, index) => {
          return (
            <Grid item xs={12} md={4} lg={4} xl={3}>
              <ScheduleCard>
                <ScheduleCardTop>
                  <img src={circleCalendarIcon} alt="" />
                  <ContentWrapper>
                    <ScheduleDate>
                      {schedule.date}
                    </ScheduleDate>
                    <ScheduleTime>
                      {schedule.time}
                    </ScheduleTime>
                    <CustomButton background_color={'#f4f4f4'} custom_color={'#848484'} >예약 관리</CustomButton>
                  </ContentWrapper>
                </ScheduleCardTop>

                <ScheduleCardBottom>
                  <ProfileImg src={testMentorImage}></ProfileImg>
                  <ContentWrapper>
                    <TextSubtitle2>
                      {schedule.name} 멘토
                    </TextSubtitle2>
                    <TextBody2>
                      {schedule.company}
                    </TextBody2>
                  </ContentWrapper>

                </ScheduleCardBottom>
              </ScheduleCard>
            </Grid>
          );
        })}
      </Grid>
    </Card>
  );
}

export default ScheduleList;
