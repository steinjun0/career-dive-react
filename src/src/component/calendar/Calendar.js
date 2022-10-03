import { useEffect, useState } from "react";
import { styled, ToggleButton, ToggleButtonGroup } from "@mui/material";

import { Card } from "util/Card"

import {
  VerticalFlex,
  colorCareerDiveBlue,
  colorTextLight,
  Flex,
  colorBackgroundGrayLight,
  EmptyHeight,
  TextSubtitle1
} from "util/styledComponent";

import { CustomButton } from "util/Custom/CustomButton";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CustomToggleButtonGroup } from "util/Custom/CustomToggleButtonGroup";
import { addMinute, checkUrlInclude, isMentorUrl, updateReservation, usePrevious } from "util/util";
import CalendarUpper from "component/calendar/CalendarUpper";
import API from 'API';


const CalendarWrapper = styled(Flex)`
  width: 100%;
  // margin-top: 30px;
  transition: all 0.3s ease-out;
`

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

const DateTitle = styled('span')`
  font-weight: 700;
  margin-top: 16px;
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

function SelectionConsultingStartTime({ title, timeArray, consultingStartTime, onClickconsultingStartTime }) {
  if (timeArray.length == 0) {
    return <div></div>
  } else {

    return (
      <VerticalFlex>
        <DateTitle>
          {title}
        </DateTitle>
        <CustomToggleButtonGroup
          value={consultingStartTime}
          valueArray={timeArray}
          isExclusive={true}
          onChange={onClickconsultingStartTime}
          aria-label="text alignment"
        />
      </VerticalFlex>
    )
  }

}

// const originData = [{ date: 9, availableTime: [['09:00', '10:30']] },
// { date: 10, availableTime: [['09:00', '09:30'], ['12:00', '13:00'], ['13:30', '14:30']] },
// { date: 11, availableTime: [['09:00', '09:30'], ['17:00', '19:00']] },
// { date: 16, availableTime: [['09:00', '09:30'], ['12:00', '13:00'], ['17:00', '19:00'], ['21:00', '22:00']] },
// { date: 17, availableTime: [['09:00', '09:30']] },
// { date: 18, availableTime: [['09:00', '09:30']] },
// ]

// const availableDates = [9, 10, 11, 16, 17, 18];


function Calendar({ setIsFinishSet }) {
  const navigater = useNavigate();
  const params = useParams();
  const location = useLocation();
  const [isApplyPage, setIsApplyPage] = useState(false);

  // const [originData, setOriginData] = useState([{ date: 9, availableTime: [['09:00', '10:30']] },
  // { date: 10, availableTime: [['09:00', '09:30'], ['12:00', '13:00'], ['13:30', '14:30']] },
  // { date: 11, availableTime: [['09:00', '09:30'], ['17:00', '19:00']] },
  // { date: 16, availableTime: [['09:00', '09:30'], ['12:00', '13:00'], ['17:00', '19:00'], ['21:00', '22:00']] },
  // { date: 17, availableTime: [['09:00', '09:30']] },
  // { date: 18, availableTime: [['09:00', '09:30']] },
  // ])
  const [originData, setOriginData] = useState([])

  const [availableDates, setAvailableDates] = useState([]);


  const year = 2022;
  const [month, setMonth] = useState('0월');

  const [selectedDate, setSelectedDate] = useState(0);

  const [availableAMTime, setAvailableAMTime] = useState([]);
  const [availablePMTime, setAvailablePMTime] = useState([]);

  const [amLines, setAmLines] = useState(0)
  const [pmLines, setPmLines] = useState(0)

  const [consultingTime, setConsultingTime] = useState(-1);
  const [consultingStartTime, setConsultingStartTime] = useState(0);

  const [selectedDateObj, setSelectedDateObj] = useState(new Date());

  const getTimeSelectWrapperHeight = (amLines, pmLines, isHidingButton) => {
    // margin-top
    // line-height
    // amLines height
    // gap margin
    // line-height
    // pmLines height

    let buttonHeight = 0
    if (consultingStartTime !== 0 && !isHidingButton) {
      buttonHeight = 80
    }

    if (amLines === 0 && pmLines === 0) {
      return 0
    } else if (amLines !== 0 && pmLines === 0) {

      return 16 + 24 + (44 + 16) * amLines + buttonHeight
    } else if (amLines === 0 && pmLines !== 0) {
      return 16 + 24 + (44 + 16) * pmLines + buttonHeight
    } else if (amLines !== 0 && pmLines !== 0) {
      return 16 + 24 + (44 + 16) * amLines + 16 + 24 + (44 + 16) * pmLines + buttonHeight
    }
    return buttonHeight
  }


  // 날짜 선택시, 기존값 초기화
  const onClickAvailableDate = (date) => {
    setSelectedDate(date);
    setConsultingTime(0);
    setConsultingStartTime(0);
    setAvailableAMTime([])
    setAvailablePMTime([])
  }

  const updateAvailableTimes = (consultingTime, selectedDate) => {
    let tempAvailableTime = []
    originData.forEach((element) => {
      if (element.date === selectedDate) {
        for (const time of element.availableTime) {
          let termCount = 0
          while (new Date(`2021/01/01 ${time[1]}`) - new Date(`2021/01/01 ${time[0]}`) > (consultingTime * 60 * 1000 + 10) * (termCount + 1)) {
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
      if (cardWidth < 520) cardWidth = 520
    }

    if (tempAvailableAMTime.length === 0) {
      setAmLines(0)
    }
    else {
      // cardwidth로 나누는건 반응형 도입 이후
      setAmLines(1 + parseInt((tempAvailableAMTime.length) / 5))
    }

    if (tempAvailablePMTime.length === 0) {
      setPmLines(0)
    }
    else {
      setPmLines(1 + parseInt((tempAvailablePMTime.length) / 5))
    }
  }

  const onClickConsultingTime = (event, newConsultingTime) => {
    if (newConsultingTime === null) {
      setConsultingTime(0);
      return
    }
    setConsultingTime(newConsultingTime);
    // setConsultingStartTime(0);
    updateAvailableTimes(newConsultingTime, selectedDate)

  };

  const onClickconsultingStartTime = (event, consultingStartTime) => {
    setConsultingStartTime(consultingStartTime)
  }


  // 상담시간 변경시 시작시간 초기화
  const prevConsultingTime = usePrevious(consultingTime);
  useEffect(() => {
    if (prevConsultingTime !== -1) {
      setConsultingStartTime(0)
    }
  }, [consultingTime])

  const setDataFromLocalStorage = () => {
    let prefix = ''
    if (isMentorUrl()) {
      prefix = 'mentor'
    } else {
      prefix = 'mentee'
    }

    const reservations = JSON.parse(localStorage.getItem(`reservations`))
    if (reservations !== null) {
      const reservation = reservations[params.id]
      if (reservation !== undefined) {
        if ('consultingDate' in reservation) {
          setMonth(reservation['consultingDate'].month + '월')
          setSelectedDate(reservation['consultingDate'].date)
        } else {
          setMonth((new Date().getMonth() + 1) + '월')
        }
        if ('consultingTime' in reservation) {
          setConsultingTime(reservation['consultingTime'])
        }
        if ('consultingTime' in reservation && 'consultingDate' in reservation) {
          updateAvailableTimes(reservation['consultingTime'], reservation['consultingDate'].date)
        }
        if ('consultingStartTime' in reservation) {
          setConsultingStartTime(reservation['consultingStartTime'])
        }
      } else {
        setMonth((new Date().getMonth() + 1) + '월')
      }
    } else {
      setMonth((new Date().getMonth() + 1) + '월')
    }

  }

  useEffect(async () => {
    const res = await API.getConsultSchedule(
      year,
      new Date().getMonth() + 1,
      params.id)
    setOriginData(res.data.DayTimes.map((e) => {
      return { date: e.Day, availableTime: e.StartEnds.map((time) => [time.StartTime, time.EndTime]) }
    }))
    setAvailableDates(res.data.DayTimes.map((e) => e.Day))

    setIsApplyPage(location.pathname.includes('reservation'))
    setDataFromLocalStorage()
  }, [])

  const onMonthChange = async (month) => {
    console.log(month)
    const res = await API.getConsultSchedule(
      year,
      month.slice(0, month.length - 1),
      params.id)
    if (res.status === 200) {
      if (res.data.DayTimes === null) {
        setOriginData([])
        setAvailableDates([])
      } else {
        setOriginData(res.data.DayTimes.map((e) => {
          return { date: e.Day, availableTime: e.StartEnds.map((time) => [time.StartTime, time.EndTime]) }
        }))
        setAvailableDates(res.data.DayTimes.map((e) => e.Day))
      }

    }
  }

  useEffect(() => {
    if (consultingStartTime == null) {
      setConsultingStartTime(0);
    }
    if (consultingStartTime !== 0) {
      const updatingData = [
        { name: 'consultingDate', data: { year, month: Number(month.slice(0, -1)), date: selectedDate } },
        { name: 'consultingTime', data: consultingTime },
        { name: 'consultingStartTime', data: consultingStartTime },
      ]
      setIsFinishSet && setIsFinishSet(true)
      updateReservation(params.id, updatingData)

    } else {
      setIsFinishSet && setIsFinishSet(false)
    }
  }, [consultingStartTime])


  useEffect(() => {
    setSelectedDate(selectedDateObj.getDate())
    setMonth((selectedDateObj.getMonth() + 1) + '월')
  }, [selectedDateObj])


  return (
    <CalendarWrapper>
      <Card title={'상담 가능 일정'} min_width={'400px'}>
        <CalendarContentWrapper>

          <CalendarUpper
            availableDates={availableDates}
            selectedDateObjProp={selectedDateObj}
            onClickAvailableDateProps={onClickAvailableDate}
            onDateChange={(dateObject) => {
              setSelectedDateObj(dateObject);
            }}
            onMonthChange={(month) => {
              onMonthChange(month)
            }
            } />


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
            is_show={(selectedDate != 0).toString()}
            height={consultingStartTime == 0 ? 56 : 76}
          >
            <DateTitle>
              상담 시작 시간
            </DateTitle>
            <EmptyHeight height='16px' />
            <TextSubtitle1 color={colorCareerDiveBlue}>
              {
                consultingStartTime === 0 ? '' : `${consultingStartTime} ~ ${addMinute(consultingStartTime, consultingTime)}`
              }


            </TextSubtitle1>
          </TimeSelectWrapper>

          <TimeSelectWrapper
            is_show={(consultingTime != 0).toString()}
            height={getTimeSelectWrapperHeight(amLines, pmLines, isApplyPage)}
          >
            <SelectionConsultingStartTime
              title={'오전'}
              consultingStartTime={consultingStartTime}
              onClickconsultingStartTime={onClickconsultingStartTime}
              timeArray={availableAMTime}
            />

            <SelectionConsultingStartTime
              title={'오후'}
              consultingStartTime={consultingStartTime}
              onClickconsultingStartTime={onClickconsultingStartTime}
              timeArray={availablePMTime}
            />
            <EmptyHeight height='28px'></EmptyHeight>
            <CustomButton
              height='52px'
              onClick={() => {
                const updatingData = [
                  { name: 'consultingDate', data: { year, month: Number(month.slice(0, -1)), date: selectedDate } },
                  { name: 'consultingTime', data: consultingTime },
                  { name: 'consultingStartTime', data: consultingStartTime },
                ]
                updateReservation(params.id, updatingData)
                navigater(`/mentee/request/${params.id}`)
              }}>
              신청
            </CustomButton>
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
