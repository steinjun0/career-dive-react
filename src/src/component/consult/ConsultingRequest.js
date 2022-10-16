import { styled } from "@mui/material";

import {
  RowAlignCenterFlex,
  VerticalFlex,
  Flex,
  CircleImg,
  TextBody2,
  TextSubtitle1,
  TextSubtitle2,
  colorCareerDiveBlue,
  EmptyWidth,
  colorCareerDivePink,
  colorSuccess,
} from "util/styledComponent";
import { CustomButton } from 'util/Custom/CustomButton'
import { Card } from "util/Card";

import testMentorImage from "../../assets/img/testMentorImage.png";
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import { CustomIconButton } from "util/Custom/CustomIconButton";
import RequestFormIcon from "assets/icon/RequestFormIcon";
import EditCalendarIcon from "assets/icon/EditCalendarIcon";
import CircleDecline from "assets/icon/CircleDecline";
import CircleAccept from "assets/icon/CircleAccept";
import CalendarCancel from "assets/icon/schedule/CalendarCancel";
import CalendarSuccess from "assets/icon/schedule/CalendarSuccess";

const ScheduleCardWrapper = styled(Flex)`
  width: 100%;
`;

const SchedulesWrapper = styled(VerticalFlex)`
  width: 100%;
  margin-top: 20px;
`;

const ScheduleWrapper = styled(RowAlignCenterFlex)`
  width: 100%;
  height: 52px;
`;

const ScheduleDateAndTime = styled(VerticalFlex)`
  
`;

const ProfileWrapper = styled(RowAlignCenterFlex)`
  margin-left: 30px;
`;

const ProfileImg = styled(CircleImg)`
  width: 40px;
  height: 40px;
  margin-right: 16px;
`;


const Buttons = styled(RowAlignCenterFlex)`
  margin-left: auto;
  width: auto;
  justify-content: space-between;
`;

const testImage = testMentorImage;

function ConsultingRequest() {
  const schedules = [
    { date: '2022년 1월 18일', time: '오후 12시 20분', name: '다슬기', company: '(주)다파다' },
    { date: '2022년 2월 5일', time: '오전 10시 40분', name: '고디', company: '(주)다파다' },
  ]

  return (
    <ScheduleCardWrapper>
      <Card no_divider={'true'} title={'상담 요청'}>
        <SchedulesWrapper>

          {schedules.map((schedule, index) => {
            return (
              <ScheduleWrapper key={index} style={{ marginBottom: index == schedules.length - 1 ? 8 : 20 }}>

                <ScheduleDateAndTime>
                  <TextBody2>{schedule.date}</TextBody2>
                  <TextSubtitle1>{schedule.time}</TextSubtitle1>
                </ScheduleDateAndTime>

                <ProfileWrapper>
                  <ProfileImg src={testImage}></ProfileImg>
                  <VerticalFlex>
                    <TextSubtitle2>{schedule.name} 멘토</TextSubtitle2>
                    {/* <TextBody2>{schedule.company}</TextBody2> */}
                  </VerticalFlex>
                </ProfileWrapper>

                <Buttons>
                  <CustomIconButton
                    Icon={RequestFormIcon}
                    text='요청서'
                    width='92px'
                    hover_color={colorCareerDiveBlue}
                    text_color={'#fff'}
                    onClick={() => { }}
                  >
                    {/* TODO: params id 맞춰주기 */}
                  </CustomIconButton>
                  <EmptyWidth width='12px'></EmptyWidth>

                  <CustomIconButton
                    Icon={CircleDecline}
                    text='상담 취소'
                    width='110px'
                    hover_color={colorCareerDivePink}
                    text_color={'#fff'}
                    default_color={colorCareerDivePink}
                    default_text_color={'#fff'}
                  ></CustomIconButton>
                  <EmptyWidth width='12px'></EmptyWidth>

                  <CustomIconButton
                    Icon={CircleAccept}
                    text='상담 수락'
                    width='112px'
                    hover_color={colorSuccess}
                    text_color={'#fff'}
                    default_color={colorSuccess}
                    default_text_color={'#fff'}></CustomIconButton>
                  {/* <CustomButton background_color={'#f4f4f4'} custom_color={'#848484'} >예약 관리</CustomButton>
                  <CustomButton startIcon={<CallOutlinedIcon />}>상담 입장</CustomButton> */}
                </Buttons>

              </ScheduleWrapper>);
          })}

        </SchedulesWrapper>
      </Card>
    </ScheduleCardWrapper>

  );
}

export default ConsultingRequest;