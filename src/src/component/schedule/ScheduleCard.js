import { Button, Grid, styled } from "@mui/material";
import {
  VerticalFlex,
  Flex,
  CircleImg,
  TextBody2,
  TextSubtitle1,
  TextSubtitle2,
  colorBlueGray,
  colorCareerDiveBlue,
  colorBackgroundGrayLight,
  TextHeading6,
  EmptyWidth,
} from "util/styledComponent";
import { CustomIconButton } from 'util/Custom/CustomIconButton'

import requestFormIcon from 'assets/icon/requestForm.svg'
import circleCalendarIcon from '../../assets/icon/circleCalendar.svg'
import RequestFormIcon from "assets/icon/RequestFormIcon";
import EditCalendarIcon from "assets/icon/EditCalendarIcon";
import PhoneIcon from "assets/icon/PhoneIcon";

import calendarSuccess from 'assets/icon/schedule/calendarSuccess.svg'
import calendarWait from 'assets/icon/schedule/calendarWait.svg'
import calendarCancel from 'assets/icon/schedule/calendarCancel.svg'
import { useNavigate } from "react-router-dom";


const ScheduleCardWrapper = styled(Flex)`
  align-items: stretch;
  border: 1px solid ${colorBlueGray};
  border-radius: 8px;
  height: 192px;
  overflow: hidden;
`;

const CategoryImg = styled('img')`
  width: 28px;
  height: 28px;
`;

const ScheduleCardLeft = styled(Flex)`
  background-color: ${colorBackgroundGrayLight};
  padding: 10px;
  align-items: center;
  width: 28px;
`;

const ScheduleCardRight = styled(VerticalFlex)`
  padding: 24px;
  align-items: start;
`;

const ScheduleDate = styled(TextBody2)`
  margin-bottom: 4px;
  margin-right: 4px;
`

const ScheduleTime = styled(TextSubtitle1)`
  margin-bottom: 10px;
`



function ScheduleCard({ schedule }) {
  const calendarIcon = circleCalendarIcon;
  const requestIcon = requestFormIcon;
  const navigater = useNavigate();

  let categoryIcon;
  if (schedule.category == '예약 성공') {
    categoryIcon = calendarSuccess;
  } else if (schedule.category == '예약 대기') {
    categoryIcon = calendarWait;
  } else if (schedule.category == '예약 실패') {
    categoryIcon = calendarCancel;
  } else if (schedule.category == '상담 완료') {
    categoryIcon = calendarSuccess;
  } else {
    categoryIcon = calendarSuccess;
  }
  return (
    <ScheduleCardWrapper>
      <ScheduleCardLeft>
        <CategoryImg src={categoryIcon}></CategoryImg>
      </ScheduleCardLeft>

      <ScheduleCardRight>
        <TextHeading6 style={{ marginBottom: '10px' }}>
          {schedule.company}
        </TextHeading6>
        <VerticalFlex>
          <Flex style={{ marginBottom: '4px' }}>
            <TextSubtitle2>
              {schedule.name}
            </TextSubtitle2>
            <TextBody2 style={{ margin: '0 4px' }}>
              ·
            </TextBody2>
            <TextBody2>
              {schedule.position}
            </TextBody2>
          </Flex>

          <Flex>
            <ScheduleDate>
              {schedule.date}
            </ScheduleDate>
            <ScheduleTime>
              {schedule.time}
            </ScheduleTime>
          </Flex>
          <Flex>
            <CustomIconButton
              Icon={RequestFormIcon}
              text='요청서'
              width='90px'
              hover_color={colorCareerDiveBlue}
              text_color={'#fff'}
              onClick={() => { navigater(`/mentee/mentor/mentoring/apply/viewer/1`) }}
            >
              {/* TODO: params id 맞춰주기 */}
            </CustomIconButton>
            <EmptyWidth width='12px'></EmptyWidth>

            <CustomIconButton
              Icon={EditCalendarIcon}
              text='예약 변경'
              width='105px'
              hover_color={colorCareerDiveBlue}
              text_color={'#fff'}></CustomIconButton>
            <EmptyWidth width='12px'></EmptyWidth>

            <CustomIconButton
              Icon={PhoneIcon}
              text='상담 입장'
              width='105px'
              hover_color={colorCareerDiveBlue}
              text_color={'#fff'}></CustomIconButton>

          </Flex>
        </VerticalFlex>

      </ScheduleCardRight>
    </ScheduleCardWrapper >
  );
}

export default ScheduleCard