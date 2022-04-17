import { useEffect, useState } from "react";
import { styled, ToggleButton, ToggleButtonGroup } from "@mui/material";

import { Card } from "util/Card"
import SimpleMenu from "util/SimpleMenu"

import {
  VerticalCenterAlignFlex,
  VerticalFlex,
  colorCareerDiveBlue,
  colorTextLight,
  Flex,
  colorBackgroundGrayLight
} from "util/styledComponent";

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

const CalendarWrapper = styled(Flex)`
  width: 100%;
  // margin-top: 30px;
  transition: all 0.3s ease-out;
`

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
  cursor: pointer;
`;

const CalendarContentWrapper = styled(VerticalFlex)`
  justify-content: start;
`;

const TimeSelectWrapper = styled(VerticalFlex)`
  // margin-top: 16px;
  transition: height 0.3s ease;
  height: ${props => props.is_show === 'true' ? props.height + 'px' : '0px'};
  overflow: hidden;
  // overflow: ${props => props.is_show === 'true' ? '' : 'hidden'};
  // height: ${props => props.is_show === 'true' ? '200px' : '100px'};
`;

const AvailableTimeWrapper = styled(Flex)`
  flex-wrap: wrap;
  font-size: 14px;
  font-weight: 400;
`;

const DateTitle = styled('span')`
  font-weight: 700;
  margin-top: 16px;
`;

const AvailableTime = styled(VerticalCenterAlignFlex)`
  width: 50%;
  height: 24px;
  margin-top: 16px;
`;

const YearMonthMenuWrapper = styled(VerticalCenterAlignFlex)`
 justify-content: center;
 margin: 16px 0;
 height: 24px;
`

const YearMonthMenu = styled(SimpleMenu)`
`;

const TimeButton = styled(ToggleButton)`
 justify-content: center;
 width: 76px;
 min-width: 76px;
 margin-top: 16px;
 margin-right: 16px;
 height: 44px;
 background-color: ${colorBackgroundGrayLight};
 color: ${colorTextLight};
 border: solid 1px ${colorBackgroundGrayLight};
 border-radius: 8px !important;

 &.Mui-selected {
  color: ${colorCareerDiveBlue};
  border: 1px ${colorCareerDiveBlue} solid !important;
  background-color: rgba(105, 140, 255, 0.2);
 }
 &.Mui-selected:hover {
  color: ${colorCareerDiveBlue};
  border: 1px ${colorCareerDiveBlue} solid !important;
  background-color: rgba(105, 140, 255, 0.3);
 }

`

const TimeButtonWrapper = styled(ToggleButtonGroup)`
  display: flex;
  flex-wrap: wrap;
  margin-right: -16px;
`
function SelectionConsultingHourAndMin({ title, timeArray, consultingHourAndMin, onClickConsultingHourAndMin }) {
  let isAM = false
  if (title === '오전') {
    isAM = true
  }
  if (timeArray.length == 0) {
    return <div></div>
  } else {

    return (
      <VerticalFlex>
        <DateTitle>
          {title}
        </DateTitle>
        <TimeButtonWrapper
          value={consultingHourAndMin}
          exclusive
          onChange={onClickConsultingHourAndMin}
          aria-label="text alignment"
        >
          {
            timeArray.map((time, index) => {
              return <TimeButton value={time} aria-label={`${time}min`} key={index}>
                {time}
              </TimeButton>
            })
          }
        </TimeButtonWrapper>
      </VerticalFlex>
    )
  }

}

function Calendar() {
  const year = 2022;
  const [month, setMonth] = useState(`${new Date().getMonth()}월`);
  const originData = [{ date: 9, availableTime: [['09:00', '09:30']] },
  { date: 10, availableTime: [['09:00', '09:30'], ['12:00', '13:00'], ['13:30', '14:30']] },
  { date: 11, availableTime: [['09:00', '09:30'], ['17:00', '19:00']] },
  { date: 16, availableTime: [['09:00', '09:30'], ['12:00', '13:00'], ['17:00', '19:00'], ['21:00', '22:00']] },
  { date: 17, availableTime: [['09:00', '09:30']] },
  { date: 18, availableTime: [['09:00', '09:30']] },
  ]
  const dayInKorean = ['일', '월', '화', '수', '목', '금', '토'];
  const availableDates = [9, 10, 11, 16, 17, 18];
  // const [selectedDate, setSelectedDate] = useState(availableDates.length !== 0 ? availableDates[0] : 0);
  const [selectedDate, setSelectedDate] = useState(0);
  const [availableTime, setAvailableTime] = useState([]);

  const [availableAMTime, setAvailableAMTime] = useState([]);
  const [availablePMTime, setAvailablePMTime] = useState([]);

  const [amLines, setAMLines] = useState(1)
  const [pmLines, setPMLines] = useState(1)

  const getTimeSelectWrapperHeight = (amLines, pmLines) => {
    // margin-top
    // line-height
    // amLines height
    // gap margin
    // line-height
    // pmLines height
    if (amLines === 0 && pmLines === 0) {
      return 0
    } else if (amLines !== 0 && pmLines === 0) {
      return 16 + 24 + (44 + 16) * amLines
    } else if (amLines === 0 && pmLines !== 0) {
      return 16 + 24 + (44 + 16) * pmLines
    } else {
      return 16 + 24 + (44 + 16) * amLines + 16 + 24 + (44 + 16) * pmLines
    }
  }

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

    setConsultingTime(0);
    setConsultingHourAndMin(0);
    setAvailableAMTime([])
    setAvailablePMTime([])
  }

  const [dates, setDates] = useState(getDatesOfMonth(year, month))
  const [consultingTime, setConsultingTime] = useState(0);
  const [consultingHourAndMin, setConsultingHourAndMin] = useState(0);

  const onClickConsultingTime = (event, newConsultingTime) => {
    if (newConsultingTime === null) {
      setConsultingTime(0);
      return
    }
    setConsultingTime(newConsultingTime);
    setConsultingHourAndMin(0);

    let tempAvailableTime = []
    originData.forEach((element) => {
      if (element.date === selectedDate) {
        for (const time of element.availableTime) {
          let termCount = 0
          while (new Date(`2021/01/01 ${time[1]}`) - new Date(`2021/01/01 ${time[0]}`) > (newConsultingTime * 60 * 1000 + 10) * (termCount + 1)) {
            const addingTime = Number(time[0].slice(3)) + termCount * 30
            let addedHour = Number(time[0].slice(0, 2)) + parseInt(addingTime / 60)
            let addedMin
            if (addingTime % 60 == 30) {
              addedMin = '30'
            } else if (addingTime % 60 == 0) {
              addedMin = '00'
            }
            addedHour = `${addedHour}`.padStart(2, '0')

            const addedTime = addedHour + ':' + addedMin
            tempAvailableTime.push(addedTime)
            termCount += 1
          }
        }
      }
    })
    setAvailableTime(tempAvailableTime)

    let tempAvailableAMTime = []
    let tempAvailablePMTime = []
    tempAvailableTime.forEach((element) => {
      if (Number(element.slice(0, 2)) < 12) {
        tempAvailableAMTime.push(element)
      } else {
        tempAvailablePMTime.push(element)
      }
    })
    setAvailableAMTime(tempAvailableAMTime)
    setAvailablePMTime(tempAvailablePMTime)
    // window.innerWidth / 2 : 6 grid
    // - 48 : card padding
    // - 60 : page padding
    let cardWidth = 0
    if (window.innerWidth > 1194) {
      cardWidth = (1194 / 2) - 48 - 60
    } else {
      cardWidth = (window.innerWidth / 2) - 48 - 60
    }

    if (tempAvailableAMTime.length === 0) {
      setAMLines(0)
    }
    else {
      setAMLines(1 + parseInt((tempAvailableAMTime.length * 76) / cardWidth))
    }

    if (tempAvailablePMTime.length === 0) {
      setPMLines(0)
    }
    else {
      setPMLines(1 + parseInt((tempAvailablePMTime.length * 76) / cardWidth))
    }
  };

  const onClickConsultingHourAndMin = (event, consultingHourAndMin) => {
    setConsultingHourAndMin(consultingHourAndMin)
  }

  useEffect(() => {
    if (month.length !== 0) {
      setDates(getDatesOfMonth(year, month.slice(0, month.length - 1)))
      setSelectedDate(0)
    }
  }, [month])


  return (
    <CalendarWrapper>
      <Card title={'상담 가능 일정'} min_width={'400px'}>
        <CalendarContentWrapper>
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


          <TimeSelectWrapper
            is_show={(selectedDate != 0).toString()}
            height={100}
          >
            <DateTitle>
              상담 시간
            </DateTitle>
            <TimeButtonWrapper
              value={consultingTime}
              exclusive
              onChange={onClickConsultingTime}
              aria-label="text alignment"
            >
              <TimeButton value={20} aria-label="20min">
                20분
              </TimeButton>
              <TimeButton value={40} aria-label="40min">
                40분
              </TimeButton>
            </TimeButtonWrapper>


          </TimeSelectWrapper>

          <TimeSelectWrapper
            is_show={(consultingTime != 0).toString()}
            height={getTimeSelectWrapperHeight(amLines, pmLines)}
          >
            <SelectionConsultingHourAndMin
              title={'오전'}
              consultingHourAndMin={consultingHourAndMin}
              onClickConsultingHourAndMin={onClickConsultingHourAndMin}
              timeArray={availableAMTime}
            />

            <SelectionConsultingHourAndMin
              title={'오후'}
              consultingHourAndMin={consultingHourAndMin}
              onClickConsultingHourAndMin={onClickConsultingHourAndMin}
              timeArray={availablePMTime}
            />
          </TimeSelectWrapper>

          {/* <AvailableTimeWrapper>
              {availableTime.map((timeRange, index) =>
                <AvailableTime key={index}>{timeRange[0]} ~ {timeRange[1]} · {getDifferenceMinutes(timeRange[0], timeRange[1])}분</AvailableTime>)}
            </AvailableTimeWrapper> */}
        </CalendarContentWrapper>
      </Card >
    </CalendarWrapper>

  );
}

export default Calendar;
