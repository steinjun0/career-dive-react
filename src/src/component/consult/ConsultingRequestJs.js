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
import { addMinute, getAMOrPM, getDayInKorean, getMinuteString } from "util/util";
import { useNavigate } from "react-router-dom";
import API from "API";

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

function ConsultingRequest({ reservationList }) {
  const navigater = useNavigate();

  return (
    <ScheduleCardWrapper>
      <Card no_divider={'true'} title={'상담 요청'}>
        <SchedulesWrapper>
          {reservationList.length === 0 &&
            <Flex style={{ height: '52px', justifyContent: 'center', alignItems: 'center' }}>
              <TextBody2>
                상담 요청이 없습니다
              </TextBody2>
            </Flex>
          }
          {reservationList && reservationList.map((consult, index) => {
            return (
              <ScheduleWrapper key={index} style={{ marginBottom: index == reservationList.length - 1 ? 8 : 20 }}>

                <ScheduleDateAndTime>
                  <TextBody2>{new Date(consult.Date).getFullYear().toString().slice(2)}.{new Date(consult.Date).getMonth() + 1}.{new Date(consult.Date).getDate()}({getDayInKorean(new Date(consult.Date))})</TextBody2>
                  <TextSubtitle1>{+consult.StartTime.slice(0, consult.StartTime.indexOf(':')) <= 12
                    ?
                    `${getAMOrPM(consult.StartTime)} ${getMinuteString(new Date('2023-01-01 ' + consult.StartTime))}`
                    :
                    `${getAMOrPM(consult.StartTime)} ${getMinuteString(addMinute(new Date('2023-01-01 ' + consult.StartTime), -720))}`}</TextSubtitle1>
                </ScheduleDateAndTime>

                <ProfileWrapper>
                  <ProfileImg src={testImage}></ProfileImg>
                  <VerticalFlex>
                    <TextSubtitle2>{consult.Nickname} 멘티</TextSubtitle2>
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
                    onClick={() => {
                      navigater(`/mentee/schedule/${consult.ID}`)
                    }}
                  >
                    {/* TODO: params id 맞춰주기 */}
                  </CustomIconButton>
                  <EmptyWidth width='12px'></EmptyWidth>

                  <CustomIconButton
                    Icon={CircleDecline}
                    text='상담 거절'
                    width='110px'
                    hover_color={colorCareerDivePink}
                    text_color={'#fff'}
                    default_color={colorCareerDivePink}
                    default_text_color={'#fff'}
                    onClick={() => {
                      API.patchConsultReject(consult.ID).then(() => {
                        alert('상담을 거절했습니다')
                        window.location.reload()
                      })
                    }}
                  ></CustomIconButton>
                  <EmptyWidth width='12px'></EmptyWidth>

                  <CustomIconButton
                    Icon={CircleAccept}
                    text='상담 수락'
                    width='112px'
                    hover_color={colorSuccess}
                    text_color={'#fff'}
                    default_color={colorSuccess}
                    default_text_color={'#fff'}
                    onClick={() => {
                      API.patchConsultApprove(consult.ID).then(() => {
                        alert('상담을 수락했습니다')
                        window.location.reload()
                      })
                    }}></CustomIconButton>
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
