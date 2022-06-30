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
} from "util/styledComponent";
import { CustomIconButton } from 'util/Custom/CustomIconButton'

import requestFormIcon from 'assets/icon/requestForm.svg'
import circleCalendarIcon from '../../assets/icon/circleCalendar.svg'

const ScheduleCardWrapper = styled(Flex)`
  align-items: stretch;
  border: 1px solid ${colorBlueGray};
  border-radius: 8px;
  height: 192px;
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
  return (
    <ScheduleCardWrapper>
      <ScheduleCardLeft>
        <CategoryImg src={calendarIcon}></CategoryImg>
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
              icon={requestIcon}
              text='요청서'
              width='90px'
              background_color={colorCareerDiveBlue}
              text_color={'#fff'}></CustomIconButton>
            <CustomIconButton
              icon={requestIcon}
              text='요청서'
              width='90px'
              background_color={colorCareerDiveBlue}
              text_color={'#fff'}></CustomIconButton>
            <CustomIconButton
              icon={requestIcon}
              text='요청서'
              width='90px'
              background_color={colorCareerDiveBlue}
              text_color={'#fff'}></CustomIconButton>
          </Flex>
        </VerticalFlex>

      </ScheduleCardRight>
    </ScheduleCardWrapper >
  );
}

export default ScheduleCard