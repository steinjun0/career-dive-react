import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { colorBackgroundCareerDiveBlue, colorBackgroundGrayLight, colorBackgroundGrayMedium, colorCareerDiveBlue, colorTextDisabled, colorTextLight, EmptyHeight, Flex, TextBody2, TextSubtitle1, TextSubtitle2, VerticalFlex } from "util/styledComponent";
import Card from "../../util/ts/Card";
import { getDatesOfMonth, isPastDate, monthList } from "./Calendar.service";
import API from "API";
import styled from "styled-components";
import { Button, Divider, IconButton, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { addMinute, getHoursAndMinuteString, getKoreanTimeString } from "util/ts/util";
import { addMinuteTs } from "util/util";
import { CustomButton } from "util/Custom/CustomButton";
import { useNavigate, useParams } from "react-router-dom";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CircleIcon from '@mui/icons-material/Circle';

const calendarAnimationStyle = {
    overflow: 'hidden',
    transitionDelay: '0.2s',
    transition: 'all 0.2s ease'
}

const TimeButtonWrapper = styled(ToggleButtonGroup)`
  display: flex;
  flex-wrap: wrap;
  margin-right: -16px;
`
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

function getSplitTimes(startTime: Date, endTime: Date): Date[] {
    const result = [startTime]
    const gapMin = (endTime.getTime() - startTime.getTime()) / 1000 / 60
    for (let addMin = 30; addMin < gapMin; addMin += 30) {
        result.push(addMinute(startTime, addMin))
    }
    return result
}

// 1. props가 있다면 순서대로 누르는 것과 동일하게 진행한다.
// 2. api를 통해서 해당 날짜의 일정을 받아와야한다.
// 3. 만약 해당 날짜의 일정에 props로 받은 일정과 같은게 있다면 선택, 아니면 미선택

const MenteeCalendar = (props:
    { userId: number, startDate: Date | null, consultingTime: 20 | 40 | null, setIsFinished?: Dispatch<SetStateAction<boolean>> }) => {
    // Setting
    // 1. 모든 날짜 데이터는 Date 객체로 관리됨
    // 2. 오늘 날짜는 new Date() 객체를 매번 생성해서 받아온다.

    const [calendarDates, setCalendarDates] = useState<Array<Date | null>>()
    const [currentYearAndMonth, setCurrentYearAndMonth] = useState<Date>(new Date(new Date().setDate(1)))
    const [selectedDate, setSelectedDate] = useState<Date | null>(props.startDate)
    const [availableDates, setAvailableDates] = useState<Date[] | null>(null)
    interface IavailableTime {
        [key: number]: { startTime: Date, endTime: Date, ruleType: string, ruleId: number, scheduleId: number }[]
    }
    const [availableTimes, setAvailableTimes] = useState<IavailableTime>({}) // available의 date를 key값으로 정보를 가진 object
    interface IstartTimeObj { 20: { AM: Date[], PM: Date[] }, 40: { AM: Date[], PM: Date[] } }
    const [startTimesObj, setStartTimesObj] = useState<IstartTimeObj | null>(null)
    const koDtf = Intl.DateTimeFormat("ko", { year: 'numeric', month: 'narrow' })

    const [calendarState, setCalendarState] = useState<'view' | 'setting consultingTime' | 'setting startTime' | 'finish set' | 'initializing'>('view')
    const [consultingTime, setConsultingTime] = useState<20 | 40 | null>(props.consultingTime)
    const [startTime, setStartTime] = useState<Date | null>(props.startDate)
    const timeSelectRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()
    const params = useParams();

    function addCurrentYearAndMonth(month: number) {
        setCurrentYearAndMonth(new Date(currentYearAndMonth.setMonth(currentYearAndMonth.getMonth() + month)))
    }

    // availableDate,Times 설정
    useEffect(() => {
        // 월별 날짜 표기
        const temp = getDatesOfMonth(currentYearAndMonth)
        const startDay = temp[0].getDay()
        const endDay = temp[temp.length - 1].getDay()
        setCalendarDates([...Array(startDay).fill(null), ...temp, ...Array(6 - endDay).fill(null)])

        // 선택 가능 날짜 데이터 받아오고, state 설정하기
        setAvailableDates([])
        setAvailableTimes([])

        interface IDayTime {
            Day: number,
            StartEnds: { StartTime: string, EndTime: string, RuleType: string, RuleID: number, ScheduleID: number }[]
        }

        function updateAvailableTimes(year: number, month: number, dayTimes: IDayTime[]) {
            const tempTimes: IavailableTime = {}
            for (let i = 0; i < dayTimes.length; i++) {
                const dayTime = dayTimes[i]
                if (!isPastDate(new Date(year, month - 1, dayTime.Day))) {
                    setAvailableDates(old => old === null ? [new Date(year, month - 1, dayTime.Day)] : [...old, new Date(year, month - 1, dayTime.Day)])
                    for (let j = 0; j < dayTime.StartEnds.length; j++) {
                        const startEnd = dayTime.StartEnds[j]
                        if (tempTimes[dayTime.Day] === undefined)
                            tempTimes[dayTime.Day] = []
                        tempTimes[dayTime.Day].push({
                            startTime: new Date(year, month - 1, dayTime.Day, +startEnd.StartTime.slice(0, 2), +startEnd.StartTime.slice(3, 5)),
                            endTime: new Date(year, month - 1, dayTime.Day, +startEnd.EndTime.slice(0, 2), +startEnd.EndTime.slice(3, 5)),
                            ruleType: startEnd.RuleType,
                            ruleId: startEnd.RuleID,
                            scheduleId: startEnd.ScheduleID
                        })
                    }
                }
            }
            setAvailableTimes(tempTimes)
        }

        API.getConsultSchedule(currentYearAndMonth.getFullYear(), currentYearAndMonth.getMonth() + 1, props.userId)
            .then((res) => {
                if (res.status === 200) {
                    updateAvailableTimes(res.data.Year, res.data.Month, res.data.DayTimes)
                }
            })
    }, [currentYearAndMonth])

    // 선택 가능 시간 갱신될 때, 값이 있다면 첫 번째 값으로 날짜 자동 선택
    // (availableDates로 하면 뒤 연산에서 availableTimes가 nullable)
    useEffect(() => {
        if (availableDates && availableDates[0]) {
            setSelectedDate(availableDates[0])
        } else {
            setSelectedDate(null)
        }
    }, [availableTimes])

    // 날짜 선택
    useEffect(() => {
        setConsultingTime(null)
        setStartTime(null)
        if (selectedDate !== null) {
            const temp: IstartTimeObj = { 20: { AM: [], PM: [] }, 40: { AM: [], PM: [] } }

            const schedules = availableTimes[selectedDate.getDate()]
            if (schedules) {
                const splitTimes = schedules.map(schedule => {
                    return getSplitTimes(schedule.startTime, schedule.endTime)
                        .map(date => {
                            return date
                        })
                })
                splitTimes.forEach(times => {
                    const timesAm = times.filter(time => time.getHours() < 12)
                    const timesPm = times.filter(time => time.getHours() >= 12)
                    temp['20']['AM'] = [...timesAm]
                    temp['40']['AM'] = [...timesAm.slice(0, timesAm.length - 1)]
                    temp['20']['PM'] = [...timesPm]
                    temp['40']['PM'] = [...timesPm.slice(0, timesPm.length - 1)]
                })
            }
            setStartTimesObj(temp)
        }
    }, [selectedDate])


    useEffect(() => {
        setStartTime(null)
    }, [consultingTime])

    useEffect(() => {
        if (selectedDate === null) {
            setCalendarState('view')
            props.setIsFinished && props.setIsFinished(false)
        } else if (consultingTime === null) {
            setCalendarState('setting consultingTime')
            // props.setIsFinished && props.setIsFinished(false)
        } else if (startTime === null) {
            setCalendarState('setting startTime')
            props.setIsFinished && props.setIsFinished(false)
        } else {
            setCalendarState('finish set')
            props.setIsFinished && props.setIsFinished(true)
        }
    }, [selectedDate, consultingTime, startTime])


    return (
        <Card
            title='상담 가능 일정'
            no_divider={false}
            style={{ boxSizing: 'border-box' }}
        >
            <Flex style={{ justifyContent: 'center' }}>
                <Flex style={{
                    justifyContent: 'space-between', alignItems: 'center',
                    marginTop: '16px', width: '100%'
                }}>
                    {/* <SimpleSelect<Date>
                        items={monthList}
                        texts={monthTextList}
                        onChange={(date: string) => { setCurrentYearAndMonth(new Date(date)) }}
                    /> */}
                    <IconButton
                        sx={{
                            backgroundColor: colorBackgroundGrayLight,
                            borderRadius: '8px',
                            height: '32px',
                            width: '32px'
                        }}
                        disabled={currentYearAndMonth.getMonth() === new Date().getMonth()}
                        onClick={() =>
                            addCurrentYearAndMonth(-1)
                        }
                    >
                        <ChevronLeftIcon sx={{ color: currentYearAndMonth.getMonth() === new Date().getMonth() ? colorTextDisabled : 'black' }} />
                    </IconButton>
                    <TextSubtitle2 style={{
                        backgroundColor: colorBackgroundGrayLight,
                        padding: '4px 12px',
                        borderRadius: '8px',
                    }}>{koDtf.format(currentYearAndMonth)}</TextSubtitle2>
                    <IconButton
                        sx={{
                            backgroundColor: colorBackgroundGrayLight,
                            borderRadius: '8px',
                            height: '32px',
                            width: '32px'
                        }}
                        disabled={currentYearAndMonth.getMonth() >= new Date().getMonth() + 6}
                        onClick={() => addCurrentYearAndMonth(1)}
                    >
                        <ChevronRightIcon sx={{ color: currentYearAndMonth.getMonth() >= new Date().getMonth() + 6 ? colorTextDisabled : 'black' }} />
                    </IconButton>

                </Flex>
            </Flex>
            <Flex style={{ flexWrap: 'wrap', borderBottom: `1px solid ${colorBackgroundGrayMedium}`, paddingBottom: '16px', marginTop: '16px' }}>
                {['일', '월', '화', '수', '목', '금', '토'].map((koDay, i) => {
                    return <Flex style={{ minWidth: '14.286%', justifyContent: 'center', alignItems: 'center', height: '44px', marginBottom: '10px' }} key={i}> <TextSubtitle1>{koDay}</TextSubtitle1> </Flex>
                })}
                {calendarDates && calendarDates.map((date, i) => {
                    const isSelected = (date: Date) => selectedDate && selectedDate.getDate() === date.getDate()
                    const isAvailable = (date: Date) => availableDates ? availableDates.map(e => e.getTime()).includes(date.getTime()) : false
                    return date === null ?
                        <Flex key={i} style={{ minWidth: '14.286%', justifyContent: 'center', marginBottom: '10px' }} />
                        :
                        <Flex key={i} style={{ minWidth: '14.286%', justifyContent: 'center', marginBottom: '10px' }}>
                            <Flex
                                onClick={() => {
                                    if (isAvailable(date))
                                        setSelectedDate(date)
                                }}
                                style={{
                                    backgroundColor: isSelected(date) ? colorBackgroundCareerDiveBlue : 'transparent',
                                    cursor: isAvailable(date) ? 'pointer' : '',
                                    color: isPastDate(date) ? colorTextDisabled : colorTextLight,
                                    width: '27px', height: '54px', borderRadius: 8,
                                    justifyContent: 'center', alignItems: 'center',
                                    flexDirection: 'column'
                                }}>
                                <TextBody2>{date.getDate()}</TextBody2>
                                <CircleIcon sx={{ width: 10, height: 10, color: isAvailable(date) ? colorCareerDiveBlue : 'transparent' }} />
                            </Flex>
                        </Flex>
                })}
            </Flex>

            <VerticalFlex
                style={{
                    height: calendarState !== 'view' ? 84 : 0, ...calendarAnimationStyle,
                    paddingTop: '16px',
                }}
            >
                <TextSubtitle1>상담시간</TextSubtitle1>
                <TimeButtonWrapper
                    value={consultingTime}
                    exclusive
                    onChange={(e, time) => { setConsultingTime(time) }}
                >
                    <TimeButton value={20} aria-label="20min">
                        <TextBody2>20분</TextBody2>
                    </TimeButton>
                    <TimeButton value={40} aria-label="40min">
                        <TextBody2>40분</TextBody2>
                    </TimeButton>
                </TimeButtonWrapper>
            </VerticalFlex>

            <VerticalFlex
                style={{
                    height: ['setting startTime', 'finish set'].includes(calendarState) ? timeSelectRef.current?.scrollHeight! : 0,
                    paddingLeft: '1px', paddingTop: '16px',
                    ...calendarAnimationStyle
                }}
            >
                <VerticalFlex ref={timeSelectRef}>
                    <TextSubtitle1>오전</TextSubtitle1>
                    <TimeButtonWrapper
                        value={startTime ? startTime?.getTime() : null}
                        exclusive
                        onChange={(e, time) => {
                            setStartTime(time ? new Date(time) : null)
                        }}
                    >
                        {startTimesObj && consultingTime &&
                            startTimesObj[consultingTime as keyof IstartTimeObj].AM
                                .map(date => {
                                    return <TimeButton key={date.getTime()} value={date.getTime()}><TextBody2>{getHoursAndMinuteString(date)}</TextBody2></TimeButton>
                                })
                        }
                    </TimeButtonWrapper>
                    <EmptyHeight height="16px" />
                    <TextSubtitle1>오후</TextSubtitle1>
                    <TimeButtonWrapper
                        value={startTime ? startTime?.getTime() : null}
                        exclusive
                        onChange={(e, time) => {
                            setStartTime(time ? new Date(time) : null)
                        }}
                    >
                        {startTimesObj && consultingTime &&
                            startTimesObj[consultingTime as keyof IstartTimeObj].PM
                                .map(date => {
                                    return <TimeButton key={date.getTime()} value={date.getTime()}><TextBody2>{getHoursAndMinuteString(date)}</TextBody2></TimeButton>
                                })
                        }
                    </TimeButtonWrapper>
                </VerticalFlex>
            </VerticalFlex>
            <VerticalFlex
                style={{
                    height: calendarState === 'finish set' ? 170 : 0,
                    ...calendarAnimationStyle
                }}
            >
                <EmptyHeight height="16px" />
                <Divider />
                <VerticalFlex style={{ paddingTop: '16px' }}>
                    <TextSubtitle1>상담 진행 시간</TextSubtitle1>
                    <EmptyHeight height="8px" />
                    <TextSubtitle1 color={colorCareerDiveBlue}>{startTime && getKoreanTimeString(startTime)} ~ {startTime && getKoreanTimeString(addMinuteTs(startTime, consultingTime))}</TextSubtitle1>
                    <EmptyHeight height="24px" />
                    <CustomButton
                        height='48px'
                        width="100%"
                        onClick={() => {
                            navigate(`/mentee/request/${params.id}`)
                        }}>
                        <TextSubtitle1>
                            다음
                        </TextSubtitle1>
                    </CustomButton>
                </VerticalFlex>
            </VerticalFlex>
        </Card >
    );
};
export default MenteeCalendar