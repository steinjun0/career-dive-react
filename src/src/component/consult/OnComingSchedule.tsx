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
import { addMinute, getAMOrPM, getDateString, getDayInKorean, getKoreanTimeString, getMinuteString } from "util/util";
import { useNavigate } from "react-router-dom";
import { onEnterSession } from "./consult";
import React from "react";
import { IConsult } from "interfaces/consult";
import { ExpandingIconButton } from "component/ExpandingIconButton";

const ScheduleCardWrapper = styled(Flex)`
  width: 100%;
  height: 100%;
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

function OnComingShedule({ consultList }: { consultList: IConsult[]; }) {
  const navigater = useNavigate();
  return (
    <ScheduleCardWrapper>
      <Card no_divider={'true'} title={'다가오는 일정'}>
        {consultList.length === 0 &&
          <Flex style={{ height: '132px', justifyContent: 'center', alignItems: 'center' }}>
            <TextBody2>
              다가오는 일정이 없습니다
            </TextBody2>
          </Flex>
        }
        {consultList &&
          consultList
            .filter((consult) => {
              return consult.endTime >= new Date();
            })
            .slice(0, 3)
            .map((consult, index) => {
              return (
                <ScheduleWrapper key={index} style={{ marginTop: '20px' }}>

                  <ScheduleDateAndTime>
                    <TextBody2>{getDateString(consult.date)}</TextBody2>
                    <TextSubtitle1>
                      {getKoreanTimeString(consult.startTime)}
                      {/* {+consult.StartTime.slice(0, consult.StartTime.indexOf(':')) <= 12
                        ?
                        `${getAMOrPM(consult.StartTime)} ${getMinuteString(new Date('2023-01-01 ' + consult.StartTime))}`
                        :
                        `${getAMOrPM(consult.StartTime)} ${getMinuteString(addMinute(new Date('2023-01-01 ' + consult.StartTime), -720))}`} */}
                    </TextSubtitle1>
                  </ScheduleDateAndTime>

                  <ProfileWrapper>
                    <ProfileImg src={testImage}></ProfileImg>
                    <Flex>
                      {consult.company !== '' && <TextSubtitle2>{`${consult.company} · `}</TextSubtitle2>}
                      {consult.job !== '' && <TextSubtitle2>{`${consult.job} · `}</TextSubtitle2>}
                      <TextBody2>{consult.nickname}</TextBody2>
                    </Flex>
                  </ProfileWrapper>

                  <Buttons>

                    <ExpandingIconButton
                      Icon={RequestFormIcon}
                      text={"요청서"}
                      hoverColor={colorCareerDiveBlue}
                      hoverTextColor={'white'}
                      onClick={() => {
                        navigater(`/mentee/schedule/${consult.id}`);
                      }}
                    />
                    <EmptyWidth width='12px'></EmptyWidth>

                    <ExpandingIconButton
                      Icon={EditCalendarIcon}
                      text={"예약 변경"}
                      hoverColor={colorCareerDiveBlue}
                      hoverTextColor={'white'}
                      onClick={() => {
                        alert('기능 준비중입니다!');
                      }}
                    />
                    <EmptyWidth width='12px'></EmptyWidth>

                    {/* <CustomIconButton
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
                          consultId: consult.ID,
                          consultStatus: consult.Status
                        });
                      }}
                    ></CustomIconButton> */}
                    <ExpandingIconButton
                      Icon={PhoneIcon}
                      text={"상담 입장"}
                      hoverColor={colorCareerDiveBlue}
                      hoverTextColor={'white'}
                      onClick={() => {
                        onEnterSession({
                          navigater,
                          date: consult.date,
                          startTime: consult.startTime, // TODO: 내부 타입 맞춰줘야함
                          endTime: consult.endTime, // TODO: 내부 타입 맞춰줘야함
                          consultId: consult.id,
                          consultStatus: consult.status
                        });
                      }}
                    />
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
