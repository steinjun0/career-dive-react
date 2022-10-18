import { styled } from "@mui/material";
import {
  VerticalFlex,
  Flex,
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

import RequestFormIcon from "assets/icon/RequestFormIcon";
import EditCalendarIcon from "assets/icon/EditCalendarIcon";
import PhoneIcon from "assets/icon/PhoneIcon";

import calendarSuccess from 'assets/icon/schedule/calendarSuccess.svg'
import calendarWait from 'assets/icon/schedule/calendarWait.svg'
import calendarCancel from 'assets/icon/schedule/calendarCancel.svg'
import { getAMOrPM } from "util/util";


const ConsultCardWrapper = styled(Flex)`
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

const ConsultCardLeft = styled(Flex)`
  background-color: ${colorBackgroundGrayLight};
  padding: 10px;
  align-items: center;
  width: 28px;
`;

const ConsultCardRight = styled(VerticalFlex)`
  padding: 24px;
  align-items: start;
`;

const ConsultDate = styled(TextBody2)`
  margin-bottom: 4px;
  margin-right: 4px;
`

const ConsultTime = styled(TextSubtitle2)`
  margin-bottom: 10px;
`

function ConsultMenteeCard({ consult, requestFormOnClick, changeOnClick, enterOnClick }) {
  let categoryIcon;
  if (consult.Approved) {
    categoryIcon = calendarSuccess;
  } else if (consult.Status == 'pending') {
    categoryIcon = calendarWait;
  } else if (consult.Status == 'done') {
    categoryIcon = calendarCancel;
  } else if (consult.Status == 'done') {
    categoryIcon = calendarSuccess;
  } else {
    categoryIcon = calendarSuccess;
  }
  return (
    <ConsultCardWrapper>
      <ConsultCardLeft>
        <CategoryImg src={categoryIcon}></CategoryImg>
      </ConsultCardLeft>

      <ConsultCardRight>
        <TextHeading6 style={{ marginBottom: '10px' }}>
          {consult.CompName}
        </TextHeading6>
        <VerticalFlex>
          <Flex style={{ marginBottom: '4px' }}>
            <TextSubtitle2>
              {consult.Job}
            </TextSubtitle2>
            <TextBody2 style={{ margin: '0 4px' }}>
              ·
            </TextBody2>
            <TextBody2>
              {consult.Nickname}
            </TextBody2>
          </Flex>

          <Flex>
            <ConsultDate>
              {new Date(consult.Date).getFullYear().toString().slice(2)}.{new Date(consult.Date).getMonth() + 1}.{new Date(consult.Date).getDate()}
            </ConsultDate>
            <ConsultTime>
              {getAMOrPM(consult.StartTime)} {consult.StartTime}
            </ConsultTime>
          </Flex>
          <Flex>
            <CustomIconButton
              Icon={RequestFormIcon}
              text='요청서'
              width='92px'
              hover_color={colorCareerDiveBlue}
              text_color={'#fff'}
              onClick={requestFormOnClick}
            >
              {/* TODO: params id 맞춰주기 */}
            </CustomIconButton>
            <EmptyWidth width='12px'></EmptyWidth>

            <CustomIconButton
              Icon={EditCalendarIcon}
              text='예약 변경'
              width='112px'
              hover_color={colorCareerDiveBlue}
              text_color={'#fff'}
              onClick={changeOnClick}
            ></CustomIconButton>
            <EmptyWidth width='12px'></EmptyWidth>

            <CustomIconButton
              Icon={PhoneIcon}
              text='상담 입장'
              width='112px'
              hover_color={colorCareerDiveBlue}
              text_color={'#fff'}
              onClick={enterOnClick}></CustomIconButton>

          </Flex>
        </VerticalFlex>

      </ConsultCardRight>
    </ConsultCardWrapper >
  );
}

export default ConsultMenteeCard