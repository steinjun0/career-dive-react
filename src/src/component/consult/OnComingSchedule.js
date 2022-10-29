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
} from "util/styledComponent";
import { Card } from "util/Card";

import testMentorImage from "../../assets/img/testMentorImage.png";
import { CustomIconButton } from "util/Custom/CustomIconButton";
import RequestFormIcon from "assets/icon/RequestFormIcon";
import EditCalendarIcon from "assets/icon/EditCalendarIcon";
import PhoneIcon from "assets/icon/PhoneIcon";
import { addMinute, getAMOrPM, getDayInKorean, getMinuteString } from "util/util";
import { useNavigate } from "react-router-dom";
import { onEnterSession } from "./consult";

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

function OnComingShedule({ consultList }) {
  const navigater = useNavigate()
  return (
    <ScheduleCardWrapper>
      <Card no_divider={'true'} title={'다가오는 일정'}>

        {consultList && consultList.reverse().slice(0, 2).map((consult, index) => {
          return (
            <ScheduleWrapper key={index} style={{ marginTop: '20px' }}>

              <ScheduleDateAndTime>
                <TextBody2>{new Date(consult.Date).getFullYear().toString().slice(2)}.{new Date(consult.Date).getMonth() + 1}.{new Date(consult.Date).getDate()}({getDayInKorean(new Date(consult.Date))})</TextBody2>
                <TextSubtitle1>
                  {+consult.StartTime.slice(0, consult.StartTime.indexOf(':')) <= 12
                    ?
                    `${getAMOrPM(consult.StartTime)} ${getMinuteString(new Date('2022-01-01 ' + consult.StartTime))}`
                    :
                    `${getAMOrPM(consult.StartTime)} ${getMinuteString(addMinute(new Date('2022-01-01 ' + consult.StartTime), -720))}`}</TextSubtitle1>
              </ScheduleDateAndTime>

              <ProfileWrapper>
                <ProfileImg src={testImage}></ProfileImg>
                <VerticalFlex>
                  <TextSubtitle2>{consult.Nickname}</TextSubtitle2>
                  <TextBody2>{consult.CompName}</TextBody2>
                </VerticalFlex>
              </ProfileWrapper>

              <Buttons>
                <CustomIconButton
                  Icon={RequestFormIcon}
                  text='요청서'
                  width='92px'
                  hover_color={colorCareerDiveBlue}
                  text_color={'#fff'}
                  onClick={() => {
                    navigater(`/mentee/schedule/form/${consult.ID}`)
                  }}
                >
                </CustomIconButton>
                <EmptyWidth width='12px'></EmptyWidth>

                <CustomIconButton
                  Icon={EditCalendarIcon}
                  text='예약 변경'
                  width='112px'
                  hover_color={colorCareerDiveBlue}
                  text_color={'#fff'}></CustomIconButton>
                <EmptyWidth width='12px'></EmptyWidth>

                <CustomIconButton
                  Icon={PhoneIcon}
                  text='상담 입장'
                  width='112px'
                  hover_color={colorCareerDiveBlue}
                  text_color={'#fff'}
                  onClick={() => {
                    onEnterSession({
                      navigater,
                      date: consult.Date,
                      startTime: consult.StartTime,
                      endTime: consult.EndTime,
                      consultId: consult.ID
                    })
                  }}
                ></CustomIconButton>
                {/* <CustomButton background_color={'#f4f4f4'} custom_color={'#848484'} >예약 관리</CustomButton>
                  <CustomButton startIcon={<CallOutlinedIcon />}>상담 입장</CustomButton> */}
              </Buttons>

            </ScheduleWrapper>);
        })}

      </Card>
    </ScheduleCardWrapper>

  );
}

export default OnComingShedule;
