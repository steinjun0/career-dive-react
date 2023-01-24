import React, { useEffect, useState } from "react";
import { colorBackgroundGrayMedium, colorCareerDiveBlue, colorTextDisabled, colorTextLight, Flex } from "util/styledComponent";
import Card from "../../util/ts/Card";
import { getDatesOfMonth, isPastDate, monthList } from "./Calendar.service";
import SimpleSelect from "util/ts/SimpleSelect";
import API from "API";

const dateDefaultStyle = {
    justifyContent: 'center', alignItems: 'center', borderRadius: '12px', minHeight: '32px'
}

const MenteeCalendar = ({ userId }: { userId: number }) => {
    // Setting
    // 1. 모든 날짜 데이터는 Date 객체로 관리됨
    // 2. 오늘 날짜는 new Date() 객체를 매번 생성해서 받아온다.

    const [calendarDates, setCalendarDates] = useState<Array<Date | null>>()
    const [currentYearAndMonth, setCurrentYearAndMonth] = useState<Date>(new Date(new Date().setDate(1)))
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
    const [availableDates, setAvailableDates] = useState<Date[]>([])
    interface IavailableTime {
        [key: number]: { startTime: Date, endTime: Date, ruleType: string, ruleId: number, scheduleId: number }[]
    }
    const [availableTimes, setAvailableTimes] = useState<IavailableTime>({}) // available의 date를 key값으로 정보를 가진 object

    const koDtf = Intl.DateTimeFormat("ko", { year: 'numeric', month: 'narrow' })
    const monthTextList = monthList.map(e => koDtf.format(e))

    useEffect(() => {
        // 월별 날짜 표기
        const temp = getDatesOfMonth(currentYearAndMonth)
        const startDay = temp[0].getDay()
        const endDay = temp[temp.length - 1].getDay()
        setCalendarDates([...Array(startDay).fill(null), ...temp, ...Array(6 - endDay).fill(null)])

        // 선택 가능 날짜 데이터 받아오고, state 설정하기
        setAvailableDates([])
        setAvailableTimes([])
        API.getConsultSchedule(currentYearAndMonth.getFullYear(), currentYearAndMonth.getMonth() + 1, userId)
            .then((res) => {
                if (res.status === 200) {
                    console.log('res.data.DayTimes', res.data.DayTimes,)
                    const tempTimes: IavailableTime = {}
                    for (let i = 0; i < res.data.DayTimes.length; i++) {
                        const dayTime: { Day: number, StartEnds: { StartTime: string, EndTime: string, RuleType: string, RuleID: number, ScheduleID: number }[] } = res.data.DayTimes[i]
                        if (!isPastDate(new Date(res.data.Year, res.data.Month - 1, dayTime.Day))) {
                            setAvailableDates(old => [...old, new Date(res.data.Year, res.data.Month - 1, dayTime.Day)])
                            for (let j = 0; j < dayTime.StartEnds.length; j++) {
                                const startEnd = dayTime.StartEnds[j]
                                if (tempTimes[dayTime.Day] === undefined)
                                    tempTimes[dayTime.Day] = []
                                tempTimes[dayTime.Day].push({
                                    startTime: new Date(res.data.Year, res.data.Month - 1, dayTime.Day, +startEnd.StartTime.slice(0, 2), +startEnd.StartTime.slice(3, 5)),
                                    endTime: new Date(res.data.Year, res.data.Month - 1, dayTime.Day, +startEnd.EndTime.slice(0, 2), +startEnd.EndTime.slice(3, 5)),
                                    ruleType: startEnd.RuleType,
                                    ruleId: startEnd.RuleID,
                                    scheduleId: startEnd.ScheduleID
                                })
                            }
                        }
                    }
                    setAvailableTimes(tempTimes)
                }
            })
    }, [currentYearAndMonth])

    useEffect(() => {
        // 선택 가능날짜 갱신될 때, 값이 있다면 첫 번째 값으로 날짜 자동 선택
        if (availableDates[0]) {
            setSelectedDate(availableDates[0])
        } else {
            setSelectedDate(null)
        }
    }, [availableDates])

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

        </Card >
    );
};
export default MenteeCalendar