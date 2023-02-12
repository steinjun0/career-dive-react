import React, { Dispatch, SetStateAction, useEffect, useReducer, useRef, useState } from "react";
import { colorBackgroundCareerDiveBlue, colorBackgroundCareerDivePink, colorBackgroundGrayLight, colorBackgroundGrayMedium, colorCareerDiveBlue, colorCareerDivePink, colorTextDisabled, colorTextLight, EmptyHeight, EmptyWidth, Flex, TextBody2, TextSubtitle1, TextSubtitle2, VerticalFlex } from "util/styledComponent";
import Card from "../../util/ts/Card";
import { getDatesOfMonth, isPastDate, monthList } from "./Calendar.service";
import API from "API";
import styled from "styled-components";
import { Button, Divider, IconButton, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { addMinute, getHoursAndMinuteString, getKoreanTimeString, updateReservation } from "util/ts/util";
import { addMinuteTs } from "util/util";
import { CustomButton } from "util/Custom/CustomButton";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CircleIcon from '@mui/icons-material/Circle';
import { TagLarge } from "util/Custom/CustomTag";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import ShortcutOutlinedIcon from '@mui/icons-material/ShortcutOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import SimpleSelect from "util/ts/SimpleSelect";

const calendarAnimationStyle = {
    overflow: 'hidden',
    transitionDelay: '0.0s',
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

const TransitionFlex = styled(VerticalFlex) <{ height: number }>`
 height: ${props => props && props.height}px;
`
const ruleTypeConverter = { 'custom': '반복 없음', 'week': '매주 반복', 'day': '매일 반복' }

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

interface IavailableTime {
    [key: number]: { startTime: Date, endTime: Date, ruleType: string, ruleId: number, scheduleId: number }[]
}
interface IstartTimeObj { 20: { AM: Date[], PM: Date[] }, 40: { AM: Date[], PM: Date[] } }


type ACTIONTYPE =
    // | { type: "updateCalendarDates"; payload: Date[] }
    | { type: "updateCurrentYearAndMonth"; payload: Date }
    | { type: "updateSelectedDate"; payload: Date | null }
    | { type: "updateAvailableDates"; payload: Date[] }
    | { type: "resetAvailableDates", }
    | { type: "updateAvailableTimes"; payload: IavailableTime }
    | { type: "resetAvailableTimes", }
    | { type: "updateStartTimeObj", payload: IstartTimeObj | null }
    | { type: "updateConultingTime", payload: 20 | 40 | null }
    | { type: "updateStartTime", payload: Date | null }
    | { type: "updateCalendarState", payload: 'view' | 'add' | 'edit' }

interface IcalendarState {
    calendarDates: Date[], currentYearAndMonth: Date,
    selectedDate: Date | null, availableDates: Date[],
    availableTimes: IavailableTime, startTimeObj: IstartTimeObj | null,
    calendarState: string | 'view' | 'add' | 'edit',
}


function reducer(state: IcalendarState, action: ACTIONTYPE) {

    switch (action.type) {
        case 'updateCurrentYearAndMonth': {
            const temp = getDatesOfMonth(state.currentYearAndMonth)
            const startDay = temp[0].getDay()
            const endDay = temp[temp.length - 1].getDay()
            return {
                ...state,
                calendarDates: [...Array(startDay).fill(null), ...temp, ...Array(6 - endDay).fill(null)],
                selectedDate: null,
                consultingTime: null,
                startTime: null,
                startTimeObj: null,
                currentYearAndMonth: action.payload,
                calendarState: 'view'
            }
        }

        case 'updateCalendarState': {
            return {
                ...state,
                calendarState: action.payload
            }
        }

        case 'updateSelectedDate': {
            return {
                ...state,
                selectedDate: action.payload,
                consultingTime: null,
                startTime: null,
                startTimeObj: null,
            }
        }

        case 'updateAvailableDates': {
            return { ...state, availableDates: [...state.availableDates, ...action.payload] }
        }

        case 'resetAvailableDates': {
            return { ...state, availableDates: [] }
        }

        case 'updateAvailableTimes': {
            if (state.calendarState === 'initializing') {
                return {
                    ...state,
                    selectedDate: state.selectedDate,
                    availableTimes: action.payload,
                    calendarState: state.calendarState
                }
            } else {
                return {
                    ...state,
                    selectedDate: state.availableDates[0] ?? null,
                    availableTimes: action.payload,
                }

            }

        }

        case 'resetAvailableTimes': {
            return { ...state, availableTimes: {} }
        }

        case 'updateStartTimeObj': {
            if (state.calendarState === 'initializing') {
                return {
                    ...state,
                    startTimeObj: action.payload,
                }
            } else {
                return {
                    ...state,
                    startTimeObj: action.payload,
                    // calendarState: getCalendarStart({ ...state, selectedDate: state.availableDates[0] ?? null })
                }
            }

        }

        case 'updateConultingTime':
            if (state.calendarState === 'initializing') {
                return {
                    ...state,
                }
            } else {
                return {
                    ...state,
                    consultingTime: action.payload,
                    startTime: null,
                }
            }


        case 'updateStartTime':
            return {
                ...state,
            }

        default:
            throw new Error()
    }
}

const MentorCalendar = (props: { userId: number }) => {
    const initialState: IcalendarState =
    {
        calendarDates: [], currentYearAndMonth: new Date(new Date().setDate(1)),
        selectedDate: new Date(new Date().setDate(1)), availableDates: [],
        availableTimes: {}, startTimeObj: null,
        calendarState: 'initializing'
    }

    const navigate = useNavigate()
    const location = useLocation()
    const params = useParams();
    const [state, dispatch] = useReducer(reducer, initialState)
    const [startTimeLen, setStartTimeLen] = useState<number>(0)

    const koDtf = Intl.DateTimeFormat("ko", { year: 'numeric', month: 'narrow' })
    const timeSelectRef = useRef<HTMLDivElement>(null)

    function addCurrentYearAndMonth(month: number) {
        dispatch({ type: 'updateCurrentYearAndMonth', payload: new Date(state.currentYearAndMonth.setMonth(state.currentYearAndMonth.getMonth() + month)) })
    }

    useEffect(() => {
        dispatch({ type: 'updateCurrentYearAndMonth', payload: state.currentYearAndMonth })
    }, [])

    // availableDate,Times 설정
    useEffect(() => {
        // 선택 가능 날짜 데이터 받아오고, state 설정하기
        dispatch({ type: 'resetAvailableDates' })
        dispatch({ type: 'resetAvailableTimes' })

        interface IDayTime {
            Day: number,
            StartEnds: { StartTime: string, EndTime: string, RuleType: string, RuleID: number, ScheduleID: number }[]
        }

        function updateAvailableTimes(year: number, month: number, dayTimes: IDayTime[]) {
            const tempTimes: IavailableTime = {}
            for (let i = 0; i < dayTimes.length; i++) {
                const dayTime = dayTimes[i]
                if (!isPastDate(new Date(year, month - 1, dayTime.Day))) {
                    dispatch({ type: 'updateAvailableDates', payload: [new Date(year, month - 1, dayTime.Day)] })

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
            dispatch({ type: 'updateAvailableTimes', payload: tempTimes })
        }

        API.getConsultSchedule(state.currentYearAndMonth.getFullYear(), state.currentYearAndMonth.getMonth() + 1, localStorage.getItem('UserID'))
            .then((res) => {
                if (res.status === 200) {
                    updateAvailableTimes(res.data.Year, res.data.Month, res.data.DayTimes)
                }
            })
    }, [state.currentYearAndMonth])

    // 날짜 선택
    useEffect(() => {
        if (state.selectedDate !== null && state.availableTimes[state.selectedDate.getDate()]) {
            const temp: IstartTimeObj = { 20: { AM: [], PM: [] }, 40: { AM: [], PM: [] } }

            const schedules = state.availableTimes[state.selectedDate.getDate()]
            if (schedules) {
                const splitTimes = schedules.map(schedule => {
                    return getSplitTimes(schedule.startTime, schedule.endTime)
                        .map(date => {
                            return date
                        })
                })
                splitTimes.forEach(times => {
                    const timesAm = times
                        .filter(time => time.getHours() < 12)
                        .filter(time => ![...temp['20']['AM'], ...temp['40']['AM']].map(time => time.getTime()).includes(time.getTime()))
                    const timesPm = times
                        .filter(time => time.getHours() >= 12)
                        .filter(time => ![...temp['20']['PM'], ...temp['40']['PM']].map(time => time.getTime()).includes(time.getTime()))

                    temp['20']['AM'].push(...timesAm)
                    temp['40']['AM'].push(...timesAm.slice(0, timesAm.length - 1))
                    temp['20']['PM'].push(...timesPm)
                    temp['40']['PM'].push(...timesPm.slice(0, timesPm.length - 1))
                })

                for (let time of ['20', '40']) {
                    for (let AMPM of ['AM', 'PM']) {
                        temp[time as "20" | "40"][AMPM as "AM" | "PM"] = Array.from(new Set(temp[time as "20" | "40"][AMPM as "AM" | "PM"])).sort((a, b) => a.getTime() - b.getTime())
                    }
                }
            }
            dispatch({ type: 'updateStartTimeObj', payload: temp })
        }
    }, [state.selectedDate, state.availableTimes])


    useEffect(() => {
        if (state.startTimeObj) {
            const len = state.startTimeObj[20].AM.length + state.startTimeObj[20].PM.length +
                state.startTimeObj[40].AM.length + state.startTimeObj[40].PM.length
            setStartTimeLen(len)
        }
        else {
            setStartTimeLen(0)
        }
    }, [state.startTimeObj])

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
                    <IconButton
                        sx={{
                            backgroundColor: colorBackgroundGrayLight,
                            borderRadius: '8px',
                            height: '32px',
                            width: '32px'
                        }}
                        disabled={state.currentYearAndMonth.getMonth() === new Date().getMonth()}
                        onClick={() =>
                            addCurrentYearAndMonth(-1)
                        }
                    >
                        <ChevronLeftIcon sx={{ color: state.currentYearAndMonth.getMonth() === new Date().getMonth() ? colorTextDisabled : 'black' }} />
                    </IconButton>
                    <TextSubtitle2 style={{
                        backgroundColor: colorBackgroundGrayLight,
                        padding: '4px 12px',
                        borderRadius: '8px',
                    }}>{koDtf.format(state.currentYearAndMonth)}</TextSubtitle2>
                    <IconButton
                        sx={{
                            backgroundColor: colorBackgroundGrayLight,
                            borderRadius: '8px',
                            height: '32px',
                            width: '32px'
                        }}
                        disabled={state.currentYearAndMonth.getMonth() >= new Date().getMonth() + 6}
                        onClick={() => addCurrentYearAndMonth(1)}
                    >
                        <ChevronRightIcon sx={{ color: state.currentYearAndMonth.getMonth() >= new Date().getMonth() + 6 ? colorTextDisabled : 'black' }} />
                    </IconButton>

                </Flex>
            </Flex>
            <Flex style={{ flexWrap: 'wrap', borderBottom: `1px solid ${colorBackgroundGrayMedium}`, paddingBottom: '16px', marginTop: '16px' }}>
                {['일', '월', '화', '수', '목', '금', '토'].map((koDay, i) => {
                    return <Flex style={{ minWidth: '14.28%', justifyContent: 'center', alignItems: 'center', height: '44px', marginBottom: '10px' }} key={i}> <TextSubtitle1>{koDay}</TextSubtitle1> </Flex>
                })}
                {state.calendarDates.map((date, i) => {
                    const isSelected = (date: Date) => state.selectedDate && state.selectedDate.getDate() === date.getDate()
                    const isAvailable = (date: Date) => state.availableDates.map(e => e.getTime()).includes(date.getTime())
                    return date === null ?
                        <Flex key={i} style={{ minWidth: '14.28%', justifyContent: 'center', marginBottom: '10px' }} />
                        :
                        <Flex key={i} style={{ minWidth: '14.28%', justifyContent: 'center', marginBottom: '10px' }}>
                            <Flex
                                onClick={() => {
                                    if (!isPastDate(date)) {
                                        dispatch({ type: 'updateSelectedDate', payload: date })
                                    }
                                }}
                                style={{
                                    backgroundColor: isSelected(date) ? colorBackgroundCareerDiveBlue : 'transparent',
                                    cursor: !isPastDate(date) ? 'pointer' : '',
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
                    height: { view: '184px', edit: '184px', add: '184px' }[state.calendarState],
                    paddingTop: '16px', gap: '16px',
                    ...calendarAnimationStyle,
                }}>
                <Flex style={{ justifyContent: 'space-between' }}>
                    <TextSubtitle1>상담 가능 시간대 설정</TextSubtitle1>
                    <Flex style={{ gap: '8px' }}>
                        {['edit', 'add'].includes(state.calendarState) &&
                            <>
                                <CustomButton
                                    background_color={colorBackgroundGrayLight}
                                    custom_color={colorTextLight}
                                    style={{ padding: '7px', }}
                                    onClick={() => {
                                        dispatch({ type: 'updateCalendarState', payload: 'view' })
                                    }}
                                >
                                    <ShortcutOutlinedIcon
                                        style={{ transform: 'scaleX(-1)' }}
                                        fontSize={'small'}
                                    />
                                </CustomButton>
                                <CustomButton
                                    background_color={colorBackgroundCareerDiveBlue}
                                    custom_color={colorCareerDiveBlue}
                                    style={{ padding: '7px', }}
                                    onClick={() => {
                                        dispatch({ type: 'updateCalendarState', payload: 'view' })
                                    }}
                                >
                                    <CheckIcon
                                        fontSize={'small'}
                                    />
                                </CustomButton>
                            </>
                        }
                        {['view'].includes(state.calendarState) && <CustomButton
                            background_color={colorBackgroundGrayLight}
                            custom_color={colorTextLight}
                            style={{ padding: '7px', }}
                            onClick={() => {
                                dispatch({ type: 'updateCalendarState', payload: 'edit' })
                            }}
                        >
                            <ModeEditOutlineOutlinedIcon
                                fontSize={'small'}
                            />
                        </CustomButton>}

                        <CustomButton
                            background_color={colorBackgroundCareerDivePink}
                            custom_color={colorCareerDivePink}
                            style={{ padding: '7px', }}
                            onClick={() => { }}
                        >
                            <DeleteIcon
                                fontSize={'small'}
                            />
                        </CustomButton>
                    </Flex>
                </Flex>

                {['view', 'add'].includes(state.calendarState) &&
                    state.selectedDate &&
                    state.availableTimes[state.selectedDate?.getDate()] &&
                    state.availableTimes[state.selectedDate?.getDate()].map(
                        time => {
                            return <TagLarge style={{ padding: '4px 12px', width: 'fit-content' }}>
                                <TextBody2>{getKoreanTimeString(time.startTime)}</TextBody2>
                                &nbsp;~&nbsp;
                                <TextBody2>{getKoreanTimeString(time.endTime)}</TextBody2>
                                <EmptyWidth width="4px" /> · <EmptyWidth width="4px" />
                                <TextBody2>{ruleTypeConverter[time.ruleType as 'custom' | 'week' | 'day']}</TextBody2>
                            </TagLarge>
                        }
                    )
                }
                {['view'].includes(state.calendarState) &&
                    <CustomButton
                        custom_color={colorCareerDiveBlue}
                        background_color={colorBackgroundCareerDiveBlue}
                        width='fit-content'
                        padding="4px 8px 4px 12px"
                        onClick={() => {
                            dispatch({ type: 'updateCalendarState', payload: 'add' })
                        }}
                    >
                        <TextSubtitle2>추가</TextSubtitle2>
                        <EmptyWidth width="4px" />
                        <AddIcon sx={{ fontSize: '18px' }} />
                    </CustomButton>
                }
                {['edit'].includes(state.calendarState) &&
                    state.selectedDate &&
                    state.availableTimes[state.selectedDate?.getDate()] &&
                    state.availableTimes[state.selectedDate?.getDate()].map(
                        time => {
                            return <TagLarge style={{ padding: '4px 12px', width: 'fit-content' }}>
                                <TextBody2>{getKoreanTimeString(time.startTime)}</TextBody2>
                                &nbsp;~&nbsp;
                                <TextBody2>{getKoreanTimeString(time.endTime)}</TextBody2>
                                <EmptyWidth width="4px" /> · <EmptyWidth width="4px" />
                                <TextBody2>{ruleTypeConverter[time.ruleType as 'custom' | 'week' | 'day']}</TextBody2>
                            </TagLarge>
                        }
                    )
                }
                {
                    ['add'].includes(state.calendarState) &&
                    <VerticalFlex>
                        <Flex>
                            <TextBody2>시작</TextBody2>
                            <Flex style={{ width: '78px', }}>
                                <SimpleSelect<Date>
                                    sx={{ padding: 0, borderRadius: '8px !important', backgroundColor: colorBackgroundGrayLight, width: 'fit-content', '.MuiSelect-select': { padding: '4px 12px !important' }, '.MuiSelect-icon': { visibility: 'hidden' } }}
                                    items={[new Date()]}
                                    texts={[new Date().getHours().toString() + ' : 00']}
                                    onChange={() => { }} />
                            </Flex>

                        </Flex>
                        <Flex><TextBody2>종료</TextBody2></Flex>
                        <Flex><TextBody2>반복</TextBody2></Flex>
                    </VerticalFlex>
                }

                {/* <SimpleSelect<Date>
                    items={monthList}
                    texts={monthTextList}
                    onChange={(date: string) => { setCurrentYearAndMonth(new Date(date)) }}
                /> */}
            </VerticalFlex>
        </Card >
    );
};
export default MentorCalendar