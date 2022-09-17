import { useEffect, useRef, useState } from "react";
import { styled, ToggleButton, ToggleButtonGroup } from "@mui/material";

import { Card } from "util/Card"
import SimpleMenu from "util/SimpleMenu"

import {
  RowAlignCenterFlex,
  VerticalFlex,
  colorCareerDiveBlue,
  colorTextLight,
  Flex,
} from "util/styledComponent";

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { usePrevious } from "util/util";


const CalendarWrapper = styled(Flex)`
  width: 100%;
  // margin-top: 30px;
  transition: all 0.3s ease-out;
`

const DateWrapper = styled(VerticalFlex)`
  border-bottom: 1px solid #CFD6E0;
  padding-bottom: 16px;
`;

const WeekBox = styled(RowAlignCenterFlex)`
  justify-content: space-between;
  // width: 534px;
  height: 44px;
  width: 100%;
  margin-top: 16px;
`;

const DateBox = styled(RowAlignCenterFlex)`
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius:12px;
  color: ${colorTextLight};
  cursor: pointer;
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
  cursor: pointer;
`;

const CalendarContentWrapper = styled(VerticalFlex)`
  justify-content: start;
  min-width: 400px;
`;


const YearMonthMenuWrapper = styled(RowAlignCenterFlex)`
 justify-content: center;
 margin: 16px 0;
 height: 24px;
`

const YearMonthMenu = styled(SimpleMenu)`
`;


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


function CalendarMentorUpper({ availableDates, onDateChange, selectedDateObjProp, month, setMonth }) {
  const year = 2022;
  // const [month, setMonth] = useState(selectedDateObjProp ? selectedDateObjProp.getMonth() + 1 + '월' : '0월');

  const dayInKorean = ['일', '월', '화', '수', '목', '금', '토'];
  // const [selectedDate, setSelectedDate] = useState(availableDates.length !== 0 ? availableDates[0] : 0);
  const [selectedDate, setSelectedDate] = useState(selectedDateObjProp ? selectedDateObjProp.getDate() : 0);

  const [dates, setDates] = useState(getDatesOfMonth(year, month))

  const onClickDate = (date) => {
    setSelectedDate(date);
  }



  const prevMonth = usePrevious(month);
  // useEffect(() => {
  //   setDates(getDatesOfMonth(year, month.slice(0, month.length - 1)))
  //   if (prevMonth !== '0월' && month.length !== 0) {
  //     setSelectedDate(0)
  //   }
  //   const selectedDateObj = new Date(year, Number(month.slice(0, -1)), 0)
  //   if (selectedDateObj instanceof Date) {
  //     onDateChange(selectedDateObj)
  //   }
  // }, [month])

  const onClickMonth = () => {
    if (month.length !== 0) {
      setSelectedDate(0)
    }
    const selectedDateObj = new Date(year, Number(month.slice(0, -1)), 0)
    if (selectedDateObj instanceof Date) {
      onDateChange(selectedDateObj)
    }
  }

  useEffect(() => {
    setDates(getDatesOfMonth(year, month.slice(0, - 1)))
  }, [month])


  useEffect(() => {
    try {
      const selectedDateObj = new Date(year, selectedDate == 0 ? month.slice(0, -1) : month.slice(0, -1) - 1, selectedDate)
      if (selectedDateObj instanceof Date) {
        onDateChange(selectedDateObj)
      }
    } catch (error) {

    }

  }, [selectedDate])

  useEffect(() => {
  }, [selectedDateObjProp])




  return (
    <CalendarContentWrapper>
      <YearMonthMenuWrapper>
        <YearMonthMenu
          style={{ fontWeight: 700, fontSize: 16, color: 'black' }}
          title={`2022년 ${month}`}
          menuItems={['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']}
          onClickProps={onClickMonth}
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
                  return <AvailableDateBox onClick={() => { onClickDate(date) }} key={`${weekIndex}${dateIndex}`}>{date}</AvailableDateBox>
                }
                else {
                  return <DateBox onClick={() => { onClickDate(date) }} key={`${weekIndex}${dateIndex}`}>{date}</DateBox>
                }
              }
            }
            )}
          </WeekBox>
        )}
      </DateWrapper>
    </CalendarContentWrapper>
  );
}

export default CalendarMentorUpper;
