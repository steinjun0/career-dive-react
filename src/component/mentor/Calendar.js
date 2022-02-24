import { styled } from "@mui/material";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";

import Card from '../../util/Card'

import {
  VerticalCenterAlignDiv,
  CircleImg,
  VerticalFlex,
  colorCareerDiveBlue,
  colorTextLight,
  Flex
} from "../../util/styledComponent";

import { getDifferenceMinutes } from '../../util/util'

const DateWrapper = styled(VerticalFlex)`
  border-bottom: 1px solid #CFD6E0;
  padding-bottom: 16px;
`;

const WeekBox = styled(VerticalCenterAlignDiv)`
  justify-content: space-between;
  // width: 534px;
  height: 44px;
  width: 100%;
  margin-top: 16px;
`;

const DateBox = styled(VerticalCenterAlignDiv)`
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius:12px;
  color: ${colorTextLight};
`;

const DayWrapper = styled(Flex)`
  justify-content: space-between;
  font-weight: 700;
  color: black;
  margin-top: 16px;
`;

const DayBox = styled(DateBox)`
  color: black;
`;

const AvailableDateBox = styled(DateBox)`
  background-color: rgba(105, 140, 255, 0.2);
  color: ${colorCareerDiveBlue};
`;

const SelectedDateBox = styled(DateBox)`
  background-color:${colorCareerDiveBlue};
  color: white;
`;

const CalendarWrapper = styled(VerticalFlex)`
  justify-content: space-between;
`;

const AvailableTimeOutSideWrapper = styled(VerticalFlex)`
  margin-top: 16px;
  margin-bottom:
`;

const AvailableTimeWrapper = styled(Flex)`
  flex-wrap: wrap;
  font-size: 14px;
  font-weight: 400;
`;

const DateTitle = styled('span')`
  font-weight: 700;
`;

const AvailableTime = styled(VerticalCenterAlignDiv)`
  width: 50%;
  height: 24px;
  margin-top: 16px;
`;

function Calendar({ name = '', discription = '' }) {
  const year = 2022;
  const month = 3;
  const dayInKorean = ['일', '월', '화', '수', '목', '금', '토'];
  const availableDates = [9, 10, 11, 16, 17, 18, 23, 24, 25, 30, 31];
  const selectedDate = 9;
  const availableTime = [['09:00', '09:40'], ['12:00', '13:00'], ['17:00', '19:00'], ['21:00', '22:00']]

  const getDatesOfMonth = (year, month) => {
    const dayOfFirstDate = new Date(year, month - 1, 1).getDay();
    const lastDateOfMonth = new Date(year, month, 0).getDate();

    let startDayOfWeek = dayOfFirstDate
    let dates = []
    for (let date = 1; date < lastDateOfMonth;) {
      let week = [...Array(startDayOfWeek).fill(0)]
      for (let day = startDayOfWeek; day < 7 && date <= lastDateOfMonth; day++) {
        week.push(date)
        date++;
      }
      if (week.length !== 7) {
        week.push(...Array(7 - week.length).fill(0))
      }
      dates.push(week)
      startDayOfWeek = 0
    }

    return dates;
  }

  const dates = getDatesOfMonth(year, month)
  console.log('dates', dates)
  return (
    <Card title={'상담 가능 일정'}>
      <CalendarWrapper>
        <DayWrapper>
          {dayInKorean.map((day, dayIndex) => <DayBox key={`${dayIndex}`}>{day}</DayBox>)}
        </DayWrapper>
        <DateWrapper>
          {dates.map((week, weekIndex) =>
            <WeekBox key={weekIndex}>
              {week.map((date, dateIndex) => {
                if (date === 0) return <DateBox key={`${weekIndex}${dateIndex}`}></DateBox>
                else {
                  if (date === selectedDate) {
                    return <SelectedDateBox key={`${weekIndex}${dateIndex}`}>{date}</SelectedDateBox>
                  } else if (availableDates.includes(date)) {
                    return <AvailableDateBox key={`${weekIndex}${dateIndex}`}>{date}</AvailableDateBox>
                  }
                  else {
                    return <DateBox key={`${weekIndex}${dateIndex}`}>{date}</DateBox>
                  }
                }
              }
              )}
            </WeekBox>
          )}
        </DateWrapper>
        <AvailableTimeOutSideWrapper>
          <DateTitle>
            2022년 1월 9일
          </DateTitle>
          <AvailableTimeWrapper>
            {availableTime.map((timeRange, index) =>
              <AvailableTime key={index}>{timeRange[0]} ~ {timeRange[1]} · {getDifferenceMinutes(timeRange[0], timeRange[1])}분</AvailableTime>)}
          </AvailableTimeWrapper>


        </AvailableTimeOutSideWrapper>


      </CalendarWrapper>
    </Card >
  );
}

export default Calendar;
