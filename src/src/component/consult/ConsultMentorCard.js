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
  EmptyHeight,
  colorBackgroundCareerDiveBlue,
  colorCareerDivePink,
  colorBackgroundCareerDivePink,
} from "util/styledComponent";
import { CustomIconButton } from 'util/Custom/CustomIconButton'

import RequestFormIcon from "assets/icon/RequestFormIcon";
import EditCalendarIcon from "assets/icon/EditCalendarIcon";
import PhoneIcon from "assets/icon/PhoneIcon";

import calendarSuccess from 'assets/icon/schedule/calendarSuccess.svg'
import calendarWait from 'assets/icon/schedule/calendarWait.svg'
import calendarCancel from 'assets/icon/schedule/calendarCancel.svg'
import { getAMOrPM, getDayInKorean } from "util/util";
import { TagLarge } from "util/Custom/CustomTag";


const ConsultCardWrapper = styled(Flex)`
  align-items: stretch;
  border: 1px solid ${colorBlueGray};
  border-radius: 8px;
  height: 222px;
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

function ConsultMentorCard({ consult, requestFormOnClick, changeOnClick, enterOnClick }) {
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
        <VerticalFlex>
          <Flex style={{ marginBottom: '4px' }}>
            <TextSubtitle2>
              {consult.Nickname}
            </TextSubtitle2>
          </Flex>

          <Flex>
            <TextBody2>
              {new Date(consult.Date).getFullYear()}년 {new Date(consult.Date).getMonth() + 1}월 {new Date(consult.Date).getDate()}일({getDayInKorean(new Date(consult.Date))})
            </TextBody2>
          </Flex>
          <TextHeading6>
            {getAMOrPM(consult.StartTime)} {consult.StartTime.slice(0, consult.StartTime.indexOf(':'))}시 {consult.StartTime.slice(consult.StartTime.indexOf(':') + 1)}분
          </TextHeading6>

          <EmptyHeight height={'10px'} />

          <Flex>
            {consult.ConsultContentList.slice(0, 3).map((e, i) => {
              if (e.Type === '전형 준비') return <TagLarge key={i} color={colorCareerDivePink} background_color={colorBackgroundCareerDivePink}>{e.Name}</TagLarge>
              else return <TagLarge
                key={i}
                style={{ marginRight: 8 }}
                color={colorCareerDiveBlue}
                background_color={colorBackgroundCareerDiveBlue}>
                {e.Name}
              </TagLarge>
            })}
          </Flex>

          <EmptyHeight height={'10px'} />


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

export default ConsultMentorCard