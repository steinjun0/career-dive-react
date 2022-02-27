import { useEffect, useState } from "react";
import { styled } from "@mui/material";

import Card from '../../util/Card'
import SimpleMenu from '../../util/SimpleMenu'

import {
  VerticalCenterAlignFlex,
  VerticalFlex,
  colorCareerDiveBlue,
  colorTextLight,
  Flex
} from "../../util/styledComponent";

import { getDifferenceMinutes } from '../../util/util'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

const DateWrapper = styled(VerticalFlex)`
  border-bottom: 1px solid #CFD6E0;
  padding-bottom: 16px;
`;

const WeekBox = styled(VerticalCenterAlignFlex)`
  justify-content: space-between;
  // width: 534px;
  height: 44px;
  width: 100%;
  margin-top: 16px;
`;

const DateBox = styled(VerticalCenterAlignFlex)`
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
  margin-top: 10px;
`;

const DayBox = styled(DateBox)`
  color: black;
`;

const AvailableDateBox = styled(DateBox)`
  background-color: rgba(105, 140, 255, 0.2);
  color: ${colorCareerDiveBlue};
  cursor: pointer;
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

const AvailableTime = styled(VerticalCenterAlignFlex)`
  width: 50%;
  height: 24px;
  margin-top: 16px;
`;

const YearMonthMenuWrapper = styled(VerticalCenterAlignFlex)`
 justify-content: center;
 margin-top: 10px;
`

const YearMonthMenu = styled(SimpleMenu)`
`;

function Calendar() {
  const year = 2022;
  const [month, setMonth] = useState(`${new Date().getMonth()}월`);
  const originData = [{ date: 9, availableTime: [['09:00', '09:40']] },
  { date: 10, availableTime: [['09:00', '09:40'], ['12:00', '13:00'], ['13:30', '13:50']] },
  { date: 11, availableTime: [['09:00', '09:40'], ['17:00', '19:00']] },
  { date: 16, availableTime: [['09:00', '09:40'], ['12:00', '13:00'], ['17:00', '19:00'], ['21:00', '22:00']] },
  { date: 17, availableTime: [['09:00', '09:40']] },
  { date: 18, availableTime: [['09:00', '09:40']] },
  ]
  const dayInKorean = ['일', '월', '화', '수', '목', '금', '토'];
  const availableDates = [9, 10, 11, 16, 17, 18];
  const [selectedDate, setSelectedDate] = useState(availableDates.length !== 0 ? availableDates[0] : 0);
  const [availableTime, setAvailableTime] = useState(availableDates.length !== 0 ? originData[0].availableTime : []);

  // const availableTime = [['09:00', '09:40'], ['12:00', '13:00'], ['17:00', '19:00'], ['21:00', '22:00']]


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

  const onClickAvailableDate = (date) => {
    setSelectedDate(date);
    let tempAvailableTime = []

    originData.forEach((element) => {
      if (element.date === date) {
        tempAvailableTime = element.availableTime;
      }
    })
    setAvailableTime(tempAvailableTime)
  }

  const [dates, setDates] = useState(getDatesOfMonth(year, month))

  useEffect(() => {
    if (month.length !== 0) {
      setDates(getDatesOfMonth(year, month.slice(0, month.length - 1)))
    }
  }, [month])

  return (
    <Card title={'상담 가능 일정'} min_width={400}>
      <CalendarWrapper>
        <YearMonthMenuWrapper>
          <YearMonthMenu
            style={{ fontWeight: 700, fontSize: 16, color: 'black' }}
            title={`2022년 ${month}`}
            menuItems={['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']}
            setState={setMonth}
            endIcon={<KeyboardArrowDownIcon />}></YearMonthMenu>
        </YearMonthMenuWrapper>

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
                    return <AvailableDateBox onClick={() => { onClickAvailableDate(date) }} key={`${weekIndex}${dateIndex}`}>{date}</AvailableDateBox>
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
            {year}년 {month} {selectedDate}일
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
