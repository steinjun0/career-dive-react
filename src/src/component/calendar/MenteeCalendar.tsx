import React, { useEffect, useRef, useState } from "react";
import { colorBackgroundCareerDiveBlue, colorBackgroundGrayLight, colorBackgroundGrayMedium, colorCareerDiveBlue, colorTextDisabled, colorTextLight, Flex, VerticalFlex } from "util/styledComponent";
import Card from "../../util/ts/Card";
import { getDatesOfMonth, isPastDate, monthList } from "./Calendar.service";
import SimpleSelect from "util/ts/SimpleSelect";
import API from "API";
import styled from "styled-components";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { addMinute, getHoursAndMinuteString } from "util/ts/util";
import { wrap } from "module";

const dateDefaultStyle = {
    justifyContent: 'center', alignItems: 'center', borderRadius: '12px', minHeight: '32px'
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
    console.log(startTime, endTime, gapMin)
    for (let addMin = 30; addMin < gapMin; addMin += 30) {
        result.push(addMinute(startTime, addMin))
    }
    return result
}

const MenteeCalendar = ({ userId }: { userId: number }) => {
    // Setting
    // 1. 모든 날짜 데이터는 Date 객체로 관리됨
    // 2. 오늘 날짜는 new Date() 객체를 매번 생성해서 받아온다.

    const [calendarDates, setCalendarDates] = useState<Array<Date | null>>()
    const [currentYearAndMonth, setCurrentYearAndMonth] = useState<Date>(new Date(new Date().setDate(1)))
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [availableDates, setAvailableDates] = useState<Date[]>([])
    interface IavailableTime {
        [key: number]: { startTime: Date, endTime: Date, ruleType: string, ruleId: number, scheduleId: number }[]
    }
    const [availableTimes, setAvailableTimes] = useState<IavailableTime>({}) // available의 date를 key값으로 정보를 가진 object
    interface IstartTimeObj { 20: { AM: Date[], PM: Date[] }, 40: { AM: Date[], PM: Date[] } }
    const [startTimesObj, setStartTimesObj] = useState<IstartTimeObj | null>(null)
    const koDtf = Intl.DateTimeFormat("ko", { year: 'numeric', month: 'narrow' })
    const monthTextList = monthList.map(e => koDtf.format(e))

    const [calendarState, setCalendarState] = useState<'view' | 'set consultingTime' | 'set startTime'>('view')
    const [consultingTime, setConsultingTime] = useState<number | null>(null)
    const [startTime, setStartTime] = useState<Date | null>(null)

    const timeSelectRef = useRef<HTMLDivElement>(null)

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
                    setAvailableDates(old => [...old, new Date(year, month - 1, dayTime.Day)])
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

        API.getConsultSchedule(currentYearAndMonth.getFullYear(), currentYearAndMonth.getMonth() + 1, userId)
            .then((res) => {
                if (res.status === 200) {
                    updateAvailableTimes(res.data.Year, res.data.Month, res.data.DayTimes)
                }
            })
    }, [currentYearAndMonth])

    // 선택 가능 시간 갱신될 때, 값이 있다면 첫 번째 값으로 날짜 자동 선택
    // (availableDates로 하면 뒤 연산에서 availableTimes가 nullable)
    useEffect(() => {
        if (availableDates[0]) {
            console.log('hihih111')
            setSelectedDate(availableDates[0])
        } else {
            setSelectedDate(null)
        }
    }, [availableTimes])

    // 날짜 선택
    useEffect(() => {
        if (selectedDate !== null) {
            setCalendarState('set consultingTime')
            setConsultingTime(null)
            setStartTime(null)

            const temp: IstartTimeObj = { 20: { AM: [], PM: [] }, 40: { AM: [], PM: [] } }

            const schedules = availableTimes[selectedDate.getDate()]
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
            setStartTimesObj(temp)
        }
        else {
            setCalendarState('view')
        }
    }, [selectedDate])


    // 상담 시간
    useEffect(() => {
        if (selectedDate === null) {
            setCalendarState('view')
        }
        else if (consultingTime === null) {
            setCalendarState('set consultingTime')
        } else if (startTime === null) {
            setCalendarState('set startTime')
        }
        setStartTime(null)

        console.log('calendarState', calendarState)
        console.log('availableTimes', availableTimes)
    }, [selectedDate, consultingTime])


    return (
        <Card
            title='상담 가능 일정'
            no_divider={false}
            style={{ boxSizing: 'border-box' }}
        >
            <Flex style={{ justifyContent: 'center' }}>
                <Flex style={{ flexWrap: 'wrap', }}>
                    <SimpleSelect<Date>
                        items={monthList}
                        texts={monthTextList}
                        onChange={(date: string) => { setCurrentYearAndMonth(new Date(date)) }}
                    />
                </Flex>
            </Flex>
            <Flex style={{ flexWrap: 'wrap', height: '344px', borderBottom: `1px solid ${colorBackgroundGrayMedium}`, paddingBottom: '16px' }}>
                {
                    ['일', '월', '화', '수', '목', '금', '토'].map((koDay, i) => {
                        return <Flex style={{ width: '14.286%', ...dateDefaultStyle }} key={i}>{koDay}</Flex>
                    })
                }
                {
                    calendarDates && calendarDates.map((date, i) => {
                        if (date === null) {
                            return <Flex data-testid="date-elem" style={{ minWidth: '14.286%', ...dateDefaultStyle }} key={i}></Flex>
                        }
                        else {
                            //비활성
                            if (isPastDate(date)) {
                                return <Flex
                                    data-testid="date-elem" style={{ width: '14.286%', ...dateDefaultStyle, color: colorTextDisabled }} key={i}>{date.getDate()}
                                </Flex>
                            }
                            // 선택
                            else if (selectedDate && selectedDate.getTime() === date.getTime()) {
                                return <Flex
                                    data-testid="date-elem" style={{ width: '14.286%', ...dateDefaultStyle }} key={i}>
                                    <Flex
                                        style={{ width: '32px', ...dateDefaultStyle, color: 'white', backgroundColor: colorCareerDiveBlue, cursor: 'pointer' }}>
                                        {date.getDate()}
                                    </Flex>

                                </Flex>
                            }
                            // 선택가능 
                            else if (availableDates.map(e => e.getTime()).includes(date.getTime())) {
                                return <Flex
                                    data-testid="date-elem" style={{ width: '14.286%', ...dateDefaultStyle }} key={i}>
                                    <Flex style={{ width: '32px', ...dateDefaultStyle, color: colorTextLight, backgroundColor: 'rgb(240, 240, 240)', cursor: 'pointer' }}
                                        onClick={() => { setSelectedDate(date) }}>
                                        {date.getDate()}
                                    </Flex>

                                </Flex>
                            }
                            // 일반
                            else {
                                return <Flex
                                    data-testid="date-elem" style={{ width: '14.286%', ...dateDefaultStyle, color: colorTextLight }} key={i}>
                                    {date.getDate()}
                                </Flex>
                            }
                        }
                    })
                }
            </Flex>

            <VerticalFlex
                style={{
                    height: calendarState !== 'view' ? 100 : 0, overflow: 'hidden',
                    transitionDelay: '0.2s', transition: 'all 0.2s ease'
                }}
            >
                <Flex>상담시간</Flex>
                <TimeButtonWrapper
                    value={consultingTime}
                    exclusive
                    onChange={(e, time) => { setConsultingTime(time) }}
                >
                    <TimeButton value={20} aria-label="20min">
                        20분
                    </TimeButton>
                    <TimeButton value={40} aria-label="40min">
                        40분
                    </TimeButton>
                </TimeButtonWrapper>
            </VerticalFlex>

            <VerticalFlex
                style={{
                    height: calendarState === 'set startTime' ? timeSelectRef.current?.scrollHeight! + 50 : 0, overflow: 'hidden',
                    transitionDelay: '0.2s', transition: 'all 0.2s ease'
                }}
            >
                <VerticalFlex ref={timeSelectRef}>
                    <Flex>오전</Flex>
                    <TimeButtonWrapper
                        value={startTime ? startTime?.getTime() : null}
                        exclusive
                        onChange={(e, time) => {
                            console.log('time', time)
                            setStartTime(new Date(time))
                        }}
                    >
                        {startTimesObj && consultingTime &&
                            startTimesObj[consultingTime as keyof IstartTimeObj].AM
                                .map(date => {
                                    return <TimeButton key={date.getTime()} value={date.getTime()}>{getHoursAndMinuteString(date)}</TimeButton>
                                })
                        }
                    </TimeButtonWrapper>
                    <Flex>오후</Flex>
                    <TimeButtonWrapper
                        value={startTime ? startTime?.getTime() : null}
                        exclusive
                        onChange={(e, time) => {
                            console.log('time', time)
                            setStartTime(new Date(time))
                        }}
                        ref={timeSelectRef}
                    >
                        {startTimesObj && consultingTime &&
                            startTimesObj[consultingTime as keyof IstartTimeObj].PM
                                .map(date => {
                                    return <TimeButton key={date.getTime()} value={date.getTime()}>{getHoursAndMinuteString(date)}</TimeButton>
                                })
                        }
                    </TimeButtonWrapper>
                </VerticalFlex>

            </VerticalFlex>

        </Card >
    );
};
export default MenteeCalendar