import { useEffect, useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { usePrevious } from "util/util";
import { AvailableDateBox, CalendarContentWrapper, DateBox, DisableDateBox, DateWrapper, DayBox, DayWrapper, SelectedDateBox, WeekBox, YearMonthMenu, YearMonthMenuWrapper } from "./CalendarStyledComponents";




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
  const [year, setYear] = useState(2022);
  // const [month, setMonth] = useState(selectedDateObjProp ? selectedDateObjProp.getMonth() + 1 + '월' : '0월');

  const dayInKorean = ['일', '월', '화', '수', '목', '금', '토'];
  // const [selectedDate, setSelectedDate] = useState(availableDates.length !== 0 ? availableDates[0] : 0);
  const [selectedDate, setSelectedDate] = useState(selectedDateObjProp ? selectedDateObjProp.getDate() : 0);

  const [dates, setDates] = useState(getDatesOfMonth(year, month))

  const onClickDate = (date) => {
    setSelectedDate(date);
  }



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
    let tempYear = 2022
    if (['11월', '12월'].includes(month)) {
      setYear(2022)
      tempYear = 2022
    } else {
      setYear(2023)
      tempYear = 2023
    }
    setDates(getDatesOfMonth(tempYear, month.slice(0, - 1)))

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
          title={`${year}년 ${month}`}
          menuItems={['12월', '1월', '2월', '3월', '4월', '5월', '6월']}
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

              // date === 0 -> 없는 날짜
              if (date === 0) return <DateBox key={`${weekIndex}${dateIndex}`}></DateBox>
              else {
                if ((year <= new Date().getFullYear() ? +month.slice(0, -1) >= (new Date().getMonth() + 1) : true) && date === selectedDate) {
                  return <SelectedDateBox key={`${weekIndex}${dateIndex}`}>{date}</SelectedDateBox>
                } else if (
                  (year < new Date().getFullYear()) ||
                  (year === new Date().getFullYear() && +month.slice(0, -1) < (new Date().getMonth() + 1)) ||
                  (year === new Date().getFullYear() && (+month.slice(0, -1) == (new Date().getMonth() + 1) && date < new Date().getDate()))) {
                  return <DisableDateBox key={`${weekIndex}${dateIndex}`}>{date}</DisableDateBox>
                } else if (availableDates.includes(date)) {
                  return <AvailableDateBox onClick={() => { onClickDate(date) }} key={`${weekIndex}${dateIndex}`}>{date}</AvailableDateBox>
                } else {
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
