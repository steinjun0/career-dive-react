import React, { Dispatch, SetStateAction, useEffect, useReducer, useRef, useState } from "react";
import { colorBackgroundCareerDiveBlue, colorBackgroundGrayLight, colorBackgroundGrayMedium, colorCareerDiveBlue, colorTextDisabled, colorTextLight, EmptyHeight, Flex, TextBody2, TextSubtitle1, TextSubtitle2, VerticalFlex } from "util/styledComponent";
import Card from "../../util/ts/Card";
import { getDatesOfMonth, isPastDate, monthList } from "../../services/calendar";
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

const calendarAnimationStyle = {
    overflow: 'hidden',
    transitionDelay: '0.0s',
    transition: 'all 0.2s ease'
};

const TimeButtonWrapper = styled(ToggleButtonGroup)`
  display: flex;
  flex-wrap: wrap;
  margin-right: -16px;
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
`;

const TransitionFlex = styled(VerticalFlex) <{ height: number; }>`
 height: ${props => props && props.height}px;
`;

function getSplitTimes(startTime: Date, endTime: Date): Date[] {
    const result = [startTime];
    const gapMin = (endTime.getTime() - startTime.getTime()) / 1000 / 60;
    for (let addMin = 30; addMin < gapMin; addMin += 30) {
        result.push(addMinute(startTime, addMin));
    }
    return result;
}

// 1. props가 있다면 순서대로 누르는 것과 동일하게 진행한다.
// 2. api를 통해서 해당 날짜의 일정을 받아와야한다.
// 3. 만약 해당 날짜의 일정에 props로 받은 일정과 같은게 있다면 선택, 아니면 미선택
interface IavailableTime {
    startTime: Date, endTime: Date, ruleType: string, ruleId: number, scheduleId: number;
}

interface IavailableTimes {
    [key: number]: IavailableTime[];
}
interface IstartTimeObj { 20: { AM: Date[], PM: Date[]; }, 40: { AM: Date[], PM: Date[]; }; }


type ACTIONTYPE =
    // | { type: "updateCalendarDates"; payload: Date[] }
    | { type: "updateCurrentYearAndMonth"; payload: Date; }
    | { type: "updateCurrentYearAndMonthInitial"; payload: Date; }
    | { type: "updateSelectedDate"; payload: Date | null; }
    | { type: "updateAvailableDates"; payload: Date[]; }
    | { type: "resetAvailableDates", }
    | { type: "updateAvailableTimes"; payload: IavailableTimes; }
    | { type: "resetAvailableTimes", }
    | { type: "updateStartTimeObj", payload: IstartTimeObj | null; }
    | { type: "updateConultingTime", payload: 20 | 40 | null; }
    | { type: "updateStartTime", payload: Date | null; }
    | { type: "forceRendering"; };
interface IcalendarState {
    calendarDates: Date[], currentYearAndMonth: Date,
    selectedDate: Date | null, availableDates: Date[],
    availableTimes: IavailableTimes, startTimeObj: IstartTimeObj | null,
    consultingTime: 20 | 40 | null, startTime: Date | null,
    calendarState: string | 'view' | 'setting consultingTime' | 'setting startTime' | 'finish set' | 'initializing',
    mentorId: number;
}


function reducer(state: IcalendarState, action: ACTIONTYPE) {
    function getCalendarStatus(newState: IcalendarState) {
        if (newState.selectedDate === null) {
            return 'view';
        } else if (newState.consultingTime === null) {
            return 'setting consultingTime';
        } else if (newState.startTime === null) {
            return 'setting startTime';
        } else {
            return 'finish set';
        }
    }
    // console.log('action.type', action.type, state.calendarState)
    switch (action.type) {

        // case 'updateCalendarDates': {
        //     return { ...state, calendarDates: action.payload }
        // }
        case 'updateCurrentYearAndMonth': {
            const temp = getDatesOfMonth(state.currentYearAndMonth);
            const startDay = temp[0].getDay();
            const endDay = temp[temp.length - 1].getDay();
            return {
                ...state,
                calendarDates: [...Array(startDay).fill(null), ...temp, ...Array(6 - endDay).fill(null)],
                selectedDate: null,
                consultingTime: null,
                startTime: null,
                startTimeObj: null,
                currentYearAndMonth: action.payload,
                calendarState: 'view'
            };
        }

        case 'updateCurrentYearAndMonthInitial': {
            const temp = getDatesOfMonth(state.currentYearAndMonth);
            const startDay = temp[0].getDay();
            const endDay = temp[temp.length - 1].getDay();
            return {
                ...state,
                calendarDates: [...Array(startDay).fill(null), ...temp, ...Array(6 - endDay).fill(null)],
                startTimeObj: null,
                currentYearAndMonth: action.payload,
            };
        }

        case 'updateSelectedDate': {
            return {
                ...state,
                selectedDate: action.payload,
                consultingTime: null,
                startTime: null,
                startTimeObj: null,
                calendarState: getCalendarStatus({ ...state, selectedDate: action.payload, consultingTime: null, startTime: null, })
            };
        }

        case 'updateAvailableDates': {
            return { ...state, availableDates: [...state.availableDates, ...action.payload] };
        }

        case 'resetAvailableDates': {
            return { ...state, availableDates: [] };
        }

        case 'updateAvailableTimes': {
            if (state.calendarState === 'initializing') {
                return {
                    ...state,
                    selectedDate: state.selectedDate,
                    availableTimes: action.payload,
                    calendarState: 'initializing'
                };
            } else {
                return {
                    ...state,
                    selectedDate: state.availableDates[0] ?? null,
                    availableTimes: action.payload,
                    calendarState: getCalendarStatus({ ...state, selectedDate: state.availableDates[0] ?? null, })
                };
            }

        }

        case 'resetAvailableTimes': {
            return { ...state, availableTimes: {} };
        }

        case 'updateStartTimeObj': {
            if (state.calendarState === 'initializing') {
                return {
                    ...state,
                    startTimeObj: action.payload,
                    calendarState: 'finish set'
                };
            } else {
                return {
                    ...state,
                    startTimeObj: action.payload,
                    // calendarState: getCalendarStatus({ ...state, selectedDate: state.availableDates[0] ?? null })
                };
            }

        }

        case 'updateConultingTime':
            if (state.calendarState === 'initializing') {
                return {
                    ...state,
                    consultingTime: state.consultingTime,
                    startTime: state.startTime,
                    // calendarState: getCalendarStatus({ ...state, consultingTime: action.payload, startTime: null, })
                };
            } else {
                return {
                    ...state,
                    consultingTime: action.payload,
                    startTime: null,
                    calendarState: getCalendarStatus({ ...state, consultingTime: action.payload, startTime: null, })
                };
            }


        case 'updateStartTime':
            if (state.calendarState === 'initializing') {
                return {
                    ...state,
                    startTime: action.payload,
                    calendarState: 'initializing'
                };
            } else {
                const scheduleId = state.availableTimes[state.selectedDate!.getDate()]
                    .find((schedule) => {
                        return schedule.startTime.getTime() <= action.payload!.getTime() && action.payload!.getTime() <= schedule.endTime.getTime();
                    })!.scheduleId;
                updateReservation(
                    state.mentorId,
                    [
                        { name: 'scheduleId', data: scheduleId },
                        { name: 'startTime', data: action.payload },
                        { name: 'consultingTime', data: state.consultingTime }
                    ]
                );
                return {
                    ...state,
                    startTime: action.payload,
                    calendarState: getCalendarStatus({ ...state, startTime: action.payload })
                };

            }



        case 'forceRendering': {
            return { ...state };
        }

        default:
            throw new Error();
    }
}

const MenteeCalendar = (props:
    { userId: number, startDate: Date | null, consultingTime: 20 | 40 | null, setIsFinished?: Dispatch<SetStateAction<boolean>>; }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const initialState: IcalendarState =
    {
        calendarDates: [], currentYearAndMonth: props.startDate ? new Date(new Date(props.startDate).setDate(1)) : new Date(new Date().setDate(1)),
        selectedDate: props.startDate, availableDates: [],
        availableTimes: {}, startTimeObj: null,
        consultingTime: props.consultingTime, startTime: props.startDate,
        calendarState: props.startDate ? 'initializing' : 'view',
        mentorId: +params.id!
    };

    const [state, dispatch] = useReducer(reducer, initialState);
    const [startTimeLen, setStartTimeLen] = useState<number>(0);

    const koDtf = Intl.DateTimeFormat("ko", { year: 'numeric', month: 'narrow' });
    const timeSelectRef = useRef<HTMLDivElement>(null);

    function addCurrentYearAndMonth(month: number) {
        dispatch({ type: 'updateCurrentYearAndMonth', payload: new Date(state.currentYearAndMonth.setMonth(state.currentYearAndMonth.getMonth() + month)) });
    }

    useEffect(() => {
        if (props.startDate)
            dispatch({ type: 'updateCurrentYearAndMonthInitial', payload: state.currentYearAndMonth });
        else
            dispatch({ type: 'updateCurrentYearAndMonth', payload: state.currentYearAndMonth });
    }, []);

    const [test, setTest] = useState();
    useEffect(() => {
        const tempFunc = async () => {
            const res = await API.getAccountMentorList();
            setTest(res);
        };
        tempFunc();
    }, []);

    // availableDate,Times 설정
    useEffect(() => {
        // 선택 가능 날짜 데이터 받아오고, state 설정하기
        dispatch({ type: 'resetAvailableDates' });
        dispatch({ type: 'resetAvailableTimes' });

        interface IDayTime {
            Day: number,
            StartEnds: { StartTime: string, EndTime: string, RuleType: string, RuleID: number, ScheduleID: number; }[];
        }

        function updateAvailableTimes(year: number, month: number, dayTimes: IDayTime[]) {
            const tempTimes: IavailableTimes = {};
            for (let i = 0; i < dayTimes.length; i++) {
                const dayTime = dayTimes[i];
                if (!isPastDate(new Date(year, month - 1, dayTime.Day))) {
                    dispatch({ type: 'updateAvailableDates', payload: [new Date(year, month - 1, dayTime.Day)] });

                    for (let j = 0; j < dayTime.StartEnds.length; j++) {
                        const startEnd = dayTime.StartEnds[j];
                        if (tempTimes[dayTime.Day] === undefined)
                            tempTimes[dayTime.Day] = [];
                        tempTimes[dayTime.Day].push({
                            startTime: new Date(year, month - 1, dayTime.Day, +startEnd.StartTime.slice(0, 2), +startEnd.StartTime.slice(3, 5)),
                            endTime: new Date(year, month - 1, dayTime.Day, +startEnd.EndTime.slice(0, 2), +startEnd.EndTime.slice(3, 5)),
                            ruleType: startEnd.RuleType,
                            ruleId: startEnd.RuleID,
                            scheduleId: startEnd.ScheduleID
                        });
                    }
                }
            }
            dispatch({ type: 'updateAvailableTimes', payload: tempTimes });
            if (state.calendarState === 'initializing') {
                dispatch({ type: 'updateStartTime', payload: state.startTime });
                setTimeout(() => {
                    dispatch({ type: 'forceRendering' });
                }, 1);
            }
        }

        API.getConsultSchedule(state.currentYearAndMonth.getFullYear(), state.currentYearAndMonth.getMonth() + 1, props.userId)
            .then((res) => {
                if (res.status === 200) {
                    updateAvailableTimes(res.data.Year, res.data.Month, res.data.DayTimes);
                }
            });
    }, [state.currentYearAndMonth]);

    // 날짜 선택
    useEffect(() => {
        if (state.selectedDate !== null && state.availableTimes[state.selectedDate.getDate()]) {
            const temp: IstartTimeObj = { 20: { AM: [], PM: [] }, 40: { AM: [], PM: [] } };

            const schedules = state.availableTimes[state.selectedDate.getDate()];
            if (schedules) {
                const splitTimes = schedules.map((schedule: IavailableTime) => {
                    return getSplitTimes(schedule.startTime, schedule.endTime)
                        .map((date: Date) => {
                            return date;
                        });
                });
                splitTimes.forEach((times: Date[]) => {
                    const timesAm = times
                        .filter(time => time.getHours() < 12)
                        .filter(time => ![...temp['20']['AM'], ...temp['40']['AM']].map(time => time.getTime()).includes(time.getTime()));
                    const timesPm = times
                        .filter(time => time.getHours() >= 12)
                        .filter(time => ![...temp['20']['PM'], ...temp['40']['PM']].map(time => time.getTime()).includes(time.getTime()));

                    temp['20']['AM'].push(...timesAm);
                    temp['40']['AM'].push(...timesAm.slice(0, timesAm.length - 1));
                    temp['20']['PM'].push(...timesPm);
                    temp['40']['PM'].push(...timesPm.slice(0, timesPm.length - 1));
                });

                for (let time of ['20', '40']) {
                    for (let AMPM of ['AM', 'PM']) {
                        temp[time as "20" | "40"][AMPM as "AM" | "PM"] = Array.from(new Set(temp[time as "20" | "40"][AMPM as "AM" | "PM"])).sort((a, b) => a.getTime() - b.getTime());
                    }
                }
            }
            dispatch({ type: 'updateStartTimeObj', payload: temp });
        }
    }, [state.selectedDate, state.availableTimes]);

    useEffect(() => {
        if (props.setIsFinished)
            props.setIsFinished(state.calendarState === 'finish set');
    }, [state.calendarState, props.setIsFinished]);

    useEffect(() => {
        if (state.startTimeObj) {
            const len = state.startTimeObj[20].AM.length + state.startTimeObj[20].PM.length +
                state.startTimeObj[40].AM.length + state.startTimeObj[40].PM.length;
            setStartTimeLen(len);
        }
        else {
            setStartTimeLen(0);
        }
    }, [state.startTimeObj]);

    return (
        <Flex>
            <Card
                title='상담 가능 일정'
                no_divider={false}
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
                            // backgroundColor: colorBackgroundGrayLight,
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
                        return <Flex style={{ minWidth: '14.28%', justifyContent: 'center', alignItems: 'center', height: '44px', marginBottom: '10px' }} key={i}> <TextSubtitle1>{koDay}</TextSubtitle1> </Flex>;
                    })}
                    {state.calendarDates.map((date: Date, i: number) => {
                        const isSelected = (date: Date) => state.selectedDate && state.selectedDate.getDate() === date.getDate();
                        const isAvailable = (date: Date) => state.availableDates.map((e: Date) => e.getTime()).includes(date.getTime());
                        return date === null ?
                            <Flex key={i} style={{ minWidth: '14.28%', justifyContent: 'center', marginBottom: '10px' }} />
                            :
                            <Flex key={i} style={{ minWidth: '14.28%', justifyContent: 'center', marginBottom: '10px' }}>
                                <Flex
                                    onClick={() => {
                                        if (isAvailable(date)) {
                                            dispatch({ type: 'updateSelectedDate', payload: date });
                                        }
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
                            </Flex>;
                    })}
                </Flex>

                <VerticalFlex
                    style={{
                        height: state.calendarState !== 'view' ? 84 : 0, ...calendarAnimationStyle,
                        marginTop: '16px',
                    }}
                >
                    <TextSubtitle1>상담 시간</TextSubtitle1>
                    <TimeButtonWrapper
                        value={state.consultingTime}
                        exclusive
                        onChange={(e, time) => {
                            dispatch({ type: 'updateConultingTime', payload: time });
                            setTimeout(() => {
                                dispatch({ type: 'forceRendering' });
                            }, 1);
                        }}
                    >

                        {
                            state.startTimeObj && state.startTimeObj[20].AM.length + state.startTimeObj[20].PM.length > 0 &&
                            <TimeButton value={20} aria-label="20min">
                                <TextBody2>20분</TextBody2>
                            </TimeButton>
                        }
                        {
                            state.startTimeObj && state.startTimeObj[40].AM.length + state.startTimeObj[40].PM.length > 0 &&
                            <TimeButton value={40} aria-label="40min">
                                <TextBody2>40분</TextBody2>
                            </TimeButton>
                        }
                        {
                            startTimeLen === 0 &&
                            <TextBody2 style={{ marginTop: 16, color: colorTextLight }}>상담 시간이 모두 예약 되었어요</TextBody2>
                        }
                    </TimeButtonWrapper>
                </VerticalFlex>

                <TransitionFlex
                    style={{
                        paddingLeft: '1px', marginTop: '16px',
                        ...calendarAnimationStyle
                    }}
                    height={['setting startTime', 'finish set'].includes(state.calendarState) ? timeSelectRef.current?.scrollHeight! : 0}
                >
                    <VerticalFlex ref={timeSelectRef}>
                        {
                            state.startTimeObj && state.consultingTime && state.startTimeObj[state.consultingTime].AM.length > 0 &&
                            <>
                                <TextSubtitle1>오전</TextSubtitle1>
                                <TimeButtonWrapper
                                    value={state.startTime ? state.startTime.getTime() : null}
                                    exclusive
                                    onChange={(e, time) => {
                                        dispatch({ type: 'updateStartTime', payload: time ? new Date(time) : null });
                                    }}
                                >
                                    {
                                        state.startTimeObj[state.consultingTime].AM
                                            .map((date: Date) => {
                                                return <TimeButton
                                                    key={date.getTime()}
                                                    value={date.getTime()}><TextBody2>{getHoursAndMinuteString(date)}</TextBody2>
                                                </TimeButton>;
                                            })
                                    }
                                </TimeButtonWrapper>
                                <EmptyHeight height="16px" />
                            </>
                        }
                        {state.startTimeObj && state.consultingTime && state.startTimeObj[state.consultingTime].PM.length > 0 &&
                            <>
                                <TextSubtitle1>오후</TextSubtitle1>
                                <TimeButtonWrapper
                                    value={state.startTime ? state.startTime.getTime() : null}
                                    exclusive
                                    onChange={(e, time) => {
                                        dispatch({ type: 'updateStartTime', payload: time ? new Date(time) : null });
                                    }}
                                >
                                    {
                                        state.startTimeObj[state.consultingTime].PM
                                            .map((date: Date) => {
                                                return <TimeButton
                                                    key={date.getTime()}
                                                    value={date.getTime()}><TextBody2>{getHoursAndMinuteString(new Date(new Date(date).setHours(date.getHours() - 12)))}</TextBody2>
                                                </TimeButton>;
                                            })
                                    }
                                </TimeButtonWrapper>
                            </>
                        }

                    </VerticalFlex>
                </TransitionFlex>
                <VerticalFlex
                    style={{
                        height: state.calendarState === 'finish set' ? location.pathname.includes('request') ? 88 : 170 : 0,
                        ...calendarAnimationStyle
                    }}
                >
                    <EmptyHeight height="16px" />
                    <Divider />
                    <VerticalFlex style={{ paddingTop: '16px' }}>
                        <TextSubtitle1>상담 진행 시간</TextSubtitle1>
                        <EmptyHeight height="8px" />
                        <TextSubtitle1 color={colorCareerDiveBlue}>{state.startTime && getKoreanTimeString(state.startTime)} ~ {state.startTime && getKoreanTimeString(addMinuteTs(state.startTime, state.consultingTime))}</TextSubtitle1>
                        <EmptyHeight height="24px" />
                        <CustomButton
                            height='48px'
                            width="100%"
                            onClick={() => {
                                const scheduleId = state.availableTimes[state.selectedDate!.getDate()]
                                    .find(
                                        (e: IavailableTime) => {
                                            return e.startTime.getTime() <= state.startTime!.getTime() && state.startTime!.getTime() <= e.endTime.getTime();
                                        }
                                    )!.scheduleId;

                                updateReservation(
                                    +params.id!,
                                    [
                                        { name: 'scheduleId', data: scheduleId },
                                        { name: 'startTime', data: state.startTime },
                                        { name: 'consultingTime', data: state.consultingTime }
                                    ]
                                );

                                navigate(`/mentee/request/${params.id}`);
                            }}>
                            <TextSubtitle1>
                                다음
                            </TextSubtitle1>
                        </CustomButton>
                    </VerticalFlex>
                </VerticalFlex>
            </Card >
        </Flex>

    );
};
export default MenteeCalendar;