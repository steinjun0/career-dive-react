import { styled } from "@mui/material";

import {
  VerticalCenterAlignFlex,
  VerticalFlex,
  Flex,
  CircleImg,
  TextBody2,
  TextSubtitle1,
  TextSubtitle2,
  CustomButton,
} from "../../util/styledComponent";
import Card from "../../util/Card";

import testMentorImage from "../../assets/img/testMentorImage.png";
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';

const ScheduleCardWrapper = styled(Flex)`
  width: 100%;
`;

const SchedulesWrapper = styled(VerticalFlex)`
  width: 100%;
`;

const ScheduleWrapper = styled(VerticalCenterAlignFlex)`
  width: 100%;
  margin-bottom: 22px;
`;

const ScheduleDateAndTime = styled(VerticalFlex)`
  
`;

const ProfileWrapper = styled(VerticalCenterAlignFlex)`
  margin-left: 30px;
`;

const ProfileImg = styled(CircleImg)`
  width: 40px;
  height: 40px;
  margin-right: 16px;
`;


const Buttons = styled(VerticalCenterAlignFlex)`
  margin-left: auto;
  width: 210px;
  justify-content: space-between;
`;


function OnComingShedule() {
  const schedules = [
    { date: '2022년 1월 18일', time: '오후 12시 20분', name: '다슬기', company: '(주)다파다' },
    { date: '2022년 2월 5일', time: '오전 10시 40분', name: '고디', company: '(주)다파다' },
  ]

  return (
    <ScheduleCardWrapper>
      <Card no_divider={'true'} title={'다가오는 일정'}>
        <SchedulesWrapper>

          {schedules.map((schedule, index) => {
            return (
              <ScheduleWrapper key={index}>

                <ScheduleDateAndTime>
                  <TextBody2>{schedule.date}</TextBody2>
                  <TextSubtitle1>{schedule.time}</TextSubtitle1>
                </ScheduleDateAndTime>

                <ProfileWrapper>
                  <ProfileImg src={testMentorImage}></ProfileImg>
                  <VerticalFlex>
                    <TextSubtitle2>{schedule.name} 멘토</TextSubtitle2>
                    <TextBody2>{schedule.company}</TextBody2>
                  </VerticalFlex>
                </ProfileWrapper>

                <Buttons>
                  <CustomButton background_color={'#f4f4f4'} custom_color={'#848484'} >예약 관리</CustomButton>
                  <CustomButton startIcon={<CallOutlinedIcon />}>상담 입장</CustomButton>
                </Buttons>

              </ScheduleWrapper>);
          })}

        </SchedulesWrapper>
      </Card>
    </ScheduleCardWrapper>

  );
}

export default OnComingShedule;
