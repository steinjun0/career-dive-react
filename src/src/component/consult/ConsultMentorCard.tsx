import { styled } from "@mui/material";
import {
  VerticalFlex,
  Flex,
  TextBody2,
  TextSubtitle2,
  colorBlueGray,
  colorCareerDiveBlue,
  colorBackgroundGrayLight,
  TextHeading6,
  colorCareerDivePink,
  colorBackgroundCareerDivePink,
  colorBackgroundCareerDiveBlue,
} from "util/styledComponent";
import { ExpandingIconButton } from 'component/ExpandingIconButton';

import RequestFormIcon from "assets/icon/RequestFormIcon";
import EditCalendarIcon from "assets/icon/EditCalendarIcon";
import PhoneIcon from "assets/icon/PhoneIcon";

import calendarSuccess from 'assets/icon/schedule/calendarSuccess.svg';
import calendarWait from 'assets/icon/schedule/calendarWait.svg';
import calendarCancel from 'assets/icon/schedule/calendarCancel.svg';
import React from "react";
import { IConsult } from "interfaces/consult";
import { IMentor } from "interfaces/mentor";
import { getDateString, getKoreanTimeString } from "util/ts/util";
import { TagMedium } from "util/Custom/CustomTag";


const ConsultCardWrapper = styled(Flex)`
  border: 1px solid ${colorBlueGray};
  border-radius: 8px;
  overflow: hidden;
`;

const CategoryImg = styled('img')`
  width: 28px;
  height: 28px;
`;

const ConsultCardLeft = styled(Flex)`
  background-color: ${colorBackgroundGrayLight};
  padding: 10px;
  align-items: center;
  min-width: 48px;
`;

function ConsultMentorCard(
  { consult, requestFormOnClick, changeOnClick, enterOnClick }
    :
    {
      consult: IConsult,
      requestFormOnClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
      changeOnClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
      enterOnClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
    }
) {
  let categoryIcon;
  if (consult.status === 'approved') {
    categoryIcon = calendarSuccess;
  } else if (consult.status === 'created') {
    categoryIcon = calendarWait;
  } else if (consult.status === 'rejected') {
    categoryIcon = calendarCancel;
  } else if (['done', 'mentor_noshow', 'mentee_noshow', 'noshow'].includes(consult.status)) {
    categoryIcon = calendarSuccess;
  } else {
    categoryIcon = calendarSuccess;
  }

  return (
    <ConsultCardWrapper>
      <ConsultCardLeft>
        <CategoryImg src={categoryIcon}></CategoryImg>
      </ConsultCardLeft>

      <VerticalFlex sx={{ padding: '24px', gap: '10px' }}>
        <TextSubtitle2>
          {consult.nickname}
        </TextSubtitle2>
        <VerticalFlex >
          <TextBody2>
            {getDateString(consult.date, 'short')}
          </TextBody2>
          <TextHeading6>
            {getKoreanTimeString(consult.startTime)}
          </TextHeading6>
        </VerticalFlex>
        <Flex>
          {
            consult.consultContentList
              .slice(0, 3)
              .map((e, i) => {
                if (e.type === '전형 준비') {
                  return <TagMedium
                    key={i}
                    style={{ marginRight: 8, padding: '0 8px', fontSize: '14px' }}
                    color={colorCareerDivePink}
                    background_color={colorBackgroundCareerDivePink}>
                    {e.name}
                  </TagMedium>;
                }
                else {
                  return <TagMedium
                    key={i}
                    style={{ marginRight: 8, padding: '0 8px', fontSize: '14px' }}
                    color={colorCareerDiveBlue}
                    background_color={colorBackgroundCareerDiveBlue}>
                    {e.name}
                  </TagMedium>;
                }
              })
          }
        </Flex>
        <Flex sx={{ gap: '12px' }}>
          <ExpandingIconButton
            Icon={RequestFormIcon}
            text={"요청서"}
            hoverColor={colorCareerDiveBlue}
            hoverTextColor={'white'}
            onClick={requestFormOnClick}
          />
          <ExpandingIconButton
            Icon={EditCalendarIcon}
            text={"예약 변경"}
            hoverColor={colorCareerDiveBlue}
            hoverTextColor={'white'}
            onClick={changeOnClick}
          />
          <ExpandingIconButton
            Icon={PhoneIcon}
            text={"상담 입장"}
            hoverColor={colorCareerDiveBlue}
            hoverTextColor={'white'}
            onClick={enterOnClick}
          />
        </Flex>

      </VerticalFlex>
    </ConsultCardWrapper >
  );
}

export default ConsultMentorCard;