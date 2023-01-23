import React, { useEffect, useState } from "react";
import SimpleMenu from "util/ts/SimpleMenu";
import { Flex } from "util/styledComponent";
import Card from "../../util/ts/Card";
import { getDatesOfMonth } from "./Calendar.service";
import SimpleSelect from "util/ts/SimpleSelect";


const MenteeCalendar = () => {
    // Setting
    // 1. 모든 날짜 데이터는 Date 객체로 관리됨
    // 2. 오늘 날짜는 new Date() 객체를 매번 생성해서 받아온다.

    const [calendarDates, setCalendarDates] = useState<Array<Date | null>>()
    const [currentYearAndMonth, setCurrentYearAndMonth] = useState<Date>(new Date(new Date().setDate(1)))

    const monthList = Array(6).fill(new Date()).map((e, i) => {
        const year = new Date().getFullYear()
        const month = new Date().getMonth()
        return new Date(year + ~~((month + i) / 12), (month + i) % 12, 1)
    })
    const koDtf = Intl.DateTimeFormat("ko", { year: 'numeric', month: 'narrow' })

    const monthTextList = monthList.map(e => koDtf.format(e))

    useEffect(() => {
        const temp = getDatesOfMonth(currentYearAndMonth)
        const startDay = temp[0].getDay()
        const endDay = temp[temp.length - 1].getDay()
        setCalendarDates([...Array(startDay).fill(null), ...temp, ...Array(6 - endDay).fill(null)])
    }, [currentYearAndMonth])

    // TODO
    // 1. 년, 월, 일, 요일이 표기되어야함
    // TODO
    // 2. 각 일자는 선택가능/선택/일반/비활성 상태가 있어야한다
    // TODO
    // 3. 현재 선택 날짜가 언제인지 알아야함
    // TODO
    // 4. 선택가능 날짜는 props로 전달 받음
    const availableDates = [new Date(2023, 0, 23), new Date(2023, 0, 24)]
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
            <Flex style={{ flexWrap: 'wrap' }}>
                {
                    calendarDates && calendarDates.map((date, i) => {
                        if (date === null) {
                            return <div data-testid="date-elem" style={{ minWidth: '14.286%' }} key={i}></div>
                        }
                        else {
                            return <div data-testid="date-elem" style={{ width: '14.286%' }} key={i}>{date.getDate()}</div>
                        }
                    })
                }
            </Flex>

        </Card>
    );
};
export default MenteeCalendar