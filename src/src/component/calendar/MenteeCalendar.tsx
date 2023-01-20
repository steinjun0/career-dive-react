import React, { useEffect, useState } from "react";
import { Flex } from "util/styledComponent";
import Card from "../../util/ts/Card";

const getDatesOfMonth = (yearAndMonth: Date): Array<Date> => {
    const lastDateOfMonth = new Date(yearAndMonth.getFullYear(), yearAndMonth.getMonth() + 1, 0).getDate();
    let dates = []
    for (let date = 1; date < lastDateOfMonth; date++) {
        dates.push(new Date(yearAndMonth.getFullYear(), yearAndMonth.getMonth(), date))
    }
    return dates;
}

const MenteeCalendar = () => {
    // Setting
    // 1. 모든 날짜 데이터는 Date 객체로 관리됨
    // 2. 오늘 날짜는 new Date() 객체를 매번 생성해서 받아온다.

    const [month, setMonth] = useState<number>(new Date().getMonth() + 1)
    const [calendarDates, setCalendarDates] = useState<Array<Date | null>>()
    useEffect(() => {
        const temp = getDatesOfMonth(new Date())
        const startDay = temp[0].getDay()
        const endDay = temp[temp.length - 1].getDay()
        setCalendarDates([...Array(startDay).fill(null), ...temp, ...Array(6 - endDay).fill(null)])
    }, [month])

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
            no_divider={true}
        >
            <Flex style={{ flexWrap: 'wrap' }}>
                {
                    calendarDates && calendarDates.map((date, i) => {
                        if (date === null) {
                            return <div className="date-elem" style={{ minWidth: '14.286%' }} key={i}></div>
                        }
                        else {
                            return <div className="date-elem" style={{ width: '14.286%' }} key={i}>{date.getDate()}</div>
                        }
                    })
                }
            </Flex>

        </Card>
    );
};
export default MenteeCalendar