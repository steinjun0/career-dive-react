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
  colorCareerDivePink,
  colorSuccess,
} from "util/styledComponent";
import { Card } from "util/Card";

import testMentorImage from "../../assets/img/testMentorImage.png";
import RequestFormIcon from "assets/icon/RequestFormIcon";
import CircleDecline from "assets/icon/CircleDecline";
import CircleAccept from "assets/icon/CircleAccept";
import { getDayInKorean } from "util/util";
import { useNavigate } from "react-router-dom";
import API from "API";
import React from "react";
import { IConsult } from "interfaces/consult";
import { getKoreanTimeString } from "util/ts/util";
import { ExpandingIconButton } from "component/button/ExpandingIconButton";

const ScheduleCardWrapper = styled(Flex)`
  width: 100%;
`;

const SchedulesWrapper = styled(VerticalFlex)`
  width: 100%;
  margin-top: 20px;
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

const testImage = testMentorImage;

function ConsultingRequest({ reservationList }: { reservationList: IConsult[]; }) {
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
          <VerticalFlex sx={{ gap: '20px' }}>
            {reservationList && reservationList.map((consult, index) => {
              return (
                <Flex key={index} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                  <Flex>
                    <ScheduleDateAndTime>
                      <TextBody2>{consult.date.getFullYear().toString().slice(2)}.{consult.date.getMonth() + 1}.{consult.date.getDate()}({getDayInKorean(consult.date)})</TextBody2>
                      <TextSubtitle1>
                        {getKoreanTimeString(consult.startTime)}
                      </TextSubtitle1>
                    </ScheduleDateAndTime>

                    <ProfileWrapper>
                      <ProfileImg src={testImage}></ProfileImg>
                      <VerticalFlex>
                        <TextSubtitle2>{consult.nickname} 멘티</TextSubtitle2>
                      </VerticalFlex>
                    </ProfileWrapper>
                  </Flex>


                  <Flex sx={{ gap: '14px' }}>
                    <ExpandingIconButton
                      Icon={RequestFormIcon}
                      text={"요청서"}
                      hoverColor={colorCareerDiveBlue}
                      hoverTextColor={'white'}
                      onClick={() => {
                        navigater(`/mentee/schedule/${consult.id}`);
                      }}
                    />
                    <ExpandingIconButton
                      Icon={CircleDecline}
                      text={"상담 거절"}
                      color={colorCareerDivePink}
                      textColor={'white'}
                      hoverColor={colorCareerDivePink}
                      hoverTextColor={'white'}
                      onClick={() => {
                        API.patchConsultReject(consult.id).then(() => {
                          alert('상담을 거절했습니다');
                          window.location.reload();
                        });
                      }}
                    />

                    <ExpandingIconButton
                      Icon={CircleAccept}
                      text={"상담 수락"}
                      color={colorSuccess}
                      textColor={'white'}
                      hoverColor={colorSuccess}
                      hoverTextColor={'white'}
                      onClick={() => {
                        API.patchConsultApprove(consult.id).then(() => {
                          alert('상담을 수락했습니다');
                          window.location.reload();
                        });
                      }}
                    />
                  </Flex>
                </Flex>);
            })}
          </VerticalFlex>
        </SchedulesWrapper>
      </Card>
    </ScheduleCardWrapper>

  );
}

export default ConsultingRequest;
