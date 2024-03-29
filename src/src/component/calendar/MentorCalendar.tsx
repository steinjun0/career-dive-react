import React, { useEffect, useReducer, useRef, useState } from "react";
import { colorBackgroundCareerDiveBlue, colorBackgroundCareerDivePink, colorBackgroundGrayLight, colorBackgroundGrayMedium, colorCareerDiveBlue, colorCareerDivePink, colorTextDisabled, colorTextLight, EmptyHeight, EmptyWidth, Flex, TextBody2, TextSubtitle1, TextSubtitle2, VerticalFlex } from "util/styledComponent";
import Card from "../../util/ts/Card";
import { getDatesOfMonth, isPastDate } from "../../services/calendar";
import API from "API";
import styled from "styled-components";
import { IconButton, } from "@mui/material";
import { addMinute, getHoursAndMinuteString, getKoreanTimeString } from "util/ts/util";
import { CustomButton } from "util/Custom/CustomButton";
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
import { AxiosResponse } from "axios";
import CloseIcon from '@mui/icons-material/Close';

const calendarAnimationStyle = {
    overflow: 'hidden',
    transitionDelay: '0.0s',
    transition: 'all 0.2s ease'
};

const TransitionFlex = styled(VerticalFlex) <{ height: number; }>`
 height: ${props => props && props.height}px;
`;
const ruleTypeConverter = { 'custom': '반복 없음', 'week': '매주 반복', 'day': '매일 반복' };


type RuleType = 'custom' | 'week' | 'day';

interface IavailableTime {
    [key: number]: { startTime: Date, endTime: Date, ruleType: RuleType, ruleId: number, scheduleId: number; }[];
}
interface IstartTimeObj { 20: { AM: Date[], PM: Date[]; }, 40: { AM: Date[], PM: Date[]; }; }


type ACTIONTYPE =
    // | { type: "updateCalendarDates"; payload: Date[] }
    | { type: "updateCurrentYearAndMonth"; payload: Date; }
    | { type: "updateSelectedDate"; payload: Date | null; }
    | { type: "updateAvailableDates"; payload: Date[]; }
    | { type: "resetAvailableDates", }
    | { type: "updateAvailableTimes"; payload: IavailableTime; }
    | { type: "resetAvailableTimes", }
    | { type: "updateCalendarState", payload: 'view' | 'add' | 'edit'; }
    | { type: "addNewTime"; }
    | { type: "updateNewTime", payload: { startTime: Date, endTime: Date, ruleType: RuleType; }; }
    | { type: "editSchedule", payload: { scheduleId: number, startTime: Date, endTime: Date, ruleType: RuleType, }; }
    | { type: "removeSchedule", payload: { scheduleId: number, ruleDelete: 'rule' | 'day'; }; }
    | { type: "forceRendering"; };

interface IcalendarState {
    calendarDates: Date[], currentYearAndMonth: Date,
    selectedDate: Date | null, availableDates: Date[],
    availableTimes: IavailableTime, startTimeObj: IstartTimeObj | null,
    calendarState: string | 'view' | 'add' | 'edit',
    newTime: { startTime: Date, endTime: Date, ruleType: RuleType; } | null,
    tempSchedules: { startTime: Date, endTime: Date, ruleType: RuleType, ruleId: number, scheduleId: number, ruleDelete?: 'rule' | 'day'; }[] | null;
}

interface IDayTime {
    Day: number,
    StartEnds: { StartTime: string, EndTime: string, RuleType: RuleType, RuleID: number, ScheduleID: number; }[];
}


function reducer(state: IcalendarState, action: ACTIONTYPE) {

    switch (action.type) {
        case 'updateCurrentYearAndMonth': {
            const temp = getDatesOfMonth(state.currentYearAndMonth);
            const startDay = temp[0].getDay();
            const endDay = temp[temp.length - 1].getDay();
            return {
                ...state,
                calendarDates: [...Array(startDay).fill(null), ...temp, ...Array(6 - endDay).fill(null)],
                selectedDate: null,
                startTime: null,
                startTimeObj: null,
                currentYearAndMonth: action.payload,
                calendarState: 'view'
            };
        }

        case 'updateCalendarState': {
            let tempSchedules;
            if (action.payload === 'edit') {
                tempSchedules = structuredClone(state.availableTimes[state.selectedDate!.getDate()]);
            } else {
                tempSchedules = null;
            }
            return {
                ...state,
                tempSchedules: tempSchedules,
                calendarState: action.payload
            };
        }

        case 'updateSelectedDate': {
            return {
                ...state,
                selectedDate: action.payload,
                startTime: null,
                startTimeObj: null,
            };
        }

        case 'updateAvailableDates': {
            return { ...state, availableDates: [...state.availableDates, ...action.payload] };
        }

        case 'resetAvailableDates': {
            return { ...state, availableDates: [] };
        }

        case 'updateAvailableTimes': {
            return {
                ...state,
                selectedDate: state.selectedDate ?? state.availableDates[0] ?? new Date(new Date().setMinutes(0)),
                availableTimes: action.payload,
            };
        }

        case 'resetAvailableTimes': {
            return { ...state, availableTimes: {} };
        }

        case 'addNewTime':
            return {
                ...state,
                calendarState: 'add',
                newTime: {
                    startTime: new Date(new Date(state.selectedDate!).setHours(8)),
                    endTime: new Date(new Date(state.selectedDate!).setHours(23)),
                    ruleType: 'week' as RuleType
                }
            };

        case 'updateNewTime':
            return {
                ...state,
                calendarState: 'add',
                newTime: action.payload,
            };

        case 'editSchedule':
            const schedule = state.tempSchedules!
                .find(e => e.scheduleId === action.payload.scheduleId);
            schedule!.startTime = action.payload.startTime;
            schedule!.endTime = action.payload.endTime;
            schedule!.ruleType = action.payload.ruleType;
            return {
                ...state,
            };
        case 'removeSchedule':
            // if (action.payload.ruleDelete === 'rule') {
            state.tempSchedules!.find((schedule) => schedule.scheduleId === action.payload.scheduleId)!.ruleDelete = action.payload.ruleDelete;
            // }
            // if (action.payload.ruleDelete === 'day') {
            //     state.tempSchedules = state.tempSchedules!.filter(schedule => schedule.scheduleId !== action.payload.scheduleId)
            // }
            return {
                ...state,
            };
        // for animation
        case 'forceRendering': {
            return { ...state };
        }

        default:
            throw new Error();
    }
}

async function saveCalendar({ state, dispatch }: { state: IcalendarState, dispatch: (value: ACTIONTYPE) => void; }) {
    const apiList = [];

    const dayTimes = [...Object.keys(state.availableTimes)
        .map((date) => {
            return {
                Day: Number(date),
                StartEnds: [...state.availableTimes[+date].filter((e) => {
                    if (e.ruleType === 'custom')
                        return true;
                    else
                        return false;
                }).map((e) => {
                    return {
                        StartTime: getHoursAndMinuteString(e.startTime),
                        EndTime: getHoursAndMinuteString(e.endTime),
                    };
                })],
            };
        })
    ];
    // 추가
    if (state.calendarState === 'add') {
        let apiCall: Promise<AxiosResponse> | null = null;
        if (state.newTime!.ruleType === 'custom') {
            dayTimes.push({
                Day: state.newTime!.startTime.getDate(),
                StartEnds: [{
                    StartTime: getHoursAndMinuteString(state.newTime!.startTime),
                    EndTime: getHoursAndMinuteString(state.newTime!.endTime)
                }],
            });

            apiList.push(
                API.postConsultSchedule(dayTimes,
                    state.selectedDate!.getFullYear(),
                    state.selectedDate!.getMonth() + 1,
                    Number(localStorage.getItem('UserID'))
                )
            );
        } else {
            if (state.newTime) {
                const startTime = getHoursAndMinuteString(state.newTime.startTime);
                const endTime = getHoursAndMinuteString(state.newTime.endTime);
                const weekDay = state.newTime.startTime.getDay();
                const type = state.newTime.ruleType;

                apiList.push(
                    API.postConsultScheduleRule(
                        startTime,
                        endTime,
                        weekDay,
                        type,
                        Number(localStorage.getItem('UserID')),
                        `${state.newTime.startTime.getFullYear()}-${`${state.newTime.startTime.getMonth() + 1}`.padStart(2, '0')}-${`${state.newTime.startTime.getDate()}`.padStart(2, '0')}`
                    )
                );
            }
        }

    }
    // 수정
    else if (state.calendarState === 'edit') {
        // patch day
        state.tempSchedules!
            .filter((schedule: any) => schedule.ruleType === 'custom' && schedule.ruleDelete !== 'day')
            .forEach(schedule => {
                const startTime = getHoursAndMinuteString(schedule.startTime);
                const endTime = getHoursAndMinuteString(schedule.endTime);
                apiList.push(
                    API.patchConsultSchedule(
                        schedule.scheduleId,
                        startTime,
                        endTime,
                        Number(localStorage.getItem('UserID'))
                    )
                );
            });

        // patch rule 
        apiList.push(
            ...state.tempSchedules!
                .filter(schedule => schedule.ruleType !== 'custom' && [null, undefined].includes((schedule as any).ruleDelete))
                .map(schedule => {
                    const startTime = getHoursAndMinuteString(schedule.startTime);
                    const endTime = getHoursAndMinuteString(schedule.endTime);
                    const weekDay = schedule.startTime.getDay();
                    const type = schedule.ruleType;
                    // 원래 규칙이 아니었다면 add
                    if (!state.availableTimes[state.selectedDate!.getDate()]
                        .find(e => e.scheduleId === schedule.scheduleId)) {
                        return API.postConsultScheduleRule(
                            startTime,
                            endTime,
                            weekDay,
                            type,
                            Number(localStorage.getItem('UserID')),
                            `${schedule.startTime.getFullYear()}-${`${schedule.startTime.getMonth() + 1}`.padStart(2, '0')}-${`${schedule.startTime.getDate()}`.padStart(2, '0')}`
                        );
                    }
                    // 원래 규칙이었다면 patch
                    else {
                        return API.patchConsultScheduleRule(
                            schedule.ruleId,
                            startTime,
                            endTime,
                            weekDay,
                            type,
                            Number(localStorage.getItem('UserID')),
                            `${schedule.startTime.getFullYear()}-${`${schedule.startTime.getMonth() + 1}`.padStart(2, '0')}-${`${schedule.startTime.getDate()}`.padStart(2, '0')}`
                        );
                    }

                })
        );

        // day/rule delete
        apiList.push(
            ...state.tempSchedules!.map(function (schedule) {
                const ruleDelete = (schedule as { startTime: Date; endTime: Date; ruleType: RuleType; ruleId: number; scheduleId: number; ruleDelete: 'rule' | 'day'; }).ruleDelete;
                if (ruleDelete === 'rule') {
                    return API.deleteConsultScheduleRule(
                        schedule.ruleId,
                        `${schedule.startTime.getFullYear()}-${`${schedule.startTime.getMonth() + 1}`.padStart(2, '0')}-${`${schedule.startTime.getDate()}`.padStart(2, '0')}`
                    );
                } else if (ruleDelete === 'day') {
                    return API.deleteConsultSchedule(
                        schedule.scheduleId
                    );
                }

            })
        );
    }
    Promise.all(apiList).then(() => {
        API.getConsultSchedule(state.currentYearAndMonth.getFullYear(), state.currentYearAndMonth.getMonth() + 1, localStorage.getItem('UserID'))
            .then((res) => {
                if (res.status === 200) {
                    updateAvailableTimes(res.data.Year, res.data.Month, res.data.DayTimes ?? [], state, dispatch);
                    dispatch({ type: 'updateCalendarState', payload: 'view' });
                    resetAll(state, dispatch);
                }
            });
    });
}

function updateAvailableTimes(year: number, month: number, dayTimes: IDayTime[], state: IcalendarState, dispatch: (value: ACTIONTYPE) => void) {
    const tempTimes: IavailableTime = {};
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
}

function resetAll(state: IcalendarState, dispatch: (value: ACTIONTYPE) => void) {
    // 선택 가능 날짜 데이터 받아오고, state 설정하기
    dispatch({ type: 'resetAvailableDates' });
    dispatch({ type: 'resetAvailableTimes' });

    API.getConsultSchedule(state.currentYearAndMonth.getFullYear(), state.currentYearAndMonth.getMonth() + 1, localStorage.getItem('UserID'))
        .then((res) => {
            if (res.status === 200) {
                updateAvailableTimes(res.data.Year, res.data.Month, res.data.DayTimes, state, dispatch);
                setTimeout(() => {
                    dispatch({ type: 'forceRendering' });
                }, 1);
            }
        });
}

const MentorCalendar = (props: { userId: number; }) => {
    const initialState: IcalendarState =
    {
        calendarDates: [], currentYearAndMonth: new Date(new Date().setDate(1)),
        selectedDate: new Date(new Date().setDate(1)), availableDates: [],
        availableTimes: {}, startTimeObj: null,
        calendarState: 'view', newTime: null,
        tempSchedules: null
    };

    const [state, dispatch] = useReducer(reducer, initialState);
    const bottomDivRef = useRef<HTMLDivElement>(null);

    const koDtf = Intl.DateTimeFormat("ko", { year: 'numeric', month: 'narrow' });

    function addCurrentYearAndMonth(month: number) {
        dispatch({ type: 'updateCurrentYearAndMonth', payload: new Date(state.currentYearAndMonth.setMonth(state.currentYearAndMonth.getMonth() + month)) });
    }

    useEffect(() => {
        dispatch({ type: 'updateCurrentYearAndMonth', payload: state.currentYearAndMonth });
        setTimeout(() => { dispatch({ type: 'forceRendering', }); }, 1);
    }, []);

    // availableDate,Times 설정
    useEffect(() => {
        resetAll(state, dispatch);
    }, [state.currentYearAndMonth]);


    // useEffect(() => {
    //     console.log(state)

    // }, [state])


    return (
        <Card
            title='상담 가능 일정'
            no_divider={false}
            sx={{ boxSizing: 'border-box', maxWidth: '400px' }}
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
                {state.calendarDates.map((date, i) => {
                    const isSelected = (date: Date) => state.selectedDate && state.selectedDate.getDate() === date.getDate();
                    const isAvailable = (date: Date) => state.availableDates.map(e => e.getTime()).includes(date.getTime());
                    return date === null ?
                        <Flex key={i} style={{ minWidth: '14.28%', justifyContent: 'center', marginBottom: '10px' }} />
                        :
                        <Flex key={i} style={{ minWidth: '14.28%', justifyContent: 'center', marginBottom: '10px' }}>
                            <Flex
                                onClick={() => {
                                    if (!isPastDate(date) && state.calendarState === 'view') {
                                        dispatch({ type: 'updateSelectedDate', payload: date });

                                        setTimeout(() => { dispatch({ type: 'forceRendering', }); }, 1);
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
                        </Flex>;
                })}
            </Flex>
            <VerticalFlex
                style={{
                    height: bottomDivRef.current ? bottomDivRef.current?.scrollHeight : '0',
                    ...calendarAnimationStyle
                }}>
                <VerticalFlex
                    style={{
                        paddingTop: '16px', gap: '16px',
                    }}
                    ref={bottomDivRef}
                >
                    <Flex style={{ justifyContent: 'space-between', alignItems: 'center', height: '32px' }}>
                        <TextSubtitle1>상담 가능 시간대 설정</TextSubtitle1>
                        <Flex style={{ gap: '8px' }}>
                            {['edit'].includes(state.calendarState) &&
                                <BackAndSave state={state} dispatch={dispatch} saveCalendar={saveCalendar} />
                            }
                            {
                                ['view'].includes(state.calendarState) &&
                                state.selectedDate &&
                                state.availableTimes[state.selectedDate.getDate()] &&
                                state.availableTimes[state.selectedDate.getDate()].length > 0 &&
                                <CustomButton
                                    background_color={colorBackgroundGrayLight}
                                    custom_color={colorTextLight}
                                    style={{ padding: '7px', }}
                                    onClick={() => {
                                        dispatch({ type: 'updateCalendarState', payload: 'edit' });
                                    }}
                                >
                                    <ModeEditOutlineOutlinedIcon
                                        fontSize={'small'}
                                    />
                                </CustomButton>
                            }
                        </Flex>
                    </Flex>
                    {['view', 'add'].includes(state.calendarState) &&
                        state.selectedDate &&
                        state.availableTimes[state.selectedDate?.getDate()] &&
                        state.availableTimes[state.selectedDate?.getDate()].map(
                            (time, i) => {
                                return <TimeShower time={time} key={i} />;
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
                                dispatch({ type: 'addNewTime' });
                            }}
                        >
                            <TextSubtitle2>추가</TextSubtitle2>
                            <EmptyWidth width="4px" />
                            <AddIcon sx={{ fontSize: '18px' }} />
                        </CustomButton>
                    }
                    {['edit'].includes(state.calendarState) &&
                        state.tempSchedules!.map(
                            (time: { startTime: Date, endTime: Date, ruleType: RuleType, scheduleId: number, ruleDelete?: 'day' | 'rule'; }, i: number) => {
                                if (time.ruleDelete) {
                                    return null;
                                } else {
                                    return <TimeEditor
                                        key={i}
                                        selectedDate={time.startTime}
                                        startTime={time.startTime}
                                        endTime={time.endTime}
                                        ruleType={time.ruleType}
                                        scheduleId={time.scheduleId}
                                        state={state}
                                        dispatch={dispatch} />;
                                }

                            }
                        )
                    }
                    {['add'].includes(state.calendarState) && state.selectedDate && state.newTime &&
                        <TimeEditor
                            selectedDate={state.selectedDate}
                            startTime={state.newTime.startTime}
                            endTime={state.newTime.endTime}
                            ruleType={state.newTime.ruleType}
                            state={state}
                            dispatch={dispatch}
                        />
                    }
                </VerticalFlex>
            </VerticalFlex>
        </Card >
    );
};

function BackAndSave({ state, dispatch, saveCalendar }: { state: IcalendarState, dispatch: (value: ACTIONTYPE) => void, saveCalendar: Function; }) {
    return <Flex style={{ gap: 8 }}>
        <CustomButton
            background_color={colorBackgroundGrayLight}
            custom_color={colorTextLight}
            style={{ padding: '7px', }}
            onClick={() => {
                dispatch({ type: 'updateCalendarState', payload: 'view' });
                setTimeout(() => {
                    dispatch({ type: 'forceRendering' });
                }, 1);
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
                saveCalendar({ state, dispatch });
                setTimeout(() => {
                    dispatch({ type: 'forceRendering' });
                }, 1);
            }}
        >
            <CheckIcon
                fontSize={'small'}
            />
        </CustomButton>
    </Flex>;
}

function TimeShower({ time }: { time: { startTime: Date, endTime: Date, ruleType: RuleType, ruleId: number; scheduleId: number; }; }) {
    return <TagLarge style={{ padding: '4px 12px', width: 'fit-content' }}>
        <TextBody2>{getKoreanTimeString(time.startTime)}</TextBody2>
        &nbsp;~&nbsp;
        <TextBody2>{getKoreanTimeString(time.endTime)}</TextBody2>
        <EmptyWidth width="4px" /> · <EmptyWidth width="4px" />
        <TextBody2>{ruleTypeConverter[time.ruleType]}</TextBody2>
    </TagLarge>;
}


function TimeEditor(props: { selectedDate: Date, startTime?: Date, endTime?: Date, ruleType?: RuleType, scheduleId?: number, state: IcalendarState, dispatch: (value: ACTIONTYPE) => void; }) {
    const longSelectStyle = {
        fontSize: '14px',
        color: colorTextLight, padding: 0, borderRadius: '8px !important',
        backgroundColor: colorBackgroundGrayLight,
        width: '100%',
        '.MuiSelect-select':
            { padding: '4px 12px !important', display: 'flex', justifyContent: 'center' },
        '.MuiSelect-icon':
            { visibility: 'hidden' }
    };

    const shortSelectStyle = {
        fontSize: '14px', color: colorTextLight,
        padding: 0, borderRadius: '8px !important',
        backgroundColor: colorBackgroundGrayLight, width: '100%',
        '.MuiSelect-select':
            { padding: '4px 12px', display: 'flex', justifyContent: 'center' },
    };

    const hours = Array(24).fill(0).map((e, i) => {
        const AMPM = i < 12 ? '오전' : i === 12 ? '낮' : '오후';
        const hour = `${i >= 13 ? i - 12 : i}`.padStart(2, '0');
        return `${AMPM} ${hour}`;
    });

    const times: Date[] = Array(24).fill(0).map((e, i) => {
        return new Date(new Date(new Date(props.selectedDate).setMinutes(0)).setHours(i));
    });
    const [startTime, setStartTime] = useState<Date>(props.startTime ?? new Date(new Date(props.selectedDate).setHours(8)));
    const [endTime, setEndTime] = useState<Date>(props.endTime ?? new Date(new Date(props.selectedDate).setHours(23)));
    const [ruleType, setRuleType] = useState<typeof props.ruleType>(props.ruleType ?? 'week');
    const [isShowDeleteDropDown, setIsShowDeleteDropDown] = useState<boolean>(false);
    useEffect(() => {
        if (props.state.calendarState === 'add') {
            props.dispatch({
                type: 'updateNewTime',
                payload: {
                    startTime: startTime,
                    endTime: endTime,
                    ruleType: ruleType!
                }
            });
        } else if (props.state.calendarState === 'edit') {
            props.dispatch({
                type: 'editSchedule',
                payload: {
                    scheduleId: props.scheduleId!,
                    startTime: startTime,
                    endTime: endTime,
                    ruleType: ruleType!
                }
            });
        }

    }, [startTime, endTime, ruleType]);



    return <Flex style={{ justifyContent: 'space-between', alignItems: 'start' }}>
        <VerticalFlex style={{ gap: '8px', color: colorTextLight }}>
            <Flex style={{ alignItems: 'center', gap: '4px' }}>
                <TextBody2>시작</TextBody2>
                <Flex style={{ width: '73px', }}>
                    <SimpleSelect<Date>
                        sx={longSelectStyle}
                        items={times}
                        texts={hours}
                        initialValue={new Date(new Date(startTime).setMinutes(0))}
                        onChange={(e: string) => {
                            setStartTime(new Date(e));
                        }} />
                </Flex>
                <TextBody2>:</TextBody2>
                <Flex style={{ width: '41px', }}>
                    <SimpleSelect<'00' | '30'>
                        sx={longSelectStyle}
                        items={startTime?.getHours() === 23 ? ['00'] : ['00', '30']}
                        texts={startTime?.getHours() === 23 ? ['00'] : ['00', '30']}
                        initialValue={startTime?.getMinutes() === 0 ? '00' : '30'}
                        onChange={(e: '00' | '30') => {
                            setStartTime(new Date(new Date(startTime).setMinutes(+e)));
                        }} />
                </Flex>
            </Flex>
            <Flex style={{ alignItems: 'center', gap: '4px' }}>
                <TextBody2>종료</TextBody2>
                <Flex style={{ width: '73px', }}>
                    <SimpleSelect<Date>
                        sx={longSelectStyle}
                        items={times.slice(startTime?.getHours() + (startTime?.getMinutes() === 30 ? 1 : 0))}
                        texts={hours.slice(startTime?.getHours() + (startTime?.getMinutes() === 30 ? 1 : 0))}
                        initialValue={new Date(new Date(endTime).setMinutes(0))}
                        onChange={(e: Date) => {
                            setEndTime(new Date(e));
                        }} />
                </Flex>
                <TextBody2>:</TextBody2>
                <Flex style={{ width: '41px', }}>
                    <SimpleSelect<'00' | '30'>
                        sx={longSelectStyle}
                        items={startTime?.getHours() === endTime.getHours() ? ['30'] : ['00', '30']}
                        texts={startTime?.getHours() === endTime.getHours() ? ['30'] : ['00', '30']}
                        initialValue={endTime?.getMinutes() === 0 ? '00' : '30'}
                        onChange={(e: '00' | '30') => {
                            setEndTime(new Date(new Date(endTime).setMinutes(+e)));
                        }} />
                </Flex>
            </Flex>
            <Flex style={{ alignItems: 'center', gap: '4px' }}>
                <TextBody2>반복</TextBody2>
                <Flex style={{ width: '73px', }}>
                    <SimpleSelect<typeof props.ruleType>
                        sx={shortSelectStyle}
                        items={['week', 'day', 'custom']}
                        texts={['매주', '매일', '없음']}
                        initialValue={ruleType ?? 'week'}
                        onChange={(e: typeof props.ruleType) => {
                            setRuleType(e);
                        }} />
                </Flex>
            </Flex>
        </VerticalFlex>
        {props.state.calendarState === 'add' && <BackAndSave state={props.state} dispatch={props.dispatch} saveCalendar={saveCalendar} />}
        {props.state.calendarState === 'edit' && <CustomButton
            background_color={colorBackgroundCareerDivePink}
            custom_color={colorCareerDivePink}
            style={{ padding: '7px', }}
            onClick={() => {
                if (ruleType === 'custom') {
                    props.dispatch({
                        type: 'removeSchedule',
                        payload: {
                            scheduleId: props.scheduleId!,
                            ruleDelete: 'day'
                        }
                    });
                    setTimeout(() => { props.dispatch({ type: 'forceRendering', }); }, 1);
                } else {
                    setIsShowDeleteDropDown(true);
                }

            }}
        >
            <DeleteIcon
                fontSize={'small'}
            />

        </CustomButton>}

        {isShowDeleteDropDown && <Flex style={{ position: 'relative', zIndex: 10 }}>
            <VerticalFlex style={{ color: colorCareerDivePink, position: 'absolute', zIndex: 10, top: '0px', right: '0px', width: '140px', padding: '8px', backgroundColor: 'white', border: '1px solid #eee', borderRadius: '8px' }}>
                <Flex style={{ marginLeft: 'auto', marginBottom: 10, cursor: 'pointer' }} onClick={() => setIsShowDeleteDropDown(false)}><CloseIcon fontSize="small" /></Flex>
                <Flex
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        props.dispatch({
                            type: 'removeSchedule',
                            payload: {
                                scheduleId: props.scheduleId!,
                                ruleDelete: 'rule'
                            }
                        });
                        setTimeout(() => { props.dispatch({ type: 'forceRendering', }); }, 1);
                        setIsShowDeleteDropDown(false);
                    }}>이후 모든 일정 삭제</Flex>
                <EmptyHeight height="8px" />
                <Flex
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        props.dispatch({
                            type: 'removeSchedule',
                            payload: {
                                scheduleId: props.scheduleId!,
                                ruleDelete: 'day'
                            }
                        });
                        setTimeout(() => { props.dispatch({ type: 'forceRendering', }); }, 1);
                        setIsShowDeleteDropDown(false);
                    }}>이 일정만 삭제</Flex>
            </VerticalFlex>
        </Flex>
        }

    </Flex>;

}
export default MentorCalendar;