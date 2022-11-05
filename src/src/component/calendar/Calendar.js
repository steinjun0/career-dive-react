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
  TextSubtitle1,
  colorBackgroundCareerDiveBlue
} from "util/styledComponent";

import { CustomButton } from "util/Custom/CustomButton";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CustomToggleButtonGroup } from "util/Custom/CustomToggleButtonGroup";
import { addMinute, getAMOrPM, getKoreanTimeString, isMentorUrl, removeReservation, updateReservation, usePrevious } from "util/util";
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
  background-color: ${colorBackgroundCareerDiveBlue};
 }
 &.Mui-selected:hover {
  color: ${colorCareerDiveBlue};
  border: 1px ${colorCareerDiveBlue} solid !important;
  background-color: ${colorBackgroundCareerDiveBlue};
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
          valueArray={timeArray.map((e) => e.time)}
          isExclusive={true}
          onChange={(e, v) => {
            onClickconsultingStartTime(e, v)
          }}
          aria-label="text alignment"
        />
      </VerticalFlex>
    )
  }

}

function Calendar({ setIsFinishSet }) {
  const navigater = useNavigate();
  const params = useParams();
  const location = useLocation();
  const [isApplyPage, setIsApplyPage] = useState(false);

  const [originData, setOriginData] = useState([])

  const [availableDates, setAvailableDates] = useState([]);


  const year = 2022;
  const [month, setMonth] = useState('0월');

  const [selectedDate, setSelectedDate] = useState(0);


  const [availableAMTimes, setAvailableAMTimes] = useState([]);
  const [availablePMTimes, setAvailablePMTimes] = useState([]);

  const [amLines, setAmLines] = useState(0)
  const [pmLines, setPmLines] = useState(0)

  const [consultingTime, setConsultingTime] = useState(-1);
  const [consultingStartTime, setConsultingStartTime] = useState(0);
  const [consultingStartDate, setConsultingStartDate] = useState();
  const [consultingEndDate, setConsultingEndDate] = useState();
  const [scheduleId, setScheduleId] = useState();

  const reservation = getDataFromLocalStorage();
  let initialDate
  if (reservation) {
    if (reservation['consultingDate'] && reservation['consultingStartTime']) {
      initialDate = new Date(`${reservation['consultingDate'].year}-${reservation['consultingDate'].month}-${reservation['consultingDate'].date} ${reservation['consultingStartTime']}`)
      if (isNaN(initialDate)) {
        removeReservation(params.id)
      }
    } else {
      removeReservation(params.id)
    }
  }

  const [selectedDateObj, setSelectedDateObj] = useState();


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
    setAvailableAMTimes([])
    setAvailablePMTimes([])
  }

  const updateAvailableTimes = (consultingTime, consultingDate, dayTimes) => {

    function getAvailableTimes(consultingTime) {
      let tempAvailableTimes = []
      dayTimes.forEach((element) => {
        if (element.Day === consultingDate.getDate()) {
          // 시작 시간 순서대로 정렬
          element.StartEnds.sort((a, b) => +a.StartTime.slice(0, 2) - +b.StartTime.slice(0, 2))
          for (const schedule of element.StartEnds) {
            let termCount = 0

            const now = new Date()
            const startDate = new Date(`${consultingDate.getFullYear()}/${consultingDate.getMonth() + 1}/${consultingDate.getDate()} ${schedule.StartTime}`);
            const endDate = new Date(`${consultingDate.getFullYear()}/${consultingDate.getMonth() + 1}/${consultingDate.getDate()} ${schedule.EndTime}`);


            while (endDate > addMinute(startDate, termCount * 30 + consultingTime)) {
              const caculatedTime = addMinute(startDate, termCount * 30);
              if (caculatedTime.getTime() - now.getTime() < 0) {
                termCount += 1
                continue
              }
              const tempAvailableTime = `${caculatedTime.getHours()}`.padStart(2, '0') +
                ":" +
                `${caculatedTime.getMinutes()}`.padStart(2, '0')
              tempAvailableTimes.push({ time: tempAvailableTime, scheduleId: schedule.ScheduleID })
              termCount += 1
            }
          }
        }
      })
      return tempAvailableTimes
    }

    const availableTimes = getAvailableTimes(consultingTime)

    let tempavailableAMTimes = []
    let tempavailablePMTimes = []
    availableTimes.forEach((element) => {
      if (Number(element.time.slice(0, 2)) < 12) {
        tempavailableAMTimes.push(element)
      } else {
        tempavailablePMTimes.push(element)
      }
    })

    setAvailableAMTimes(tempavailableAMTimes)
    setAvailablePMTimes(tempavailablePMTimes)
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

    if (tempavailableAMTimes.length === 0) {
      setAmLines(0)
    }
    else {
      // cardwidth로 나누는건 반응형 도입 이후
      setAmLines(Math.ceil((tempavailableAMTimes.length) / 5))
    }

    if (tempavailablePMTimes.length === 0) {
      setPmLines(0)
    }
    else {
      setPmLines(Math.ceil((tempavailablePMTimes.length) / 5))
    }

  }

  const onClickConsultingTime = (event, newConsultingTime) => {
    if (newConsultingTime === null) {
      setConsultingTime(0);
      return
    }
    setConsultingTime(newConsultingTime);
    // setConsultingStartTime(0);
    updateAvailableTimes(newConsultingTime, new Date(year, month.slice(0, -1) - 1, selectedDate), originData.DayTimes)
    setIsFinishSet && setIsFinishSet(false)

  };

  const onClickconsultingStartTime = (event, consultingStartTime, isPm) => {
    setConsultingStartTime(consultingStartTime)
    let schedulIdTemp = -1;
    Array(...availableAMTimes, ...availablePMTimes).map((e) => {
      if (e.time === consultingStartTime) {
        setScheduleId(e.scheduleId)
        schedulIdTemp = e.scheduleId
      }
    })
    if (consultingStartTime !== 0 && consultingStartTime !== null) {
      const updatingData = [
        { name: 'consultingDate', data: { year, month: Number(month.slice(0, -1)), date: selectedDate } },
        { name: 'consultingTime', data: consultingTime },
        { name: 'consultingStartTime', data: consultingStartTime },
        { name: 'scheduleId', data: schedulIdTemp },
      ]
      setIsFinishSet && setIsFinishSet(true)
      updateReservation(params.id, updatingData)

    } else {
      setIsFinishSet && setIsFinishSet(false)
    }
  }


  // 상담시간 변경시 시작시간 초기화
  const prevConsultingTime = usePrevious(consultingTime);
  useEffect(() => {
    if (prevConsultingTime !== -1) {
      setConsultingStartTime(0)
    }
  }, [consultingTime])

  function getDataFromLocalStorage() {
    const reservations = JSON.parse(localStorage.getItem(`reservations`))
    if (reservations !== null) {
      const reservation = reservations[params.id]
      if (reservation !== undefined) {
        return reservation
      }
    }
    return false
  }

  const setDataFromLocalStorage = (originData) => {
    const reservation = getDataFromLocalStorage();
    if (reservation) {
      let initialDate = new Date(`${reservation['consultingDate'].year}-${reservation['consultingDate'].month}-${reservation['consultingDate'].date} ${reservation['consultingStartTime']}`)
      if (initialDate - new Date() <= 0) {
        // 과거 날짜가 localStorage에 저장되어 있을 때
        removeReservation(params.id)
        return
      } else {
        if ('consultingDate' in reservation) {
          setMonth(reservation['consultingDate'].month + '월')
          setSelectedDate(reservation['consultingDate'].date)
          setSelectedDateObj(new Date(`${reservation['consultingDate'].year}-${reservation['consultingDate'].month}-${reservation['consultingDate'].date} ${reservation['consultingStartTime']}`))
        } else {
          setMonth((new Date().getMonth() + 1) + '월')
        }
        if ('consultingTime' in reservation) {
          setConsultingTime(reservation['consultingTime'])
        }
        if ('consultingTime' in reservation && 'consultingDate' in reservation) {
          updateAvailableTimes(reservation['consultingTime'], new Date(reservation['consultingDate'].year, reservation['consultingDate'].month - 1, reservation['consultingDate'].date), originData.DayTimes)
        }
        if ('consultingStartTime' in reservation) {
          setConsultingStartTime(reservation['consultingStartTime'])
        }
        if ('scheduleId' in reservation) {
          setScheduleId(reservation['scheduleId'])
          setIsFinishSet && setIsFinishSet(true)
        }
      }
    } else {
      setMonth((new Date().getMonth() + 1) + '월')
      const today = new Date().getDate()
      if (originData.DayTimes !== null) {
        for (let i = 0; i < originData.DayTimes.length; i++) {
          if (originData.DayTimes[i].Day >= today) {
            setSelectedDate(originData.DayTimes[i].Day)
            setSelectedDateObj(new Date(`${originData['Year']}-${originData['Month']}-${originData.DayTimes[i].Day}`))
            break
          }
        }
      }


    }
  }

  useEffect(async () => {
    const res = await API.getConsultSchedule(
      year,
      new Date().getMonth() + 1,
      params.id)
    setOriginData(res.data)
    if (res.data.DayTimes !== null) {
      setAvailableDates(res.data.DayTimes.map((e) => e.Day))
    }

    setIsApplyPage(location.pathname.includes('request'))
    setDataFromLocalStorage(res.data)
  }, [])

  const onMonthChange = async (month) => {
    const res = await API.getConsultSchedule(
      year,
      month.slice(0, month.length - 1),
      params.id)
    if (res.status === 200) {
      if (res.data.DayTimes === null) {
        setOriginData([])
        setAvailableDates([])
      } else {
        setOriginData(res.data)
        setAvailableDates(res.data.DayTimes.map((e) => e.Day))
      }

      setSelectedDate(null);
      setConsultingTime(0);
      setConsultingStartTime(0);
      setAvailableAMTimes([])
      setAvailablePMTimes([])
    }
  }



  useEffect(() => {
    if (consultingStartTime === null) {

      const updatingData = [
        { name: 'consultingDate', data: undefined },
        { name: 'consultingTime', data: undefined },
        { name: 'consultingStartTime', data: undefined },
        { name: 'scheduleId', data: undefined }
      ]

      updateReservation(params.id, updatingData)


    }
    if (consultingStartTime !== 0) {
      try {
        setConsultingStartDate(new Date(`${year}-${month.slice(0, -1)}-${selectedDate} ${consultingStartTime}`))
        setConsultingEndDate(addMinute(new Date(`${year}-${month.slice(0, -1)}-${selectedDate} ${consultingStartTime}`), consultingTime))
      } catch (e) { console.log('consultingStartTime useEffect', e) }
    }



  }, [consultingStartTime])

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
          {<TimeSelectWrapper
            is_show={(consultingStartTime != null && selectedDate != 0).toString()}
            height={consultingStartTime == 0 ? 0 : 76}
          >
            <DateTitle>
              상담 진행 시간
            </DateTitle>
            <EmptyHeight height='16px' />
            {consultingStartDate && consultingEndDate && <TextSubtitle1 color={colorCareerDiveBlue}>
              {getKoreanTimeString(consultingStartDate)} ~ {getKoreanTimeString(consultingEndDate)}
            </TextSubtitle1>}
          </TimeSelectWrapper>}

          <TimeSelectWrapper
            is_show={(consultingTime != 0).toString()}
            height={getTimeSelectWrapperHeight(amLines, pmLines, isApplyPage)}
          >
            <SelectionConsultingStartTime
              title={'오전'}
              consultingStartTime={consultingStartTime}
              onClickconsultingStartTime={(event, consultingStartTime) => { onClickconsultingStartTime(event, consultingStartTime, false) }}
              timeArray={availableAMTimes}
            />

            <SelectionConsultingStartTime
              title={'오후'}
              consultingStartTime={consultingStartTime}
              onClickconsultingStartTime={(event, consultingStartTime) => { onClickconsultingStartTime(event, consultingStartTime, true) }}
              timeArray={availablePMTimes}
            />
            <EmptyHeight height='28px'></EmptyHeight>
            <CustomButton
              height='48px'
              onClick={() => {

                navigater(`/mentee/request/${params.id}`)
              }}>
              <TextSubtitle1>
                신청
              </TextSubtitle1>
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
